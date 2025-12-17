import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";

import ProductControl from "./pages/ProductControl";
import { ThemeProvider } from "./theme/ThemeContext";
import AdminOrderNotes from './pages/AdminOrderNotes'

const App = () => {
  return (
    <ThemeProvider>
      <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Sidebar />

        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-control" element={<ProductControl />} />
            <Route path="/orders" element={<AdminOrderNotes/>} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
