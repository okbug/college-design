import { registerMicroApps, start } from "qiankun";

registerMicroApps([
  {
    name: "pptist", // 和子应用 package.json 中name字段相同
    entry: "//localhost:8080",
    container: "#main",
    activeRule: "/ppt",
    props: {
      a() {
        console.log("this is a function in main app to ppt");
      },
    },
  },
  {
    name: "docute", // 和子应用 package.json 中name字段相同
    entry: "//localhost:3000",
    container: "#main",
    activeRule: "/doc",
    props: {
      a() {
        console.log("this is a function in main app to doc");
      },
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
    experimentalStyleIsolation: true,
  },
});
