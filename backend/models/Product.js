import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    sellingPrice: {
      type: Number,
      required: true,
    },

    taxRate: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      default: 0,
    },

    purchaseDate: {
      type: Date,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
    },
    completed: {
  type: Boolean,
  default: false,
},
 purchaseDate: { type: Date, 
   default: Date.now,
  },

    stockStatus: {
      type: String,
      enum: ["In Stock", "Low Stock", "Out of Stock"],
      default: "In Stock",
    },
  },
  { timestamps: true }
);

// Auto calculate total price + stock status
productSchema.pre("save", function (next) {
  const taxAmount = (this.sellingPrice * this.taxRate) / 100;
  this.totalPrice = this.sellingPrice + taxAmount;

  if (this.quantity === 0) {
    this.stockStatus = "Out of Stock";
  } else if (this.quantity < 5) {
    this.stockStatus = "Low Stock";
  } else {
    this.stockStatus = "In Stock";
  }

  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
