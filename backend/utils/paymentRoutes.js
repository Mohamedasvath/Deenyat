import express from "express";
import {
  createRazorpayOrder,
  verifyRazorpayPayment
} from "../controllers/paymentController.js";
import { paytmPayment } from "../controllers/paytmPayment.js";


const router = express.Router();

router.post("/razorpay/order", createRazorpayOrder);
router.post("/razorpay/verify", verifyRazorpayPayment);
router.post("/paytm/initiate", paytmPayment);
router.post("/cod", cashOnDelivery);



export default router;
