import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:text-blue-300 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">🎵</span>
            </div>
            <h1 className="text-2xl font-bold">AudioHub</h1>
          </Link>
          {/* <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="hover:text-blue-300 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className="hover:text-blue-300 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Categories
            </Link>
            <Link 
              to="/favorites" 
              className="hover:text-blue-300 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Favorites
            </Link>
          </nav> */}
          <div className="md:hidden">
            <button className="text-white hover:text-blue-300">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
