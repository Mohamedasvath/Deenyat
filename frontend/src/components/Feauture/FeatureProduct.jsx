import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Mushaf Quran",
    description: "High-quality Arabic Mushaf with Tajweed rules.",
    img: "https://static.vecteezy.com/system/resources/thumbnails/051/533/891/small/open-holy-quran-book-with-light-rays-falling-on-it-photo.jpeg",
    price: "$25",
  },
  {
    id: 2,
    name: "Islamic Prayer Mat",
    description: "Comfortable, soft, and beautifully designed prayer mat.",
    img: "https://www.weaveanddecor.com/cdn/shop/products/1_3.jpg?v=1667725319",
    price: "$40",
  },
  {
    id: 3,
    name: "Islamic Story Book",
    description: "Children’s Islamic stories for learning morals & values.",
    img: "https://islamhouse.in/wp-content/uploads/2023/10/IslamHouse-3288-0.jpg",
    price: "$15",
  },
];

const FeatureProducts = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  let startX = 0;
  const handleStart = (e) => (startX = e.touches[0].clientX);
  const handleEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50 && activeIndex < products.length - 1) setActiveIndex(activeIndex + 1);
    if (endX - startX > 50 && activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const cardVariants = {
    offscreen: { opacity: 0, y: 50, scale: 0.95 },
    onscreen: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.8,
        delay: index * 0.2,
      },
    }),
  };

  return (
    <div className="w-full bg-[#0d0d0d] text-white py-16 px-4 md:px-10">
      <h2 className="text-center text-4xl md:text-5xl font-bold mb-12">
        Featured Islamic Products
      </h2>

      {/* DESKTOP GRID */}
      <div className="hidden md:grid grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            custom={index}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 p-6 cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition-all"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-56 object-cover rounded-2xl mb-4 shadow-md"
            />
            <h3 className="text-xl font-bold text-white">{product.name}</h3>
            <p className="text-gray-300 text-sm mt-1 mb-3">{product.description}</p>
            <p className="text-2xl font-semibold text-yellow-400 mb-4">{product.price}</p>
            <Link to="/products">
              <button className="w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 transition-colors font-semibold text-black">
                Buy Now
              </button>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* MOBILE SWIPE VIEW */}
      <div
        className="md:hidden overflow-hidden relative"
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
      >
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="min-w-full px-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 p-5">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-52 object-cover rounded-2xl mb-4 shadow-md"
                />
                <h3 className="text-xl font-bold text-white">{product.name}</h3>
                <p className="text-gray-300 text-sm mt-1">{product.description}</p>
                <p className="text-2xl font-semibold text-yellow-400 mt-3">{product.price}</p>
                <button className="mt-5 w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 transition-colors font-semibold text-black">
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MOBILE DOT INDICATORS */}
      <div className="flex justify-center mt-5 space-x-2 md:hidden">
        {products.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeIndex === i ? "bg-yellow-400 scale-125" : "bg-gray-500 opacity-60"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProducts;
