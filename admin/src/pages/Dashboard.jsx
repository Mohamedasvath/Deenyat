import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import { getProducts, getOrders, getUsers } from "../api/dashboardApi";

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    todaySales: 0,
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [products, allOrders, users] = await Promise.all([
        getProducts(),
        getOrders(),
        getUsers(),
      ]);

      // Today sales
      const today = new Date().toDateString();
      const todaySales = allOrders
        .filter((o) => o.date && new Date(o.date).toDateString() === today)
        .reduce((sum, o) => sum + Number(o.totalAmount || 0), 0);

      setStats({
        products: products.length,
        orders: allOrders.length,
        users: users.length,
        todaySales,
      });

      // Save all orders sorted by date descending
      setOrders(allOrders.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const card = (title, value, icon, index, bg) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-6 rounded-xl text-white shadow-md flex items-center justify-between ${bg}`}
    >
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <h2 className="text-3xl font-bold mt-1">{value}</h2>
      </div>
      <div className="text-white opacity-80">{icon}</div>
    </motion.div>
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-14 h-14 border-4 border-green-600 border-t-transparent rounded-full"
        />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-gray-900">
        {error}
      </div>
    );

  return (
    <div className="text-gray-900 dark:text-white w-full p-4 mt-9">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {card("Total Products", stats.products, <Package size={40} />, 0, "bg-blue-600")}
        {card("Total Orders", stats.orders, <ShoppingCart size={40} />, 1, "bg-green-600")}
        {card("Users", stats.users, <Users size={40} />, 2, "bg-purple-600")}
        {/* {card("Today's Sales", `₹${stats.todaySales}`, <DollarSign size={40} />, 3, "bg-orange-600")} */}
      </div>

      {/* Orders Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">All Orders</h2>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md overflow-x-auto">
          <table className="w-full text-left min-w-[700px] table-auto">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-2">Order ID</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Address</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((o, i) => (
                  <motion.tr
                    key={o._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="p-2 font-mono text-sm">{o._id}</td>
                    <td className="p-2">{o.userDetails?.name || "Guest"}</td>
                    <td className="p-2">{o.userDetails?.address || "N/A"}</td>
                    <td className="p-2">₹{o.totalAmount || 0}</td>
                    <td className="p-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          o.status === "Delivered"
                            ? "bg-green-200 text-green-800"
                            : o.status === "Pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-blue-200 text-blue-800"
                        }`}
                      >
                        {o.status || "Unknown"}
                      </span>
                    </td>
                    <td className="p-2">{new Date(o.date).toLocaleString()}</td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td className="p-3 text-gray-500" colSpan={6}>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {orders.length > 0 ? (
            orders.map((o, i) => (
              <motion.div
                key={o._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md"
              >
                <p className="font-mono text-sm text-gray-500">Order ID: {o._id}</p>
                <p className="font-medium">Customer: {o.userDetails?.name || "Guest"}</p>
                <p>Address: {o.userDetails?.address || "N/A"}</p>
                <p>Amount: ₹{o.totalAmount || 0}</p>
                <p>
                  Status:{" "}
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-sm ${
                      o.status === "Delivered"
                        ? "bg-green-200 text-green-800"
                        : o.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {o.status || "Unknown"}
                  </span>
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Date: {new Date(o.date).toLocaleString()}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No orders found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
