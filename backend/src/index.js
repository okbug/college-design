const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const route = new Router();
const cors = require("./middleware/cors");

/**
 * 中间件设置
 */

// 跨域
app.use(cors());

// 设置JSON格式
app.use((ctx, next) => {
  ctx.set("Content-Type", "application/json; charset=utf-8");
  return next();
});

// 路由的设置
route.get("/", async (ctx) => {
  const data = [];
  for (let i = 0; i < 10; i++) {
    const obj = {
      index: i,
      name: String.fromCharCode(97 + i),
      tag: "okbug",
    };

    data.push(obj);
  }
  ctx.body = JSON.stringify(data);
});

// 路由的注册
app.use(route.routes()).use(route.allowedMethods());

// 开启HTTP服务
app.listen(9527, () => {
  console.log("server running at http://localhost:9527");
});
