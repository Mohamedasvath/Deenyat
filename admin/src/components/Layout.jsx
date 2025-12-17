import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

const Layout = () => {
  const [open, setOpen] = useState(true); // Desktop collapse
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile overlay
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    dark ? html.classList.add("dark") : html.classList.remove("dark");
  }, [dark]);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        open={open}
        setOpen={setOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        dark={dark}
        setDark={setDark}
      />

      {/* MAIN CONTENT */}
      <div
        className={`flex-1 transition-all duration-300 
          bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white
          relative
        `}
      >
        {/* Mobile Menu Button */}
        <div className="md:hidden p-2">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 shadow"
          >
            <Menu size={26} />
          </button>
        </div>

        {/* Desktop margin shift */}
        <div
          className={`transition-all duration-300
            hidden md:block
            ${open ? "ml-[240px]" : "ml-[70px]"}
          `}
        >
          <Outlet />
        </div>

        {/* Mobile content */}
        <div className="md:hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
