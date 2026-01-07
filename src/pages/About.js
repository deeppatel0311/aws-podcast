import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center text-slate-700 hover:text-slate-900 mb-12 transition-all duration-300 group bg-white/60 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl"
        >
          <svg
            className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-semibold">Back to Home</span>
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-slate-800 to-slate-600 rounded-3xl mb-8 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-6">
            About This Project
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how AI and cloud technologies come together to create an automated podcast platform
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3"></div>
                What is this project?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                AWS Daily Updates is an innovative podcast platform that automatically converts AWS announcements 
                into professional audio content. This project demonstrates the power of modern cloud technologies by creating 
                a complete RSS-to-Podcast pipeline using AWS services and AI.
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg mr-3"></div>
                How it works
              </h2>
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-2xl p-8 mb-8">
                <div className="space-y-6">
                  {[
                    { step: 1, text: "Fetches latest AWS announcements from RSS feeds every 6 hours", color: "from-red-500 to-pink-500" },
                    { step: 2, text: "Uses Amazon Bedrock AI to generate professional podcast scripts", color: "from-orange-500 to-yellow-500" },
                    { step: 3, text: "Converts text to natural speech using Amazon Polly (Matthew voice)", color: "from-green-500 to-teal-500" },
                    { step: 4, text: "Stores audio files in S3 and metadata in DynamoDB", color: "from-blue-500 to-indigo-500" },
                    { step: 5, text: "Serves content through a React frontend hosted on GitHub Pages", color: "from-purple-500 to-pink-500" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start group">
                      <div className={`bg-gradient-to-r ${item.color} text-white rounded-2xl w-12 h-12 flex items-center justify-center text-lg font-bold mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {item.step}
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed pt-2 group-hover:text-slate-800 transition-colors duration-300">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Technology Stack */}
            <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl p-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Tech Stack
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2"></div>
                    Backend (AWS)
                  </h4>
                  <div className="space-y-2 text-sm">
                    {["AWS Lambda (Node.js 20)", "Amazon Bedrock (AI)", "Amazon Polly (TTS)", "Amazon S3 (Storage)", "DynamoDB (Database)", "EventBridge (Scheduling)", "API Gateway (REST API)"].map((tech, i) => (
                      <div key={i} className="flex items-center text-gray-600">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-2"></div>
                    Frontend
                  </h4>
                  <div className="space-y-2 text-sm">
                    {["React 18", "React Router", "Tailwind CSS", "GitHub Pages", "GitHub Actions"].map((tech, i) => (
                      <div key={i} className="flex items-center text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Goals */}
            <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl p-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Learning Goals
              </h3>
              <div className="space-y-3">
                {[
                  "Serverless architecture patterns",
                  "AI integration with Bedrock", 
                  "Text-to-speech conversion",
                  "Event-driven automation",
                  "Modern React development",
                  "CI/CD with GitHub Actions"
                ].map((goal, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-600 text-sm">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <h3 className="text-2xl font-bold">Educational Purpose</h3>
            </div>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto">
              This project was built as a hands-on learning experience to explore AWS services, 
              AI integration, and modern web development practices. It demonstrates how multiple 
              cloud services can work together to create an automated content pipeline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;