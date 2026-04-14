import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

// create express app
const app = express();
// use this app to create a socket server
const server = createServer(app);
// create socket server
const io = new Server(server, {
  // handle cors from frontend
  cors: {
    origin: "*",
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // io.emit() is used to send the data to all the connected clients
  // io.emit(<event_name>, <data_to_be_sent>);
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
