import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Edit, Trash2, PlusCircle, X, CheckCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    sellingPrice: "",
    quantity: "",
    taxRate: "",
    imageUrl: "",
    imageFile: null,
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, imageFile: file, imageUrl: "" });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.imageFile && !form.imageUrl)
      return toast.error("Image URL or file is required");

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("category", form.category);
    fd.append("sellingPrice", form.sellingPrice);
    fd.append("quantity", form.quantity);
    fd.append("taxRate", form.taxRate);
    if (form.imageFile) fd.append("image", form.imageFile);
    else fd.append("imageUrl", form.imageUrl);

    try {
      let res;
      if (editingProduct) {
        res = await axios.put(
          `${API_URL}/products/${editingProduct._id}`,
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Product updated successfully");
      } else {
        res = await axios.post(`${API_URL}/products/create`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product added successfully");
      }

      const newProduct = res.data.product;
      if (editingProduct) {
        setProducts(products.map((p) => (p._id === newProduct._id ? newProduct : p)));
      } else {
        setProducts([newProduct, ...products]);
      }

      setIsFormOpen(false);
      setEditingProduct(null);
      setForm({
        name: "",
        category: "",
        sellingPrice: "",
        quantity: "",
        taxRate: "",
        imageUrl: "",
        imageFile: null,
      });
      setPreviewImage(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit product");
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  const toggleCompleted = async (product) => {
    try {
      const res = await axios.put(`${API_URL}/products/${product._id}`, {
        completed: !product.completed,
      });
      setProducts(products.map((p) => (p._id === product._id ? res.data.product : p)));
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const openForm = () => {
    setForm({
      name: "",
      category: "",
      sellingPrice: "",
      quantity: "",
      taxRate: "",
      imageUrl: "",
      imageFile: null,
    });
    setPreviewImage(null);
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const editForm = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      sellingPrice: product.sellingPrice,
      quantity: product.quantity,
      taxRate: product.taxRate,
      imageUrl: product.imageUrl || "",
      imageFile: null,
    });
    setPreviewImage(product.imageUrl ? `${API_URL}${product.imageUrl}` : null);
    setIsFormOpen(true);
  };

  const getImageUrl = (product) => {
    if (product.imageFile) return URL.createObjectURL(product.imageFile);
    if (!product.imageUrl) return "";
    return product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `${API_URL}${product.imageUrl}`;
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"
        />
      </div>
    );

  return (
    <div className="p-4 text-white min-h-screen">
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row justify-between items-center mt-20 mb-6 gap-4">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={openForm}
          className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <PlusCircle size={20} /> Add Product
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-[#111] p-4 rounded-xl overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Tax %</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-center">Complete</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <motion.tr
                key={p._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-gray-800 hover:bg-gray-900"
              >
                <td className="p-3">
                  {getImageUrl(p) && (
                    <img
                      src={getImageUrl(p)}
                      alt={p.name}
                      className="w-14 h-14 rounded object-cover"
                    />
                  )}
                </td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">₹{p.sellingPrice}</td>
                <td className="p-3">{p.taxRate}%</td>
                <td className="p-3">{p.quantity}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => toggleCompleted(p)}
                    className={`px-3 py-1 rounded-lg flex items-center gap-1 justify-center mx-auto ${
                      p.completed ? "bg-green-700" : "bg-gray-700"
                    }`}
                  >
                    <CheckCircle size={18} /> {p.completed ? "Done" : "Pending"}
                  </button>
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <button onClick={() => editForm(p)} className="text-blue-400 hover:text-blue-600">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => deleteProduct(p._id)} className="text-red-400 hover:text-red-600">
                    <Trash2 size={20} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List */}
      <div className="md:hidden space-y-4 mt-5">
        {products.map((p) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a1a1a] p-4 rounded-xl flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              {getImageUrl(p) && (
                <img src={getImageUrl(p)} alt={p.name} className="w-20 h-20 rounded object-cover" />
              )}
              <div className="flex-1">
                <h2 className="font-bold text-lg">{p.name}</h2>
                <p className="text-gray-400">{p.category}</p>
                <p className="font-semibold mt-1">₹{p.sellingPrice}</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-2">
              <button
                onClick={() => toggleCompleted(p)}
                className={`px-3 py-1 rounded-lg flex items-center gap-1 ${
                  p.completed ? "bg-green-700" : "bg-gray-700"
                }`}
              >
                <CheckCircle size={18} /> {p.completed ? "Done" : "Mark Complete"}
              </button>
              <div className="flex gap-3">
                <button onClick={() => editForm(p)} className="text-blue-400 hover:text-blue-600">
                  <Edit size={20} />
                </button>
                <button onClick={() => deleteProduct(p._id)} className="text-red-400 hover:text-red-600">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Product Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1c1c1c] p-6 rounded-xl w-full max-w-md shadow-lg"
          >
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">{editingProduct ? "Edit Product" : "Add Product"}</h2>
              <X onClick={() => setIsFormOpen(false)} className="cursor-pointer hover:text-red-500" />
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="w-full p-2 bg-black rounded focus:outline-none focus:ring-2 focus:ring-green-600" />
              <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="w-full p-2 bg-black rounded focus:outline-none focus:ring-2 focus:ring-green-600" />
              <input name="sellingPrice" type="number" placeholder="Price" value={form.sellingPrice} onChange={handleChange} className="w-full p-2 bg-black rounded focus:outline-none focus:ring-2 focus:ring-green-600" />
              <input name="taxRate" type="number" placeholder="Tax %" value={form.taxRate} onChange={handleChange} className="w-full p-2 bg-black rounded focus:outline-none focus:ring-2 focus:ring-green-600" />
              <input name="quantity" type="number" placeholder="Stock" value={form.quantity} onChange={handleChange} className="w-full p-2 bg-black rounded focus:outline-none focus:ring-2 focus:ring-green-600" />
              {/* <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 bg-black rounded focus:outline-none focus:ring-2 focus:ring-green-600" /> */}
              {!form.imageFile && <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} className="w-full p-2 bg-black rounded focus:outline-none focus:ring-2 focus:ring-green-600" />}
              {previewImage && <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded mt-2" />}
              <button className="w-full bg-green-600 py-2 rounded mt-2 hover:bg-green-700 transition">{editingProduct ? "Update Product" : "Add Product"}</button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Products;
