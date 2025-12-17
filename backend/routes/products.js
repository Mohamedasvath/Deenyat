// import express from "express";
// import multer from "multer";
// import path from "path";

// import {
//   createProduct,
//   getProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct,
// } from "../controllers/productController.js";

// const router = express.Router();

// // -------------------------
// // 📌 MULTER STORAGE SETUP
// // -------------------------
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"), // uploads/ folder
//   filename: (req, file, cb) =>
//     cb(
//       null,
//       Date.now() + "-" + file.originalname.replace(/\s+/g, "-") // auto rename
//     ),
// });

// const upload = multer({ storage });

// // -------------------------
// // 📌 ROUTES
// // -------------------------

// // CREATE product (with image)
// router.post("/create", upload.single("image"), createProduct);

// // GET all products
// router.get("/", getProducts);

// // GET single product
// router.get("/:id", getProductById);

// // UPDATE product (image optional)
// router.put("/:id", upload.single("image"), updateProduct);

// // DELETE product
// router.delete("/:id", deleteProduct);

// export default router;


// import express from "express";
// import multer from "multer";

// import {
//   createProduct,
//   getProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct,
// } from "../controllers/productController.js";
// import upload from "../middleware/upload.js";

// const router = express.Router();

// // -------------------------
// // MULTER STORAGE ENGINE
// // -------------------------
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) =>
//     cb(
//       null,
//       Date.now() + "-" + file.originalname.replace(/\s+/g, "-")
//     ),
// });

// const upload = multer({ storage });

// // -------------------------
// // ROUTES
// // -------------------------

// // Create product + upload image
// router.post("/create", upload.single("image"), createProduct);

// // Get all
// router.get("/", getProducts);

// // Get one
// router.get("/:id", getProductById);

// // Update (optional new image)
// router.put("/:id", upload.single("image"), updateProduct);

// // Delete
// router.delete("/:id", deleteProduct);

// export default router;



import express from "express";
import upload from "../middleware/upload.js"; // import your multer config
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// CREATE product + upload image
router.post("/create", upload.single("image"), createProduct);

// UPDATE product (image optional)
router.put("/:id", upload.single("image"), updateProduct);

// GET all products
router.get("/", getProducts);

// GET single product
router.get("/:id", getProductById);

// DELETE product
router.delete("/:id", deleteProduct);

export default router;
