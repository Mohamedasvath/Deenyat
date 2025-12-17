import crypto from "crypto";
import razorpay from "../utils/razorpay.js";

// ⭐ Razorpay Order Create
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_order_" + Math.random(1000),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ⭐ Razorpay Payment Verify
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true, message: "Payment Verified" });
    } else {
      res.json({ success: false, message: "Invalid Signature" });
    }

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ⭐ Cash On Delivery
export const cashOnDelivery = async (req, res) => {
  try {
    const { items, totalAmount, userId, address } = req.body;

    // Save COD order to DB here (optional)

    res.json({
      success: true,
      message: "COD order placed successfully!",
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
