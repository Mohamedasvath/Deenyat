import express from "express";
import { createContact, listContacts } from "../controllers/contactController.js";
import protect from "../middleware/auth.js";
import isAdmin from "../middleware/admin.js";

const router = express.Router();

// Public – submit contact form
router.post("/", createContact);

// Admin – view all contact form submissions
router.get("/",  listContacts);

export default router;
