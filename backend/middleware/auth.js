import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user =
      decoded.role === "admin"
        ? await Admin.findById(decoded.id).select("-password")
        : await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default protect;
