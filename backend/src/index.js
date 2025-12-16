import express from "express";

import authRouter from "./routes/auth.route.js";

const app = express();
// using routes
app.use("/api/auth", authRouter);

app.listen(5001, () => {
  console.log("Server Listening on Port 5001");
});

app.get("/", (req, res) => {
  res.send("Home");
});
