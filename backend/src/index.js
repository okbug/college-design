const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const route = new Router();
const cors = require("./middleware/cors");

const { login, register, checkUser, getUserInfo } = require("./utils/user");
const { getDocDetail, updateDoc } = require("./utils/doclist");
const { paramPaser } = require("./utils/parser");

const server = require("./utils/ws");

const set = new Set();
server.on("connection", (socket) => {
  set.add(socket);
  // send a message to the client
  socket.send(
    JSON.stringify({
      type: "hello from server",
      content: [1, "2"],
    })
  );

  // receive a message from the client
  socket.on("message", (data) => {
    const packet = JSON.parse(data);

    switch (packet.type) {
      case "hello from client":
        // ...
        console.log(packet.content);
        set.forEach((socket) => {
          socket.send(
            JSON.stringify({
              type: "hello from server",
              content: packet.content,
            })
          );
        });
        break;
      case "online": 
        console.log(packet.content);
    }
  });
});

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

route.post("/checkUserLogin", async (ctx) => {
  const res = await checkUser({
    userName: ctx.cookies.get('userName'),
    userId: ctx.cookies.get('userId'),
    token: ctx.cookies.get("token"),
  });
  if (!res) {
    ctx.body = {
      code: 0,
      msg: "已过期或者失效",
      data: {
        e: 124,
      },
    };
  } else
    ctx.body = {
      code: 200,
      msg: "ok",
      data: {
        name: "test",
      },
    };
});

route.post("/getUserInfo", async (ctx) => {
  const res = await getUserInfo({
    userName: ctx.cookies.get('userName'),
    userId: ctx.cookies.get('userId'),
    token: ctx.cookies.get("token"),
  });
  if (!res) {
    ctx.body = {
      code: 0,
      data: null,
      msg: "获取用户信息错误",
    };
  } else {
    ctx.body = {
      code: 200,
      data: {
        userName: res.username,
        lastLoginTime: Number(res.last_login_time),
        email: res.user_email,
        registerTime: Number(res.register_time),
        docs: res.docs,
      },
      msg: "获取用户信息成功",
    };
  }
});

route.post("/login", async (ctx) => {
  const data = await paramPaser(ctx);
  let code = 200;
  const res = await login({
    ...data
  });

  if (res.code !== "ok") {
    code = 0;
  } else {
    ctx.cookies.set("token", res.data.token);
    ctx.cookies.set('userId', res.data.userid);
    ctx.cookies.set('userName', res.data.username);
  }

  ctx.body = {
    code,
    data: res,
    msg: res.code,
  };
});

route.post("/register", async (ctx) => {
  const data = await paramPaser(ctx);

  const res = await register(data);
  if (res.code !== "ok") {
    ctx.body = {
      code: 0,
      data: null,
      msg: res.code,
    };
  } else {
    data.userid = res.userid;
    ctx.body = {
      code: 200,
      data,
      msg: "注册成功",
    };
  }
});

route.post("/getDocDetail", async (ctx) => {
  const params = await paramPaser(ctx);
  const res = await getDocDetail(params.id);
  ctx.body = res;
});

// 更新文章
route.post("/updateDocument", async (ctx) => {
  const params = await paramPaser(ctx);
  const res = await updateDoc(params);
  ctx.body = res;
});

// 路由的注册
app.use(route.routes()).use(route.allowedMethods());

// 开启HTTP服务
app.listen(9527, () => {
  console.log("server running at http://localhost:9527");
});
