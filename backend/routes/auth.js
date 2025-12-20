import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

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
    // 🔥 REAL JWT (dummy-token illa)
    const token = jwt.sign(
      {
        id: req.user.profile.id,
        email: req.user.profile.emails[0].value,
        name: req.user.profile.displayName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ LIVE SAFE REDIRECT
    res.redirect(
      `${process.env.FRONTEND_URL}/social-login-success?token=${token}`
    );
  }
);

export default router;
