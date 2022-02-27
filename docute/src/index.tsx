import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import './public-path';

async function render(props?: any) {
  const event = props.event || {};
  let res = Promise.all(event.emit('post', '/checkUserLogin', {
    userName: 1,
    userId: 2,
  }))
  res.then(a => {
    console.log(a)
  })
  ReactDOM.render(
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:id" element={<App />} />
        <Route path="/a" element={<div>a</div>} />
      </Routes>
    </HashRouter>,
    document.getElementById("root")
  );

  
}
const flag = window.__POWERED_BY_QIANKUN__;

if (!flag) {
  render();
}

// render()
export async function bootstrap() {
  console.log("react app bootstraped");
}

export async function mount(props: any) {
  console.log("props from main app", props);
  render(props);
}

export async function unmount() {
  console.log("unmount");
}
export async function update(props: any) {
  console.log("update props", props);
}
