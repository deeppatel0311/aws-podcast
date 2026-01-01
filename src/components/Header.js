import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link
            to="/"
            className="flex items-center space-x-3 hover:scale-105 transition-all duration-300 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                AWS Daily Updates
              </h1>
              <p className="text-xs text-gray-600 -mt-1">AI-Powered Podcast Platform</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
