import React, { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/ContactPage";
import Products from "./pages/products/Products";
import ProductDetails from "./pages/products/ProductDetails";
import Cart from "./pages/Cart";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { Toaster } from "react-hot-toast";
import SocialLoginSuccess from "./pages/SocialLoginSuccess";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const publicRoutes = ["/login", "/signup"];

    // Google redirect token
    const params = new URLSearchParams(window.location.search);
    const googleToken = params.get("token");

    if (googleToken) {
      localStorage.setItem("token", googleToken);
      window.history.replaceState({}, document.title, "/");
      navigate("/", { replace: true });
      return;
    }

    // ✅ If no token, redirect to login immediately
    if (!token && !publicRoutes.includes(location.pathname)) {
      navigate("/login", { replace: true });
      return;
    }

    // If token exists, block login/signup pages
    if (token && publicRoutes.includes(location.pathname)) {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

  const token = localStorage.getItem("token");

  return (
    <div className="dark:bg-black dark:text-white min-h-screen">
      {/* Only show Navbar if logged in */}
      {token && <Navbar />}

      <Toaster
        position="top-right"
        toastOptions={{ style: { background: "#333", color: "#fff" } }}
      />

      <Routes>
        {/* Protected Pages */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <ProductDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        {/* Public Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/social-login-success" element={<SocialLoginSuccess />} />
      </Routes>
    </div>
  );
};

export default App;
