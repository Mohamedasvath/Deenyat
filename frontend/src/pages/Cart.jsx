import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { duration } from "@mui/material";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showCODForm, setShowCODForm] = useState(false);

  const [codForm, setCodForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const api = import.meta.env.VITE_API_URL;

  const totalPrice = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

  const handlePaymentSelection = (m) => {
    setPaymentMethod(m);
    if (m === "cod") setShowCODForm(true);
  };

  const handleCODSubmit = async () => {
    if (!codForm.name || !codForm.phone || !codForm.address)
      return toast.error("Please fill all fields");

    try {
      const { data } = await axios.post(`${api}/payment/cod`, {
        userDetails: codForm,
        items: cart,
        totalAmount: totalPrice,
      });

      if (data.success) {
       toast.success("🎉 Order confirmed!"),{ duration: 2000 };
        const orderId = data.orderId;

        clearCart();
        localStorage.removeItem("cart");

          setTimeout(() => {
    navigate(`/`);
  }, 2000); 
      }
    } catch (err) {
      toast.error("Order failed!"),{duration:2000};
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-10 py-8">
      <Toaster position="top-right" />

      <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 text-center mb-10">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-xl mt-20 ">Your cart is empty...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">

          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-900 border border-gray-700 p-4 sm:p-6 rounded-xl flex flex-col sm:flex-row gap-4"
                >
                  {/* Image */}
                  <div className="flex justify-center">
                    <img
                      src={item.images?.[0]}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-yellow-400"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col flex-1">
                    <h3 className="text-lg sm:text-xl">{item.title}</h3>
                    <p className="text-gray-300">₹{item.price}</p>
                    <p className="text-yellow-400 font-bold text-lg sm:text-xl">
                      ₹ {item.price * item.qty}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-3 self-start sm:self-center">
                    <button onClick={() => decreaseQty(item._id)} className="p-2 bg-gray-700 rounded-lg">
                      <AiOutlineMinus />
                    </button>

                    <span className="text-xl sm:text-2xl">{item.qty}</span>

                    <button onClick={() => increaseQty(item._id)} className="p-2 bg-gray-700 rounded-lg">
                      <AiOutlinePlus />
                    </button>

                    <button onClick={() => removeFromCart(item._id)} className="p-2 bg-red-600 rounded-lg">
                      <AiOutlineDelete />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ORDER SUMMARY */}
          <motion.div className="bg-gray-900 border border-gray-700 p-6 sm:p-8 rounded-xl h-fit">
            <h2 className="text-2xl sm:text-3xl text-yellow-400 mb-4">Order Summary</h2>

            <p className="text-base sm:text-lg">Total Items: {cart.reduce((acc, i) => acc + i.qty, 0)}</p>

            <h3 className="text-3xl sm:text-4xl text-yellow-400 font-bold my-4">
              ₹ {totalPrice}
            </h3>

            {/* COD Button */}
            <button
              onClick={() => handlePaymentSelection("cod")}
              className={`w-full p-3 sm:p-4 rounded-xl mt-3 text-lg ${
                paymentMethod === "cod" ? "bg-yellow-500 text-black" : "bg-gray-700"
              }`}
            >
              💵 Cash On Delivery
            </button>

            {/* COD Form */}
            {showCODForm && (
              <div className="mt-6 bg-gray-800 p-4 sm:p-6 rounded-xl">
                <h3 className="text-lg sm:text-xl font-bold mb-4">Enter Delivery Details</h3>

                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 mb-3 rounded bg-gray-700"
                  value={codForm.name}
                  onChange={(e) => setCodForm({ ...codForm, name: e.target.value })}
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full p-3 mb-3 rounded bg-gray-700"
                  value={codForm.phone}
                  onChange={(e) => setCodForm({ ...codForm, phone: e.target.value })}
                />

                <textarea
                  placeholder="Address"
                  className="w-full p-3 rounded bg-gray-700"
                  value={codForm.address}
                  onChange={(e) => setCodForm({ ...codForm, address: e.target.value })}
                />

                <button
                  onClick={handleCODSubmit}
                  className="w-full mt-4 py-3 bg-yellow-500 text-black font-bold rounded-xl text-lg"
                >
                  Confirm Order
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Cart;
