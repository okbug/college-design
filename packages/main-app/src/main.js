import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { loadMicroApp } from "qiankun";

import App from "./App.js";
import User from "./views/User/index.js";
import "./micro-app-regester";
import "antd/dist/antd.less";

function PPTPage() {
  loadMicroApp({
    name: "pptist",
    entry: "//localhost:8080",
    container: "#app",
  });
  return <div id="app"></div>;
}

const BlankPage = () => <div></div>;

function Main() {
  return <>
  <h1 style={{
    textAlign:'center',
    marginTop: '30px',
  }}>欢迎进入本系统</h1>
  </>
}

function Index() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Main></Main>}></Route>
            <Route path="user" element={<User />} />
            <Route path="*" element={<BlankPage />} />
          </Route>
          <Route path="/ppt" element={<PPTPage></PPTPage>}></Route>
        </Routes>
      </Router>
    </>
  );
}

ReactDOM.render(<Index />, document.getElementById("react-app"));

// loadMicroApp({
//     name: 'pptist',
//     // entry: {
//     //     scripts: ['//localhost:8080/js/app.js']
//     // },
//     entry: '//localhost:8080',
//     container: '#main',
//   });

// Documents: https://qiankun.umijs.org/zh/faq#application-died-in-status-loading_source_code-you-need-to-export-the-functional-lifecycles-in-xxx-entry
