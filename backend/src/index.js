import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { app, server, io } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
// using routes
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow auth cookies to be sent in the header
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.get("/", (req, res) => {
  res.send("Home");
});

server.listen(PORT, async () => {
  await connectDB();
  console.log("Server Listening on PORT " + PORT);
});
