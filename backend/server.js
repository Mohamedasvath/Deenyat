import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import path from "path";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import orderRoutes from "./routes/orderRoute.js";
import orderNotesRoutes from "./routes/orderNotesRoutes.js";

import "./config/google.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Correct static path
app.use("/uploads", express.static(path.resolve("uploads")));

// DB
connectDB(process.env.MONGO_URI);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payment", orderRoutes);
app.use("/api/order-notes", orderNotesRoutes);

app.get("/", (req, res) => res.send("API RUNNING 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER → http://localhost:${PORT}`));
