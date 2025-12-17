import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // Google login
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  // Email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("auth", "true");

      toast.success("Login successful!");
      navigate("/"); // Redirect to home
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-20 blur-sm"
          src="https://www.equip.org/wp-content/uploads/2023/04/YT-Is-the-Quran-Credible-1080-%C3%97-640-px.png"
          alt="background"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-black/80 backdrop-blur-md rounded-2xl shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="mt-4 text-3xl font-serif text-white font-bold">
            Login to Your Account
          </h2>
          <p className="mt-2 text-white/70 text-sm">
            Access premium Islamic products and content
          </p>
        </div>

        {error && (
          <p className="text-red-400 text-center mb-4">{error}</p>
        )}

        <div className="flex flex-col space-y-4">
          {/* Google login button */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center px-4 py-3 w-full bg-white rounded-full hover:bg-gray-100 transition shadow-md font-medium text-black"
          >
            <FcGoogle className="w-6 h-6 mr-2" />
            Continue with Google
          </button>

          {/* Email/password login form */}
          <form onSubmit={handleLogin} className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 text-white focus:outline-none focus:border-green-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 text-white focus:outline-none focus:border-green-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-green-600 rounded-full text-white font-semibold hover:bg-green-700 transition shadow-md"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-white/70 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-green-400 hover:text-green-300 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
