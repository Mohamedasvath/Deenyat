import Product from "../models/Product.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { name, category, sellingPrice, quantity, taxRate } = req.body;

    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.imageUrl;

    if (!imageUrl) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    // purchaseDate optional; default will be used from schema
    const product = await Product.create({
      name,
      category,
      sellingPrice,
      quantity,
      taxRate,
      imageUrl,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch {
    res.status(400).json({ success: false, message: "Invalid ID" });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    const { name, category, sellingPrice, quantity, taxRate } = req.body;

    const newData = {
      name,
      category,
      sellingPrice,
      quantity,
      taxRate,
      imageUrl: req.file
        ? `/uploads/${req.file.filename}`
        : req.body.imageUrl || product.imageUrl,
    };

    product = await Product.findByIdAndUpdate(req.params.id, newData, { new: true });

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    await product.deleteOne();

    res.json({ success: true, message: "Product deleted" });
  } catch {
    res.status(400).json({ success: false, message: "Invalid ID" });
  }
};
