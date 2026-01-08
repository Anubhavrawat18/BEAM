import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// since this isa middleware we will also have a parameter inside it "next"
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized Request" });
    }
    // now we need to check for the cookie if it is correct or not
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized Request" });
    }

    // if the above condition also passes...we can now forward this
    // if a user with the password exists then we go ahead and fetch the user and attach it to the request
    const user = await User.findById(decoded.userId).select("-password");
    // what if the user does not exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
    //
  } catch (error) {
    console.log("Error in protectRoute Middleware: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
