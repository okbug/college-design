import { Component } from 'react'
import { View } from '@tarojs/components'
import './index.scss'

import FlightIndex from '../flight/index'
import NoExploit from '../../components/NoExploit'

const DEFAULT_TAB_LIST = [
  { title: "飞船", tab: "flight", index: 0 }
]

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0, // 当前选中的index
    }
  }

  switchTab = (index) => {
    this.setState({
      tabIndex: index,
    })
  }

  render () {
    const { tabIndex } = this.state
    const innerStyle = {
      width: `${100 / DEFAULT_TAB_LIST.length}%`,
      transform: `translateX(${tabIndex * 100}%)`
    }
    return (
      <View className="index-container">
        <View className="top">
          <View className="index-tab">
            {
              DEFAULT_TAB_LIST.map(item => (
                <View key={item.tab} className={`index_tab_item ${item.tab} ${tabIndex === item.index ? 'current' : ''}`} onClick={() => this.switchTab(item.index)}>
                  {item.title}
                </View>
              ))
            }
          </View>
          <View className="scrollbar" style={innerStyle}></View>
        </View>
        {
          DEFAULT_TAB_LIST[tabIndex]['tab'] === "flight" ? (
            <FlightIndex />
          ) : <NoExploit />
        }
      </View>
    )
  }
}
