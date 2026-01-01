import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-lg border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800">
                AWS Daily Updates
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              AI-powered podcast platform delivering AWS announcements in
              professional audio format
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4 text-slate-800">
              Quick Links
            </h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link
                  to="/"
                  className="hover:text-slate-800 transition-colors duration-300 flex items-center space-x-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-slate-800 transition-colors duration-300 flex items-center space-x-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                  <span>About</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4 text-slate-800">
              Technology
            </h4>
            <div className="space-y-2 text-gray-600 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>AWS Lambda & Bedrock</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                <span>Amazon Polly TTS</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <span>React & Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500">
            &copy; 2026 AWS Daily Updates. Educational Project - All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
