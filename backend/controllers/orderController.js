import Order from "../models/orderModel.js";

// CREATE ORDER (COD)
export const createCODOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    return res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error creating order" });
  }
};

// GET ALL ORDERS (for user)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// DELETE ORDER
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
