// const { Server } = require("socket.io");

// const io = new Server(3000, {cors: true,});

// io.on("connection", (socket) => {
//   // send a message to the client
//   socket.emit("hello from server", 1);

//   // receive a message from the client
//   socket.on("hello from client", (...args) => {
//     // ...
//     console.log(args)
//   });
// });

const { WebSocketServer } = require("ws");

const server = new WebSocketServer({ port: 4444 });
const set = new Set()
server.on("connection", (socket) => {
    set.add(socket);
  // send a message to the client
  socket.send(JSON.stringify({
    type: "hello from server",
    content: [ 1, "2" ]
  }));

  // receive a message from the client
  // socket.on("message", (data) => {
  //   const packet = JSON.parse(data);

  //   switch (packet.type) {
  //     case "hello from client":
  //       // ...
  //       console.log(packet.content)
  //       set.forEach(socket => {
  //           socket.send(JSON.stringify({
  //               type: "hello from server",
  //               content: packet.content
  //             }));
  //       })
  //       break;
  //   }
  // });
});