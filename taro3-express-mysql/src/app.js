import { Component } from 'react'
import { Provider } from 'react-redux'
import createApp from './dva'
import models from './models'
import 'promise-prototype-finally';

import './app.scss'
import './assets/iconfont/iconfont.css'

const dvaApp = createApp({
  initialState: {},
  models,
})

const store = dvaApp.getStore();

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}

export default App
