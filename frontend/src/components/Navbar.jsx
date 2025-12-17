import React, { useRef, useEffect, useState } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("Home");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActive("Home");
        break;
      case "/products":
        setActive("Products");
        break;
      case "/about":
        setActive("About");
        break;
      case "/contact":
        setActive("Contact");
        break;
      case "/cart":
        setActive("Cart");
        break;
      default:
        setActive("");
    }
  }, [location]);

  useEffect(() => {
    if (open) {
      gsap.to(menuRef.current, { x: 0, duration: 0.6, ease: "power3.out" });
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.4,
      });
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.6,
        ease: "power3.inOut",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.4,
      });
    }
  }, [open]);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full bg-black/60 opacity-0 pointer-events-none z-40"
        onClick={() => setOpen(false)}
      />

      {/* Navbar */}
      <nav className="w-full bg-[#0f0f0f] text-white fixed top-0 left-0 z-50 px-6 py-4 flex items-center justify-between shadow-lg backdrop-blur-md">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 rounded-full border-2 border-yellow-400 shadow-md hover:scale-110 transition-transform duration-300"
          />
          <h1 className="text-2xl font-bold tracking-wide">JAMIYA CENTRE</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg font-medium">
          {menuItems.map((item) => (
            <li key={item.name} className="relative group">
              <Link
                to={item.path}
                className={`${
                  active === item.name
                    ? "text-yellow-400 font-semibold"
                    : "text-white"
                } transition-colors duration-300`}
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[3px] bg-yellow-400 transition-all duration-300 group-hover:w-full ${
                    active === item.name ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Controls */}
        <div className="flex items-center gap-5">
          <FaShoppingCart
            size={22}
            className={`cursor-pointer transition-colors duration-300 ${
              active === "Cart" ? "text-yellow-400" : "text-white"
            }`}
            onClick={() => navigate("/cart")}
          />

          {/* Desktop Auth */}
          {!token ? (
            <div className="hidden md:flex gap-4">
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition backdrop-blur-sm text-sm font-medium shadow-sm hover:shadow-lg"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-yellow-400 font-semibold text-sm">
                {user?.name || "User"}
              </span>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-400 transition-shadow shadow-md hover:shadow-lg text-sm font-medium"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Icon */}
          <FaBars
            size={26}
            className="md:hidden cursor-pointer"
            onClick={() => setOpen(true)}
          />
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-[75%] sm:w-[55%] md:hidden h-full bg-[#121212] text-white shadow-xl translate-x-full z-50 p-6 backdrop-blur-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Menu</h2>
          <FaTimes
            size={26}
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          />
        </div>

        <ul className="flex flex-col gap-6 text-lg font-medium">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`${
                  active === item.name ? "text-yellow-400" : "text-white"
                } hover:text-gray-300 transition-colors duration-300`}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}

          {/* Cart */}
          <li>
            <Link
              to="/cart"
              className={`${
                active === "Cart" ? "text-yellow-400" : "text-white"
              } hover:text-gray-300 transition-colors duration-300`}
              onClick={() => setOpen(false)}
            >
              Cart
            </Link>
          </li>

          {/* Auth Buttons */}
          {!token ? (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition backdrop-blur-sm text-sm font-medium shadow-sm hover:shadow-lg"
                onClick={() => setOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="text-yellow-400 font-semibold">{user?.name}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-400 transition-shadow shadow-md hover:shadow-lg text-sm font-medium"
              >
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
