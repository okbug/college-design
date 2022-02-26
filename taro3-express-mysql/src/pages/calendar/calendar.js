import { PureComponent } from "react";
import { View } from "@tarojs/components";
import { connect } from 'react-redux'
import Taro from '@tarojs/taro';
import { AtCalendar } from "taro-ui"
import { MIN_DATE, MAX_DATE } from '@/common/constant'

import './calendar.scss'

@connect(({flightIndex}) => ({
  ...flightIndex
}))
export default class Calendar extends PureComponent {
  onDateSelect = (date) => {
    const {value: {start}} = date
    this.props.dispatch({
      type: 'flightIndex/updateState',
      payload: {
        dptDate: start
      }
    })
    Taro.navigateBack()
  }
  render() {
    const { dptDate } = this.props
    return (
      <View className="calendar-page">
        <AtCalendar
          currentDate={dptDate}
          minDate={MIN_DATE}
          maxDate={MAX_DATE}
          onSelectDate={this.onDateSelect}
        ></AtCalendar>
      </View>
    )
  }
}