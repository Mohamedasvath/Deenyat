import express from "express";
import Order from "../models/orderModel.js";

const router = express.Router();

router.post("/cod", async (req, res) => {
  try {
    const { userDetails, items, totalAmount, date } = req.body;

    const newOrder = new Order({
      userDetails,
      items,
      totalAmount,
      paymentMethod: "COD",
      status: "Pending",
      date,
    });

    await newOrder.save();

    return res.json({
      success: true,
      message: "Order stored successfully",
    });
  } catch (err) {
    console.log("COD Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;
