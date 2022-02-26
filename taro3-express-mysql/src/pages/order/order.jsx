import { Component } from 'react'
import { View, Text, SwiperItem, Button, ScrollView } from "@tarojs/components";
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';
import Tab from "@/components/Tab";
import NoExploit from "@/components/NoExploit";
import tools from "@/common/tools";
import loginDecorator from "@/components/LoginDecorator";
import { connect } from "react-redux";
import { orderListReq } from "@/common/api";
import { ERR_MES } from "@/common/constant";
import dayjs from 'dayjs'

import './order.scss'

const IS_BAIDU = tools.isBaiDu

const TAB_LIST = [
  {
    label: "飞船航线",
    id: 0,
  },
  {
    label: "火箭航线",
    id: 1,
  },
];
@loginDecorator
@connect(({user}) => ({
  ...user,
}))
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      isRefresh: false, // 是否处于下拉刷新状态
    };
  }
  componentDidMount() {
    // this.getOrderList()
    // 获取当前实例onShow并附值给onShowEventId
    const onShowEventId = this.$instance.router.onShow
    eventCenter.on(onShowEventId, this.onShow)
  }
  $instance = getCurrentInstance()
  /**
   * 执行onShow里边的逻辑
   */
  onShow = () => {
    if (this.props.isLogin) {
      this.getOrderList()
    }
  }
  toLogin = () => {
    tools.navigateTo({
      url: "/pages/login/login",
    });
  };
  onLoginOut = () => {
    try {
      // 删除登录态
      Taro.removeStorageSync("userInfo")
      tools.showToast({
        title: '操作成功～',
        icon: 'loading',
        duration: 1000,
      })
      this.props.dispatch({
        type: 'user/loginOut',
      })
    } catch (err) {
      tools.showToast("操作失败~")
    }
  }
  getOrderList = () => {
    tools.showLoading();
    const { userPhone } = this.props;
    orderListReq({
      userPhone,
    })
      .then((res) => {
        const { result } = res;
        this.setState({
          orderList: result || [],
        });
      })
      .catch((err) => {
        tools.showToast(err?.data?.mes || ERR_MES);
      })
      .finally(() => {
        tools.hideLoading();
        this.setState({
          isRefresh: false,
        })
      });
  }
  handlePullDownRefresh = () => {
    this.setState({
      isRefresh: true,
    }, this.getOrderList)
  }
  renderListItem = () => {
    const { orderList, isRefresh } = this.state;
    return orderList?.length ? (
      <ScrollView scrollY style={{height: '100%'}} className="order-list-box" refresherEnabled refresherTriggered={isRefresh} onRefresherRefresh={this.handlePullDownRefresh}>
        {orderList.map((item) => {
          const { dptCityName, arrCityName, dptTime, dptTimeStr, price } = item;
          return (
            <View key={item.id} className="item">
              <View className="left">
                <View className="line">
                  <Text className="city-name">{dptCityName}</Text> - 
                  <Text className="city-name">{arrCityName}</Text>
                  <View className="time">{`${dayjs(dptTime).format(
                    "YYYY-MM-DD"
                  )} ${dptTimeStr}`}</View>
                </View>
              </View>
              <View className="right">¥ {price}</View>
            </View>
          );
        })}
      </ScrollView>
    ) : (
      <NoExploit content="暂无数据" />
    );
  };
  render() {
    const { isLogin, nickName } = this.props;

    return isLogin ? (
      <View className={`home-container ${IS_BAIDU ? "baidu-home-container" : ""}`}>
        <View className="user-box">
          <Text className="user-name">欢迎，{nickName || "--"}</Text>
          <Text className="login-out-btn" onClick={this.onLoginOut}>退出</Text>
        </View>
        <Tab tabList={TAB_LIST} className="tab">
          {TAB_LIST.map((tab) => {
            return (
              <SwiperItem key={tab.id}>
                {tab.id === 0 ? (this.renderListItem()) : (
                  <NoExploit content="暂无数据" />
                )}
              </SwiperItem>
            );
          })}
        </Tab>
      </View>
    ) : (
      <View className="no-login-container">
        <Text className="txt">登录查看订单</Text>
        <Button className="login-btn" onClick={this.toLogin}>
          立即登录
        </Button>
      </View>
    );
  }
}
