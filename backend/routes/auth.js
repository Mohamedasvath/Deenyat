import express from "express";
import passport from "passport";  // IMPORTANT: must import passport
import { signup, login,getAllUsers } from "../controllers/authController.js";

const router = express.Router();

// Normal auth
router.post("/signup", signup);
router.post("/login", login);

// Google login start
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // You can customize token generation based on your logic
    const token = req.user.token || "dummy-token";

    res.redirect(`http://localhost:5173/social-login-success?token=${token}`);
  }
);
router.get("/users", getAllUsers)

export default router;
