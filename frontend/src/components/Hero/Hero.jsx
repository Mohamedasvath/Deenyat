import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/logo.jpeg'

const IslamicLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-black min-h-screen">
      
      {/* Mobile Background */}
      <div className="absolute inset-0 lg:hidden">
        <img
          className="object-cover w-full h-full opacity-50"
          src="https://riwaqalquran.com/wp-content/uploads/2023/07/the-importance-of-reciting-the-holy-quran-daily.jpg"
          alt="Islamic background mobile"
        />
      </div>

      {/* Desktop Background */}
      <div className="absolute inset-0 hidden lg:block">
        <img
          className="object-cover w-full h-full opacity-40"
          src="https://riwaqalquran.com/wp-content/uploads/2023/07/the-importance-of-reciting-the-holy-quran-daily.jpg"
          alt="Islamic background desktop"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Header */}
      <header className="relative z-10 py-6 px-4 sm:px-6 lg:px-12 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="#" className="inline-flex">
            <img
              className="w-auto h-8"
              src={Logo}
              alt="Islamic Store"
            />
          </a>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:items-center md:space-x-6 lg:ml-8">
          <a href="#products" className="text-white text-base hover:text-gray-300">Products</a>
          <button className="px-4 py-2 border-2 border-white rounded-full text-white hover:bg-white hover:text-black transition duration-200">
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-10 pb-16 sm:pt-22 sm:pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          <div>
            <h1 className="text-white text-opacity-70 font-sans text-base">
              Discover Premium Islamic Products
            </h1>
            <p className="mt-6 text-white text-5xl sm:text-6xl font-sans">
              Bringing Faith<br />
              <span className="font-serif italic text-6xl sm:text-7xl pt-5">to Your Everyday Life</span>
            </p>
            <p className="mt-6 text-white text-opacity-70 leading-relaxed">
              Explore prayer mats, Qurans, hijabs, Islamic books, and more. Ethical, high-quality products that help you strengthen your faith daily.
            </p>

            {/* Call to Action */}
            <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <button
                onClick={() => navigate("/products")}
                className="px-6 py-3 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 transition"
              >
                Shop Now
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-black transition flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.0416 4.9192C7.37507 4.51928 6.5271 4.99939 6.5271 5.77669V18.2232C6.5271 19.0005 7.37507 19.4806 8.0416 19.0807L18.4137 12.8574C19.061 12.469 19.061 11.5308 18.4137 11.1424L8.0416 4.9192Z" />
                </svg>
                Contact Us
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <img
              className="w-full h-auto mx-auto"
              src="https://riwaqalquran.com/wp-content/uploads/2023/07/the-importance-of-reciting-the-holy-quran-daily.jpg"
              alt="Islamic products"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default IslamicLanding;
