import express from "express";
// for local files when using modulejs you need to add the extention of the files too when importing
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

// now create paths which will be attached to this router

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.put("/update-profile", protectRoute, updateProfile);
authRouter.get("/check", protectRoute, checkAuth);

export default authRouter;
