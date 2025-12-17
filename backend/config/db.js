// config/db.js
import mongoose from "mongoose";

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri); // No options needed for Mongoose 6+
    console.log(" MongoDB connected🚀");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
};