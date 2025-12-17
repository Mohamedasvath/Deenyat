import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userDetails: {
    name: String,
    phone: String,
    address: String,
  },
  items: [
    {
      title: String,
      price: Number,
      qty: Number,
      image: String,
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);
