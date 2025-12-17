import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  generateMonthlyPDF
} from "../controllers/orderNoteController.js";

const router = express.Router();

router.post("/create", createNote);
router.get("/", getNotes);
router.put("/update/:id", updateNote);
router.delete("/delete/:id", deleteNote);

// PDF DOWNLOAD
router.get("/monthly-report", generateMonthlyPDF);

export default router;
