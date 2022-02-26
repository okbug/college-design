import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";

import Header from "./Layout/Header.jsx";
import App from "./App.js";
import User from "./views/User/index.js";
import Login from "./views/User/login";
import "./micro-app-regester";
import "antd/dist/antd.less";

const BlankPage = () => <></>
function Index() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="/user" element={<User />} />
          <Route path="*" element={<BlankPage/>} />
        </Route>
        
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
