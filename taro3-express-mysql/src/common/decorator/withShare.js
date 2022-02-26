const withShare = (opts) => {
  // 返回react高阶组件
  /**
   * WrapperComponet withShare包裹的组件
   * @{param}	 
   */
  return (WrapperComponet) => {
    class MyComponent extends WrapperComponet {
      onShareAppMessage() {
        console.log(this.props)
        return {
          ...opts,
          path: `/${this.props.tid}`
        }
      }
    }

    return MyComponent
  }
}

export default withShare