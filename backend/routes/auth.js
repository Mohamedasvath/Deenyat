import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { signup, login, getAllUsers } from "../controllers/authController.js";

const router = express.Router();

/* =========================
   NORMAL AUTH
========================= */
router.post("/signup", signup);
router.post("/login", login);

/* =========================
   GOOGLE AUTH START
========================= */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/* =========================
   GOOGLE CALLBACK
========================= */
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      // Google profile
      const profile = req.user.profile;

      // 🔐 Create JWT (IMPORTANT)
      const token = jwt.sign(
        {
          googleId: profile.id,
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
      );

      // ✅ Redirect to FRONTEND (Vercel)
      res.redirect(
        `${process.env.FRONTEND_URL}/social-login-success?token=${token}`
      );
    } catch (error) {
      console.error("Google Auth Error:", error);
      res.redirect(`${process.env.FRONTEND_URL}/login`);
    }
  }
);

/* =========================
   ADMIN / USERS
========================= */
router.get("/users", getAllUsers);

export default router;
