// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("📡 مستخدم متصل");

  socket.on("new-message", (msg) => {
    console.log("رسالة جديدة:", msg);
    // أرسل الرسالة لجميع المستخدمين الآخرين
    socket.broadcast.emit("receive-message", msg);
  });
});

server.listen(3000, () => {
  console.log("🚀 الخادم يعمل على http://localhost:3000");
});
