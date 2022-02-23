import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from './App.js';
import User from './views/User/index.js'
import './micro-app-regester';
import 'antd/dist/antd.less';


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/ppt" element={<App />} />
      <Route path="/doc" element={<App />} />
      <Route path="/user" element={<User />} />
    </Routes>
  </Router>,
  document.getElementById("react-app")
);


// loadMicroApp({
//     name: 'pptist',
//     // entry: {
//     //     scripts: ['//localhost:8080/js/app.js']
//     // },
//     entry: '//localhost:8080',
//     container: '#main',
//   });


// Documents: https://qiankun.umijs.org/zh/faq#application-died-in-status-loading_source_code-you-need-to-export-the-functional-lifecycles-in-xxx-entry