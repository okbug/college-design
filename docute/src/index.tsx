import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

async function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}
const flag = window.__POWERED_BY_QIANKUN__;

if (!flag) {
  render()
}

render()
export async function bootstrap() {
  await console.log("vue app bootstraped");
}

export async function mount(props: any) {
  console.log("props from main app", props);
  await render();
  // await app.mount('#app')

  const a = props.a;
  a();
}

export async function unmount() {
  await console.log("unmount");
}
export async function update(props: any) {
  await console.log("update props", props);
}
