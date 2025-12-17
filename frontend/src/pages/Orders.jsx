import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Orders = () => {
  const { orderId } = useParams();
  const api = import.meta.env.VITE_API_URL;

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      const { data } = await axios.get(`${api}/orders/${orderId}`);
      setOrder(data.order);
    };
    loadOrder();
  }, []);

  const cancelOrder = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    const { data } = await axios.delete(`${api}/orders/${orderId}`);

    if (data.success) {
      toast.success("Order Cancelled!");
      setOrder(null);
    }
  };

  if (!order)
    return <p className="text-white text-center mt-20">Loading order...</p>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        Your Order Details
      </h1>

      <div className="bg-gray-900 p-6 rounded-xl">
        <p className="text-lg">Name: {order.userDetails.name}</p>
        <p className="text-lg">Phone: {order.userDetails.phone}</p>
        <p className="text-lg mb-4">Address: {order.userDetails.address}</p>

        <h2 className="text-2xl mb-3">Items</h2>
        {order.items.map((item) => (
          <div key={item._id} className="border-b border-gray-700 py-3">
            {item.title} — {item.qty} × ₹{item.price}
          </div>
        ))}

        <h2 className="text-3xl text-yellow-400 mt-4">
          Total: ₹{order.totalAmount}
        </h2>

        <button
          onClick={cancelOrder}
          className="mt-6 px-6 py-3 bg-red-600 rounded-xl"
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default Orders;
