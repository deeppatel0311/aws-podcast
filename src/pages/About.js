import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-8 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
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

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About AWS Daily Updates
          </h1>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">What is this project?</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              AWS Daily Updates is an innovative podcast platform that automatically converts AWS announcements 
              into audio content. This project demonstrates the power of modern cloud technologies by creating 
              a complete RSS-to-Podcast pipeline using AWS services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How it works</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Fetches latest AWS announcements from RSS feeds every 6 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Uses Amazon Bedrock AI to generate professional podcast scripts</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Converts text to natural speech using Amazon Polly (Matthew voice)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Stores audio files in S3 and metadata in DynamoDB</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                  <span>Serves content through a React frontend hosted on GitHub Pages</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Backend (AWS)</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• AWS Lambda (Node.js 20)</li>
                  <li>• Amazon Bedrock (AI)</li>
                  <li>• Amazon Polly (TTS)</li>
                  <li>• Amazon S3 (Storage)</li>
                  <li>• DynamoDB (Database)</li>
                  <li>• EventBridge (Scheduling)</li>
                  <li>• API Gateway (REST API)</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">Frontend</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• React 18</li>
                  <li>• React Router</li>
                  <li>• Tailwind CSS</li>
                  <li>• GitHub Pages</li>
                  <li>• GitHub Actions</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Purpose & Learning</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              This project was created as a learning exercise to explore and demonstrate:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Serverless architecture patterns with AWS Lambda</li>
              <li>AI integration using Amazon Bedrock for content generation</li>
              <li>Text-to-speech conversion with Amazon Polly</li>
              <li>Event-driven automation with EventBridge</li>
              <li>Modern React development with responsive design</li>
              <li>CI/CD deployment with GitHub Actions</li>
              <li>RESTful API design and integration</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Educational Purpose:</strong> This project is designed for learning and demonstration purposes. 
                    It showcases modern cloud development practices and serverless architecture patterns.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Created by</h2>
            <p className="text-gray-700 leading-relaxed">
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