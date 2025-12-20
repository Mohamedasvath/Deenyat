import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SocialLoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("auth", "true");
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center text-white">
      Logging in with Google...
    </div>
  );
};

export default SocialLoginSuccess;
