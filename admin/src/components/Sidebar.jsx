import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Package, Settings, ShoppingCart, Menu, X } from "lucide-react";
import ThemeToggle from "../theme/ThemeToggle";

const Sidebar = () => {
  const [open, setOpen] = useState(false); // mobile toggle
  const [collapsed, setCollapsed] = useState(false); // desktop collapse

  const links = [
    { to: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/products", label: "Products", icon: <Package size={20} /> },
    { to: "/orders", label: "Orders", icon: <ShoppingCart size={20} /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 p-2 rounded-lg shadow"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 70 : 240 }}
        className="hidden md:flex flex-col h-screen sticky top-0 bg-white dark:bg-gray-800 shadow-lg p-4 transition-all duration-300"
      >
        <div
          className="flex justify-between items-center mb-6 cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <h1 className="text-xl font-bold dark:text-white">
            {collapsed ? "AP" : "Admin Panel"}
          </h1>
          <div className="text-gray-500 dark:text-gray-300">{collapsed ? "»" : "«"}</div>
        </div>

        <nav className="flex-1 flex flex-col gap-2 overflow-y-auto">
          {links.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors text-gray-700 dark:text-gray-200
                ${isActive ? "bg-blue-600 text-white shadow" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`
              }
            >
              {link.icon}
              {!collapsed && <span className="truncate">{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      {open && (
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          className="md:hidden fixed top-0 left-0 w-64 h-screen bg-white dark:bg-gray-800 shadow-lg z-40 p-4 overflow-y-auto"
        >
          <nav className="flex flex-col gap-3">
            {links.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg text-gray-700 dark:text-gray-200
                  ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`
                }
              >
                {link.icon}
                <span className="truncate">{link.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto pt-4">
            <ThemeToggle />
          </div>
        </motion.aside>
      )}

      {/* Mobile backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
