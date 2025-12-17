import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RelatedProducts = ({ category, subCategory }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/products?category=${category}`
        );
        // Exclude exact product if needed
        setRelated(res.data.items || []);
      } catch (err) {
        console.log("Related products error:", err);
      }
    };
    if (category) fetchRelated();
  }, [category]);

  if (!related || related.length === 0) return null;

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold mb-5">Related Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {related.map((prod) => (
          <Link
            key={prod._id}
            to={`/product/${prod._id}`}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={prod.images?.[0] || "https://placehold.co/400x300?text=No+Image"}
              alt={prod.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <h3 className="text-sm font-medium">{prod.title}</h3>
              <p className="text-gray-500 text-xs mt-1">₹{prod.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
