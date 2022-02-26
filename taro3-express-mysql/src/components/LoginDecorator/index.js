import { Component } from 'react';
import tools from "@/common/tools";

const IsLogin = (WrappedComponent) => {
  return class extends Component {
    componentDidMount() {
      const store = tools.getStorageSyncWithTime('userInfo')
      if (!store?.userPhone) {
        // 未登录
        tools.navigateTo({
          url: '/pages/login/login'
        })
      }
    }
    render() {
      return <WrappedComponent />
    }
  }
}

export default IsLogin