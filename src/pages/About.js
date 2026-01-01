import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-slate-700 hover:text-slate-900 mb-8 transition-colors duration-300 group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
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
          Back to Home
        </Link>

        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              About AWS Daily Updates
            </h1>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">What is this project?</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                AWS Daily Updates is an innovative podcast platform that automatically converts AWS announcements 
                into audio content. This project demonstrates the power of modern cloud technologies by creating 
                a complete RSS-to-Podcast pipeline using AWS services.
              </p>

              <h2 className="text-2xl font-semibold text-slate-800 mb-4">How it works</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-slate-800 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 shadow-lg">1</span>
                    <span>Fetches latest AWS announcements from RSS feeds every 6 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 shadow-lg">2</span>
                    <span>Uses Amazon Bedrock AI to generate professional podcast scripts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 shadow-lg">3</span>
                    <span>Converts text to natural speech using Amazon Polly (Matthew voice)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 shadow-lg">4</span>
                    <span>Stores audio files in S3 and metadata in DynamoDB</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 shadow-lg">5</span>
                    <span>Serves content through a React frontend hosted on GitHub Pages</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Technology Stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Backend (AWS)
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center"><div className="w-2 h-2 bg-slate-600 rounded-full mr-2"></div>AWS Lambda (Node.js 20)</li>
                    <li className="flex items-center"><div className="w-2 h-2 bg-slate-600 rounded-full mr-2"></div>Amazon Bedrock (AI)</li>
                    <li className="flex items-center"><div className="w-2 h-2 bg-slate-600 rounded-full mr-2"></div>Amazon Polly (TTS)</li>
                    <li className="flex items-center"><div className="w-2 h-2 bg-slate-600 rounded-full mr-2"></div>Amazon S3 (Storage)</li>
                    <li className="flex items-center"><div className="w-2 h-2 bg-slate-600 rounded-full mr-2"></div>DynamoDB (Database)</li>
                    <li className="flex items-center"><div className="w-2 h-2 bg-slate-600 rounded-full mr-2"></div>EventBridge (Scheduling)</li>
                    <li className="flex items-center"><div className="w-2 h-2 bg-slate-600 rounded-full mr-2"></div>API Gateway (REST API)</li>
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Frontend
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center"><div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>React 18</li>
                    <li className="flex items-center"><div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>React Router</li>
                    <li className="flex items-center"><div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>Tailwind CSS</li>
                    <li className="flex items-center"><div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>GitHub Pages</li>
                    <li className="flex items-center"><div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>GitHub Actions</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Purpose & Learning</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                This project was created as a learning exercise to explore and demonstrate:
              </p>
              <ul className="list-none text-gray-600 space-y-2 mb-6">
                <li className="flex items-start"><span className="text-slate-600 mr-2">•</span>Serverless architecture patterns with AWS Lambda</li>
                <li className="flex items-start"><span className="text-slate-600 mr-2">•</span>AI integration using Amazon Bedrock for content generation</li>
                <li className="flex items-start"><span className="text-slate-600 mr-2">•</span>Text-to-speech conversion with Amazon Polly</li>
                <li className="flex items-start"><span className="text-slate-600 mr-2">•</span>Event-driven automation with EventBridge</li>
                <li className="flex items-start"><span className="text-slate-600 mr-2">•</span>Modern React development with responsive design</li>
                <li className="flex items-start"><span className="text-slate-600 mr-2">•</span>CI/CD deployment with GitHub Actions</li>
                <li className="flex items-start"><span className="text-slate-600 mr-2">•</span>RESTful API design and integration</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-800">
                      <strong>Educational Purpose:</strong> This project is designed for learning and demonstration purposes. 
                      It showcases modern cloud development practices and serverless architecture patterns.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Created by</h2>
              <p className="text-gray-600 leading-relaxed">
                This project was built as a hands-on learning experience to explore AWS services, 
                AI integration, and modern web development practices. It demonstrates how multiple 
                cloud services can work together to create an automated content pipeline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;