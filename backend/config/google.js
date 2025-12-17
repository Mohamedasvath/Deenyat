import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

console.log("Google.js LOADED ✔", process.env.GOOGLE_CLIENT_ID);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      return done(null, {
        token: accessToken,
        profile,
      });
    }
  )
);
