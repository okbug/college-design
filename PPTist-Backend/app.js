const str1 = `[{"id":"test123456","elements":[{"type":"shape","id":"4cbRxp","left":0,"top":200,"width":546,"height":362.5,"viewBox":200,"path":"M 0 0 L 0 200 L 200 200 Z","fill":"#5b9bd5","fixedRatio":false,"opacity":0.7,"rotate":0},{"type":"shape","id":"ookHrf","left":0,"top":0,"width":300,"height":320,"viewBox":200,"path":"M 0 0 L 0 200 L 200 200 Z","fill":"#5b9bd5","fixedRatio":false,"flipV":true,"rotate":0},{"type":"text","id":"idn7Mx","left":355,"top":65.25,"width":585,"height":154.390625,"lineHeight":1.2,"content":"<p><strong><span style='font-size:  112px'>PPTIST</span></strong></p>","rotate":0,"defaultFontName":"Microsoft Yahei","defaultColor":"#333"},{"type":"text","id":"7stmVP","left":355,"top":253.25,"width":585,"height":56,"content":"<p><span style='font-size:  24px'>基于 Vue 3.x + AJUNGE 的hahahah</span></p>","rotate":0,"defaultFontName":"Microsoft Yahei","defaultColor":"#333"},{"type":"line","id":"FnpZs4","left":361,"top":238,"start":[0,0],"end":[549,0],"points":["",""],"color":"#5b9bd5","style":"solid","width":2}],"background":{"type":"solid","color":"#ffffff"}},{"id":"test123456","elements":[{"type":"shape","id":"4cbRxp","left":0,"top":200,"width":546,"height":362.5,"viewBox":200,"path":"M 0 0 L 0 200 L 200 200 Z","fill":"#5b9bd5","fixedRatio":false,"opacity":0.7,"rotate":0},{"type":"shape","id":"ookHrf","left":0,"top":0,"width":300,"height":320,"viewBox":200,"path":"M 0 0 L 0 200 L 200 200 Z","fill":"#5b9bd5","fixedRatio":false,"flipV":true,"rotate":0},{"type":"text","id":"idn7Mx","left":355,"top":65.25,"width":585,"height":154.390625,"lineHeight":1.2,"content":"<p><strong><span style='font-size:  112px'>PPTIST</span></strong></p>","rotate":0,"defaultFontName":"Microsoft Yahei","defaultColor":"#333"},{"type":"text","id":"7stmVP","left":355,"top":253.25,"width":585,"height":56,"content":"<p><span style='font-size:  24px'>基于 Vue 3.x + AJUNGE 的hahahah</span></p>","rotate":0,"defaultFontName":"Microsoft Yahei","defaultColor":"#333"},{"type":"line","id":"FnpZs4","left":361,"top":238,"start":[0,0],"end":[549,0],"points":["",""],"color":"#5b9bd5","style":"solid","width":2}],"background":{"type":"solid","color":"#ffffff"}},{"id":"test123456","elements":[{"type":"shape","id":"4cbRxp","left":0,"top":200,"width":546,"height":362.5,"viewBox":200,"path":"M 0 0 L 0 200 L 200 200 Z","fill":"#5b9bd5","fixedRatio":false,"opacity":0.7,"rotate":0},{"type":"shape","id":"ookHrf","left":0,"top":0,"width":300,"height":320,"viewBox":200,"path":"M 0 0 L 0 200 L 200 200 Z","fill":"#5b9bd5","fixedRatio":false,"flipV":true,"rotate":0},{"type":"text","id":"idn7Mx","left":355,"top":65.25,"width":585,"height":154.390625,"lineHeight":1.2,"content":"<p><strong><span style='font-size:  112px'>PPTIST</span></strong></p>","rotate":0,"defaultFontName":"Microsoft Yahei","defaultColor":"#333"},{"type":"text","id":"7stmVP","left":355,"top":253.25,"width":585,"height":56,"content":"<p><span style='font-size:  24px'>基于 Vue 3.x + AJUNGE 的hahahah</span></p>","rotate":0,"defaultFontName":"Microsoft Yahei","defaultColor":"#333"},{"type":"line","id":"FnpZs4","left":361,"top":238,"start":[0,0],"end":[549,0],"points":["",""],"color":"#5b9bd5","style":"solid","width":2}],"background":{"type":"solid","color":"#ffffff"}}]`;

const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH, PUT, DELETE"
  );
  res.header("Allow", "GET, POST, PATCH, OPTIONS, PUT, DELETE");
  next();
});


app.get("/", (req, res) => {
  res.end("1212");
});

app.get("/test1", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
  res.end(str1);
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
