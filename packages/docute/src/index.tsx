import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Create from '@/views/Create'
import SocketEditor from '@/views/SocketEditor'

import View from "@/components/View";

import Editor from "@/components/Editor";
import './public-path';
import context from '@/utils/context';

async function render(props?: any) {
  
  const { Provider } = context;
  ReactDOM.render(
    <Provider value={{
      event: props.event
    }}>
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<App />}>
          <Route path="view/:id" element={<View></View>}></Route>
          <Route path="edit/:id" element={<Editor></Editor>}></Route>
          <Route path="edit1/:id" element={<SocketEditor></SocketEditor>}></Route>
          </Route>
          <Route path="/:id" element={<App />} />
          <Route path="/create" element={<Create />} />
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