import express from "express";
// for local files when using modulejs you need to add the extention of the files too when importing
import { logout, signin, signup } from "../controllers/auh.controller.js";

const authRouter = express.Router();

// now create functions which will be attached to this router

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/login", logout);

export default authRouter;
