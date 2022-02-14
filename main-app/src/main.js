import { registerMicroApps, start } from 'qiankun';
import React from 'react'
import ReactDOM from 'react-dom';
import App from './App.js';

registerMicroApps([
  {
    name: 'pptist', // 和子应用 package.json 中name字段相同
    entry: '//localhost:8080',
    container: '#main',
    activeRule: '#/ppt',
    props: {
        a() {
            console.log('this is a function in main app');
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
            console.log('this is a function in main app');
        }
    }
  },
]);

start();

ReactDOM.render(<App />, document.getElementById("react-app"))

// loadMicroApp({
//     name: 'pptist',
//     // entry: {
//     //     scripts: ['//localhost:8080/js/app.js']
//     // },
//     entry: '//localhost:8080',
//     container: '#main',
//   });


// Documents: https://qiankun.umijs.org/zh/faq#application-died-in-status-loading_source_code-you-need-to-export-the-functional-lifecycles-in-xxx-entry