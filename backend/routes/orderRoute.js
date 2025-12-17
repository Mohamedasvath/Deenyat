import express from "express";
import { createCODOrder, getOrders, deleteOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/cod", createCODOrder);
router.get("/all", getOrders);
router.delete("/delete/:id", deleteOrder);

export default router;
