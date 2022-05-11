毕设项目

在线PPT





技术栈

Vue3

语言: TypeScript

包管理工具: npm

规范工具: husky + commitizen


----

2022-02-05

目前想法是

PPT功能使用Vue3 + TypeScript

文档功能使用React17 + TypeScript

使用微前端框架将两个应用结合起来

微前端目前考虑选型是 single-spa or qiankun

还没有肯定

PPT的在线功能后端目前已用express搭建一个简单版本

后续考虑使用eggjs or koa2

由于后端功能比较简单，后续添加数据库

可能使用MySQL，也可能使用较为简单的MongoDB，并且配合Mongoose来使用

后端与前端结合的时候也可以尝试使用GraphQL风格

暂时计划这么多

----




使用 pnpm -r -filter ./packages run dev
可以一键启动packages 下面的所有项目


WebSocket开启

`HOST=localhost PORT=1234 npx y-websocket`