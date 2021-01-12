const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 5000;
const router = require("./router");
const cors = require("cors");
const { addUser, removeUser, getUser, getUserRoom } = require("./users");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());
app.use(router);
// io.on("redirect", function (destination) {
//   window.location.href = destination;
// });
io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    console.log("We have a new connection!!!");
    console.log(name, room);
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log(error, "error");

    if (error) return callback(error);
    socket.join(user.room);
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, wellcome to the room ${user.room}!`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined!`,
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUserRoom(user.room),
    });
    callback();
  });
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log("disconnect");

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUserRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => {
  console.log("server running");
});
