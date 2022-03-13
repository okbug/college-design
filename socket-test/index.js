const { io } = require("socket.io-client");

const socket = io("ws://localhost:3000");
// send a message to the server
socket.emit("hello from client", 2);

// receive a message from the server
socket.on("hello from server", (...args) => {
  // ...
  console.log('client see', args)
});