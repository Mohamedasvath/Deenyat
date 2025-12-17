import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // ---------------- FETCH PRODUCTS ----------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/products`);
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  // ---------------- CATEGORIES ----------------
  const categories = ["All", ...new Set(products.map((p) => p.category || "Uncategorized"))];

  // ---------------- FILTER ----------------
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ---------------- GROUP BY CATEGORY ----------------
  const productsByCategory = filteredProducts.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  // ---------------- CALCULATIONS ----------------
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (acc, p) => acc + (Number(p.quantity) || 0),
    0
  );

  const totalStockValue = products.reduce(
    (acc, p) =>
      acc + (Number(p.quantity) || 0) * (Number(p.sellingPrice) || 0),
    0
  );

  // ---------------- LOADING SCREEN ----------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-14 h-14 border-4 border-green-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white p-4">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl mt-20 font-semibold">Products & Services</h2>

        <div className="text-sm text-[#aaa] space-y-1 mt-20">
          <p>Total Products: {totalProducts}</p>
          <p>Total Stock: {totalStock}</p>
          <p className="text-green-500 font-semibold">
            Overall Stock Value: ₹{totalStockValue.toLocaleString("en-IN")}
          </p>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          className="px-3 py-2 bg-[#1A1A1A] rounded-lg outline-none text-sm w-full lg:w-60 mt-20"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CATEGORY TABS */}
      <div className="flex flex-wrap gap-2 mb-6 mt-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-green-600 text-black"
                : "bg-[#1A1A1A] text-white hover:bg-gray-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS LIST */}
      {Object.keys(productsByCategory).length > 0 ? (
        Object.entries(productsByCategory).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{category}</h3>

            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item._id}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => navigate(`/product/${item._id}`), 500);
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#1A1A1A] p-3 rounded-xl flex items-center gap-4 shadow-lg border border-[#222] cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-black">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-[#aaa] text-sm capitalize">
                      {item.category}
                    </p>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-lg">
                      Qty: {item.quantity} PCS
                    </span>

                    <div className="font-semibold text-lg">
                      ₹{item.sellingPrice}
                    </div>

                    <p className="text-xs text-[#aaa]">
                      Value: ₹
                      {(
                        (item.quantity || 0) * (item.sellingPrice || 0)
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-[#aaa] mt-8">No products found</p>
      )}
    </div>
  );
};

export default Products;
