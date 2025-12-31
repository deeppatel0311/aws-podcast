import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AudioHub</h3>
            <p className="text-gray-300">
              Discover amazing audio content every day
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              {/* <li>
                <a
                  href="/categories"
                  className="hover:text-white transition-colors"
                >
                  Categories
                </a>
              </li> */}
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Contact</h4>
            <p className="text-gray-300">example@example.com</p>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2026 AudioHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
