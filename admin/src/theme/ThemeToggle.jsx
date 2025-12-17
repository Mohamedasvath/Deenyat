import { useTheme } from "../theme/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg w-full flex items-center gap-2 text-gray-800 dark:text-gray-100"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <Moon /> : <Sun />}
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default ThemeToggle;
