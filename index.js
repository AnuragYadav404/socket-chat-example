const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const socket_server = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

socket_server.on("connection", (socket) => {
  console.log("A user connected");
  //   console.log("socket obj is: ", socket);
  socket.on("chat_message", (msg) => {
    console.log("message sent by a user");
    console.log("Message: ", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log(`server running at http://localhost:3000`);
});
