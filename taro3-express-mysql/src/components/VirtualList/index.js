import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, ScrollView, Block } from '@tarojs/components'

/**
 * 虚拟列表
 * @param	{Array}	list  列表数据
 * @param	{Number}	segmentNum  自定义分段的数量，默认10
 * @param	{Object}	scrollViewProps  scrollView的参数
 * @param	{Function}	onComplete  二维列表是否已经把全部数据加载完成的回调
 * @param	{Function}	onRender  二维列表Item的渲染回调
 * @param	{Function}	onRenderBottom  二维列表下部分内容渲染回调
 * @param	{Number}	screenNum  指定页面显示区域基准值，默认2
 */

export default class VirtualList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      twoList: [], // 二维数组
      isComplete: false, // 数据是否全部加载完成
      wholePageIndex: 0, // 相当于页数，每页的索引
      innerScrollTop: 0, // 记录组件内部滚动高度
    }
    this.initList = [] // 承载初始化的二维数组
    this.pageHeightArr = [] // 存储每个维度渲染之后所占的高度
    this.currentPage = Taro.getCurrentInstance()
    this.windowHeight = 0 // 当前屏幕高度
  }
  componentDidMount() {
    const { list } = this.props
    this.getSystemInformation()
    this.formatList(list)
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { list } = this.props
    // 提前把innerScrollTop设置为与0不同，防止列表置顶失效
    this.setState({
      innerScrollTop: 1,
    })
    if (!nextProps.list?.length) {
      this.handleComplete()
      return
    }
    if (JSON.stringify(nextProps.list) !== JSON.stringify(list)) {
      this.pageHeightArr = []
      this.setState({
        twoList: [], // 二维数组
        isComplete: false, // 数据是否全部加载完成
        wholePageIndex: 0, // 相当于页数，每页的索引
        innerScrollTop: 0,
      }, () => {
        this.formatList(nextProps.list)
      })
    }
  }
  /**
   * 获取客户端信息
   * @{param}	 
   */
  getSystemInformation = () => {
    try {
      const res = Taro.getSystemInfoSync()
      this.windowHeight = res?.windowHeight
    } catch(err) {

    }
  }
  /**
   * 将列表格式化为二维数组
   * @{param}	 
   */
  formatList(list = []) {
    const { segmentNum } = this.props
    // 一个维度承载的数据
    let arr = []
    // 分割的结果
    let _list = []
    list.forEach((item, index) => {
      arr.push(item)
      if ((index + 1) % segmentNum === 0 ) {
        // 当循环到外部指定数量时，将arr作为一个维度的数据塞入_list
        _list.push(arr)
        arr = []
      }
    })
    // 将分段不足segmentNum的剩余数据装入_list
    const restList = list.slice(_list.length * segmentNum)
    if (restList?.length) {
      _list.push(restList)
      if (_list.length <= 1) {
        this.handleComplete()
      }
    }
    this.initList = _list
    this.setState({
      twoList: this.initList.slice(0, 1)
    }, () => {
      Taro.nextTick(() => {
        this.setHeight(list)
      })
    })
  }
  setHeight(list = []) {
    const { wholePageIndex } = this.state
    const { listId } = this.props
    const query = Taro.createSelectorQuery()
    query.select(`#${listId} .wrap_${wholePageIndex}`).boundingClientRect()
    query.exec((res) => {
      console.log('--res--', res)
      if (list?.length) {
        this.pageHeightArr.push(res?.[0]?.height)
      }
    })
    this.miniObserve()
  }
  miniObserve = () => {
    const { wholePageIndex } = this.state
    const { scrollViewProps, listId, screenNum } = this.props
    const scrollHeight = scrollViewProps?.style?.height || this.windowHeight
    const observer = Taro.createIntersectionObserver(this.currentPage.page).relativeToViewport({
      top: screenNum * scrollHeight,
      bottom: screenNum * scrollHeight,
    })
    observer.observe(`#${listId} .wrap_${wholePageIndex}`, res => {
      const { twoList } = this.state
      if (res?.intersectionRatio <= 0) {
        // 当前节点不在监控范围内,用该维度所占高度填充二维数组
        twoList[wholePageIndex] = { height: this.pageHeightArr[wholePageIndex]}
        this.setState({
          twoList: [...twoList]
        })
      } else if (!twoList[wholePageIndex]?.length) {
        // 如果有相交区域，则将数据回填
        twoList[wholePageIndex] = this.initList[wholePageIndex]
        this.setState({
          twoList: [...twoList]
        })
      }
    })
  }
  /**
   * 数据渲染完全
   * @{param}	 
   */
  handleComplete() {
    const { onComplete } = this.props
    this.setState({
      isComplete: true,
    }, () => {
      onComplete?.()
    })
  }
  /**
   * 监听触底回调
   * @{param}	 
   */
  renderNext = () => {
    const { list, scrollViewProps } = this.props
    const page_index = this.state.wholePageIndex + 1
    if (!this.initList[page_index]?.length) {
      this.handleComplete()
      return
    }
    // 为开发者提供自己触底回调想做的事
    scrollViewProps?.onScrollToLower?.()
    this.setState({
      wholePageIndex: page_index,
    }, () => {
      const { wholePageIndex, twoList } = this.state
      // 更新对应维度的数据
      twoList[wholePageIndex] = this.initList[wholePageIndex]
      this.setState({
        twoList: [...twoList],
      }, () => {
        Taro.nextTick(() => {
          this.setHeight(list)
        })
      })
    })
  }

  render() {
    const {
      twoList,
      isComplete,
      innerScrollTop,
    } = this.state
    const {
      segmentNum,
      scrollViewProps,
      onRender,
      onRenderBottom,
      className,
      listId,
    } = this.props

    const _scrollViewProps = {
      ...scrollViewProps,
      scrollTop: innerScrollTop === 0 ? 0 : ""
    }

    return (
      <ScrollView
        scrollY
        id={listId}
        style={{
          height: '100%',
        }}
        className={`zt-virtual-list-container ${className}`}
        onScrollToLower={this.renderNext}
        {..._scrollViewProps}
      >
        <View className="zt-main-list">
          {
            twoList?.map((item, pageIndex) => {
              return (
                <View key={pageIndex} className={`wrap_${pageIndex}`}>
                  {
                    item?.length > 0 ? (
                      <Block>
                        {
                          item.map((el, index) => {
                            return onRender?.(el, (pageIndex * segmentNum + index), pageIndex)
                          })
                        }
                      </Block>
                    ) : (
                      <View style={{'height': `${item?.height}px`}}></View>
                    )
                  }
                  
                </View>
              )
            })
          }
        </View>
        {isComplete && onRenderBottom?.()}
      </ScrollView>
    )
  }
}

VirtualList.defaultProps = {
  list: [],
  segmentNum: 10,
  scrollViewProps: {},
  className: "",
  screenNum: 2,
  listId: "zt-virtial-list",
  onRender: function render() {
    return (<View />)
  },
}
