import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // remove token from url
      window.history.replaceState({}, document.title, "/");

      navigate("/", { replace: true });
    } else {
      navigate("/login");
    }
  }, []);

  return null;
};

export default AuthCallback;
