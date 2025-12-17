// data/seedProducts.js
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Product from "../models/Product.js";
import { connectDB } from "../config/db.js";

const seed = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    // remove existing
    await User.deleteMany({});
    await Product.deleteMany({});

    // create admin
    const salt = await bcrypt.genSalt(10);
    const adminPass = await bcrypt.hash("admin123", salt);
    const admin = await User.create({ name: "Admin", email: "admin@shop.com", passwordHash: adminPass, role: "admin" });
    console.log("Admin created:", admin.email, "password: admin123");

    // products
    const products = [
      { title: "Quran Dress A", description: "Comfortable fabric", price: 400, images: [], category: "Mens", stock: 10, tags: ["quran","dress","traditional"] },
      { title: "Quran Dress B", description: "Premium stitching", price: 200, images: [], category: "Womens", stock: 4, tags: ["quran","festive"] },
      { title: "Prayer Cap", description: "Soft and warm", price: 300, images: [], category: "Accessories", stock: 50, tags: ["cap","prayer"] },
       { title: "jeans shirt", description: "Soft cloth", price: 300, images: [], category: "Accessories", stock: 50, tags: ["cap","prayer"] }
    ];
    await Product.insertMany(products);
    console.log("Products seeded");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
