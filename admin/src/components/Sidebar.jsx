import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import ThemeToggle from "../theme/ThemeToggle";

const Sidebar = () => {
  const [open, setOpen] = useState(false); // mobile
  const [collapsed, setCollapsed] = useState(false); // desktop

  // 🔒 Lock body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const links = [
    { to: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/products", label: "Products", icon: <Package size={20} /> },
    { to: "/orders", label: "Orders", icon: <ShoppingCart size={20} /> },
  ];

  return (
    <>
      {/* ✅ MOBILE HAMBURGER */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[100] bg-white dark:bg-gray-800 p-2 rounded-lg shadow"
      >
        <Menu size={24} />
      </button>

      {/* ✅ DESKTOP SIDEBAR */}
      <motion.aside
        animate={{ width: collapsed ? 70 : 240 }}
        className="hidden md:flex flex-col h-screen sticky top-0 bg-white dark:bg-gray-800 shadow-lg p-4"
      >
        <div
          className="flex justify-between items-center mb-6 cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <h1 className="text-xl font-bold dark:text-white">
            {collapsed ? "AP" : "Admin Panel"}
          </h1>
          <span className="text-gray-500 dark:text-gray-300">
            {collapsed ? "»" : "«"}
          </span>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {links.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              {link.icon}
              {!collapsed && <span>{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        <ThemeToggle />
      </motion.aside>

      {/* ✅ MOBILE SIDEBAR */}
      <AnimatePresence>
        {open && (
          <>
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="md:hidden fixed top-0 left-0 w-64 h-screen bg-white dark:bg-gray-800 z-[90] p-4 shadow-lg"
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4"
              >
                <X size={24} />
              </button>

              <nav className="mt-12 flex flex-col gap-3">
                {links.map((link, idx) => (
                  <NavLink
                    key={idx}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg
                      ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`
                    }
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="mt-auto pt-6">
                <ThemeToggle />
              </div>
            </motion.aside>

            {/* BACKDROP */}
            <div
              onClick={() => setOpen(false)}
              className="md:hidden fixed inset-0 bg-black/40 z-[80]"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
