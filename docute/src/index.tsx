import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import './public-path';
import context from './utils/context';

async function render(props?: any) {
  
  const {Provider} = context;
  // const event = props.event || {};
  // let res = Promise.all(event.emit('post', '/checkUserLogin', {
  //   userName: 1,
  //   userId: 2,
  // }))
  // res.then(a => {
  //   console.log(a)
  // })
  ReactDOM.render(
    <Provider value={props.event}>
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:id" element={<App />} />
        <Route path="/a" element={<div>a</div>} />
      </Routes>
    </HashRouter>
    </Provider>,
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
  render(props);
}

export async function unmount() {
  console.log("unmount");
}
export async function update(props: any) {
  console.log("update props", props);
}