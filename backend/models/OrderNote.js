import mongoose from "mongoose";

const orderNoteSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    address: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number },
  },
  { timestamps: true }
);

orderNoteSchema.pre("save", function (next) {
  this.total = this.quantity * this.price;
  next();
});

export default mongoose.model("OrderNote", orderNoteSchema);
