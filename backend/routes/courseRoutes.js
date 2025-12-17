import express from "express";
import Course from "../models/courseModel.js";

const router = express.Router();

// Example route
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json({ success: true, courses });
});

export default router;
