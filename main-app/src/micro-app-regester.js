import { registerMicroApps, start } from "qiankun";

import event from './utils/event';



registerMicroApps([
  {
    name: "docute", // 和子应用 package.json 中name字段相同
    entry: "//localhost:3000",
    container: "#main",
    activeRule: "/doc",
    props: {
      event
    },
  },
  // {
  //   name: 'snow', // 和子应用 package.json 中name字段相同
  //   entry: '//localhost:9009',
  //   container: '#main',
  //   activeRule: '/snow',
  //   props: {
  //       a() {
  //           console.log('this is a function in main app to doc');
  //       }
  //   }
  // },
]);

start({
  sandbox: {
    // experimentalStyleIsolation: true,
  },
});
