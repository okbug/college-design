import { PureComponent } from "react";
import {
  View,
  SwiperItem,
  Text,
  Button,
  Swiper,
  Image
} from "@tarojs/components";
import { adsReq } from '@/common/api'
import { sleep } from '@/common/utils'
import { connect } from "react-redux"
import Taro from "@tarojs/taro"
import dayjs from 'dayjs'

import Tab from '@/components/Tab';
import NoExploit from "@/components/NoExploit";

import './index.scss';
import tools from "@/common/tools";

const FLIGHT_TABS = [
  {
    label: '单程',
    id: 0,
  },
  {
    label: '多程',
    id: 1,
  },
  {
    label: '往返',
    id: 2,
  },
]
@connect(({ flightIndex }) => ({
  flightIndex,
}))
export default class FlightIndex extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      adList: [], // 广告banner
      isExchange: false,
    }
  }
  componentDidMount() {
    this.getAds()
    this.getLocationInfo()
  }
  handleTabClick = (id) => {
    console.log(id)
  }
  getAds = () => {
    adsReq().then((res) => {
      const { result } = res
      this.setState({
        adList: result || [], 
      })
    })
  }
  chooseFlightCity = (type) => {
    this.props.dispatch({
      type: "flightIndex/updateState",
      payload: {
        cityType: type,
      }
    })
    // 注意：使用app.config.js中注册的绝对路径，需要加/
    Taro.navigateTo({
      url: "/pages/airportList/airportList"
    })
  }
  /**
   * 获取经纬度
   * @{param}	 
   */
  getLocationInfo = () => {
    Taro.getLocation({
      type: 'gcj02'
    })
      .then(res => {
        const {
          latitude,
          longitude,
        } = res
        this.getCity({latitude, longitude})
      })
      .catch(() => {
        tools.showToast("位置获取失败~")
      })
  }
  getCity = ({latitude, longitude}) => {
    Taro.request({
      url: `https://apis.map.qq.com/ws/geocoder/v1/?key=JKLBZ-WN3K4-HFSU6-DB5UU-2FGCS-CLB4J&location=${latitude},${longitude}`
    })
      .then((res) => {
        const { data } = res
        const cityInfo = data?.result?.ad_info || {}
        this.props.dispatch({
          type: 'flightIndex/updateState',
          payload: {
            dptCityId: cityInfo.city_code || 2,
            dptCityName: cityInfo.city || '上海'
          }
        })
      })
      .catch(() => {
        tools.showToast("位置获取失败~")
      })
  }
  exchangeCity = async () => {
    const {
      dptCityName,
      dptCityId,
      arrCityId,
      arrCityName,
      dptAirportName,
      arrAirportName,
    } = this.props.flightIndex;
    const exchangeObj = {
      dptCityName: arrCityName,
      dptCityId: arrCityId,
      arrCityName: dptCityName,
      arrCityId: dptCityId,
      dptAirportName: arrAirportName,
      arrAirportName: dptAirportName,
    };
    this.setState({
      isExchange: true,
    });
    this.props.dispatch({
      type: "flightIndex/updateState",
      payload: exchangeObj,
    });
    await sleep(500);
    this.setState({
      isExchange: false,
    });
    this.props.dispatch({
      type: "flightIndex/updateState",
      payload: exchangeObj,
    });
  };
  chooseFlightDate = () => {
    Taro.navigateTo({
      url: "/pages/calendar/calendar"
    })
  }
  onLinkToList = () => {
    const {
      arrCityName,
      arrCityId,
      arrAirportName,
      dptCityId,
      dptCityName,
      dptAirportName,
      dptDate,
    } = this.props.flightIndex;
    tools.navigateTo({
      url: '/pages/flight/list/list',
      data: {
        arrCityName,
        arrCityId,
        arrAirportName,
        dptCityId,
        dptCityName,
        dptAirportName,
        dptDate,
      }
    })
  }
  render() {
    const { adList, isExchange } = this.state
    const { arrCityName, dptCityName, dptDate } = this.props.flightIndex
    return (
      <View className="flight-container">
        <View className="flight-top">
          <Tab tabList={FLIGHT_TABS} onTabClick={this.handleTabClick} className="flight-index-tab">
            <SwiperItem>
              <View className="item station">
                <View
                  className={`cell from ${isExchange ? "slide" : ""}`}
                  onClick={() => this.chooseFlightCity("depart")}
                >
                  {dptCityName}
                </View>
                <Text
                  onClick={this.exchangeCity}
                  className={`icon-zhihuan iconfont ${
                    isExchange ? "active" : ""
                  }`}
                ></Text>
                <View
                  className={`cell to ${isExchange ? "slide" : ""}`}
                  onClick={() => this.chooseFlightCity("arrive")}
                >
                  {arrCityName}
                </View>
              </View>
              <View className="item date" onClick={this.chooseFlightDate}>
                {dayjs(dptDate).format("M月D日")}
              </View>
              <Button className="search-btn" onClick={this.onLinkToList}>
                搜一下吧～
              </Button>
            </SwiperItem>
            {/*  往返  */}
            <SwiperItem>
              <NoExploit className="no-data" />
            </SwiperItem>
            {/*  多程  */}
            <SwiperItem>
              <NoExploit className="no-data" />
            </SwiperItem>
          </Tab>
        </View>
        <View className="alipay-swiper" style={{margin: '15px'}}>
          <Swiper className="advs-banner-bd" autoplay circular interval={3000}>
            {
              adList.map(item => {
                return (
                  <SwiperItem key={item.id} className="item">
                    <Image className="img" src={item.imgUrl}></Image>
                  </SwiperItem>
                )
              })
            }
          </Swiper>
        </View>
        {/*  机票底部  */}
        <View className="flight-info"></View>
      </View>
    )
  }
}