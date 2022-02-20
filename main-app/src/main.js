import { registerMicroApps, start } from 'qiankun';
import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from './App.js';
import User from './views/User/index.js'

registerMicroApps([
  {
    name: 'pptist', // 和子应用 package.json 中name字段相同
    entry: '//localhost:8080',
    container: '#main',
    activeRule: '/ppt',
    props: {
        a() {
            console.log('this is a function in main app to ppt');
        }
    }
  },
  {
    name: 'docute', // 和子应用 package.json 中name字段相同
    entry: '//localhost:3000',
    container: '#main',
    activeRule: '/doc',
    props: {
        a() {
            console.log('this is a function in main app to doc');
        }
    }
  },
]);

start();

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