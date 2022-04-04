const { WebSocketServer } = require("ws");

const server = new WebSocketServer({ port: 9528 });
console.log('websocket server running at port: 9528');

module.exports = server