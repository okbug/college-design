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

console.log('react child app')

// render()
export async function bootstrap() {
  console.log("react app bootstraped");
}

export async function mount(props: any) {
  console.log("props from main app", props);
  render();
}

export async function unmount() {
  console.log("unmount");
}
export async function update(props: any) {
  console.log("update props", props);
}
