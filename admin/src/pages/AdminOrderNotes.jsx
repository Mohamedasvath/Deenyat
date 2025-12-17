import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL;

const Orders = () => {
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    customerName: "",
    address: "",
    productName: "",
    quantity: "",
    price: "",
  });

  // ======================== FETCH NOTES ========================
  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API}/order-notes`);
      setNotes(res.data.notes || []);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ======================== CREATE / UPDATE ========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      total: Number(form.quantity) * Number(form.price),
    };
    try {
      if (editingId) {
        await axios.put(`${API}/order-notes/update/${editingId}`, payload);
      } else {
        await axios.post(`${API}/order-notes/create`, payload);
      }
      fetchNotes();
      setForm({ customerName: "", address: "", productName: "", quantity: "", price: "" });
      setEditingId(null);
    } catch (err) {
      console.log("Submit error:", err);
    }
  };

  // ======================== EDIT ========================
  const startEdit = (note) => {
    setForm({
      customerName: note.customerName,
      address: note.address,
      productName: note.productName,
      quantity: note.quantity,
      price: note.price,
    });
    setEditingId(note._id);
  };

  // ======================== DELETE ========================
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API}/order-notes/delete/${id}`);
      fetchNotes();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // ======================== DOWNLOAD PDF ========================
  const downloadPDF = () => {
    window.open(`${API}/order-notes/monthly-report`, "_blank");
  };

  return (
    <motion.div className="p-4 md:p-8 text-gray-900 dark:text-white max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Admin Order Notes
      </h1>

      {/* ======================== FORM ======================== */}
      <motion.form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {["customerName", "address", "productName"].map((field) => (
          <input
            key={field}
            className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full"
            placeholder={field.replace(/([A-Z])/g, " $1")}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}

        <input
          className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full"
          placeholder="Quantity"
          type="number"
          min={1}
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />

        <input
          className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full"
          placeholder="Price"
          type="number"
          min={0}
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <button
          type="submit"
          className="col-span-1 sm:col-span-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:opacity-90 text-white py-3 rounded-xl text-lg font-semibold shadow-lg transition-all"
        >
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </motion.form>

      {/* ======================== PDF BUTTON ======================== */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={downloadPDF}
        className="mt-6 w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-800 hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all"
      >
        Download Monthly PDF
      </motion.button>

      {/* ======================== TABLE / CARDS ======================== */}
      <div className="mt-6 space-y-4">
        {notes.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No orders yet.
          </p>
        ) : (
          notes.map((n) => (
            <motion.div
              key={n._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-1 w-full sm:w-3/4">
                <p className="font-semibold text-lg truncate">{n.customerName}</p>
                <p className="text-gray-500 dark:text-gray-300 truncate">{n.address}</p>
                <p className="text-gray-500 dark:text-gray-300 truncate">{n.productName}</p>
                <p>
                  Qty: <span className="font-medium">{n.quantity}</span> | Price: <span className="font-medium">₹{n.price}</span> | Total: <span className="font-bold">₹{n.total}</span>
                </p>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => startEdit(n)}
                  className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(n._id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Orders;
