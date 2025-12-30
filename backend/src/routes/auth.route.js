import express from "express";
// for local files when using modulejs you need to add the extention of the files too when importing
import { login, logout, signup } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// now create functions which will be attached to this router

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
