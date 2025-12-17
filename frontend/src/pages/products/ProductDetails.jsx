import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/products/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return <p className="text-white text-center mt-10">Loading...</p>;

  const rating = product.rating || 4;

  const handleBuy = () => {
    toast.success("Order placed successfully! 🛒", {
      style: { background: "#1A1A1A", color: "white" },
    });
  };

  const handleAddCart = () => {
    addToCart({
      _id: product._id,
      title: product.name,
      price: product.sellingPrice,
      images: [product.imageUrl],
    });

    toast.success(`${product.name} added to cart! 🛒`, {
      style: {
        background: "#1A1A1A",
        color: "white",
        padding: "12px 20px",
        borderRadius: "12px",
        fontWeight: "500",
      },
      icon: "🛒",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white p-5 flex flex-col items-center">

      {/* Back Button */}
      <div className="w-full max-w-4xl sticky top-0 py-3 z-10 bg-[#0F0F0F]/80 backdrop-blur-xl">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-[#171717] hover:bg-[#222] transition rounded-xl border border-[#2a2a2a]"
        >
          ← Back
        </button>
      </div>

      {/* Product Grid */}
      <div className="w-full max-w-4xl mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Image Section */}
        <div className="bg-[#141414] rounded-2xl shadow-xl border border-[#1f1f1f] p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-56 md:h-96 object-cover rounded-xl shadow-2xl"
          />

          {/* Rating */}
          <div className="flex items-center gap-1 mt-5">
            {[...Array(5)].map((_, i) =>
              i < rating ? (
                <FaStar key={i} className="text-yellow-400 text-xl" />
              ) : (
                <FaRegStar key={i} className="text-gray-600 text-xl" />
              )
            )}
            <span className="ml-2 text-gray-400 text-sm">{rating}.0 Ratings</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <h2 className="text-3xl font-bold leading-snug mb-3">{product.name}</h2>

          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-[#2a2a2a] rounded-2xl p-5 shadow-lg">
            <p className="text-4xl font-extrabold text-green-400">₹{product.sellingPrice}</p>
            <p className="text-gray-400 mt-1 text-sm">Inclusive of all taxes</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddCart}
              className="flex-1 py-3 rounded-xl text-lg font-medium
                bg-gradient-to-r from-[#4C5EFF] to-[#6A7AFF]
                hover:opacity-90 shadow-lg transition active:scale-95"
            >
              Add to Cart
            </button>

            {/* <button
              onClick={handleBuy}
              className="flex-1 py-3 rounded-xl text-lg font-medium
                bg-gradient-to-r from-[#00D47E] to-[#00B96F]
                hover:opacity-90 shadow-lg transition active:scale-95"
            >
              Buy Now
            </button> */}
          </div>
        </div>
      </div>

      {/* Product Details Box */}
      <div className="w-full max-w-4xl mt-10 bg-[#141414]/90 backdrop-blur-xl rounded-2xl p-7 border border-[#222] shadow-2xl">
        <h3 className="text-2xl font-bold mb-5">Product Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Detail label="Purchase Price" value={`₹${product.sellingPrice}`} />
          <Detail label="Tax Rate" value={`${product.taxRate}%`} />
          <Detail label="Quantity" value={product.quantity} />
          <Detail label="Category" value={product.category} />
          <Detail label="Stock Status" value={product.stockStatus} />
          <Detail label="HSN/SAC Code" value={product.hsnSacCode || "N/A"} />
          <Detail label="Barcode" value={product.barcode || "N/A"} />
        </div>
      </div>
    </div>
  );
};

// Detail Component
const Detail = ({ label, value }) => (
  <div className="p-4 rounded-xl bg-[#1b1b1b] border border-[#2c2c2c] shadow-lg hover:bg-[#222] transition">
    <p className="text-gray-300 font-semibold">{label}</p>
    <p className="text-gray-400 mt-1">{value}</p>
  </div>
);

export default ProductDetails;
