import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { audioService } from "../services/audioService";

const AudioList = () => {
  const [audioList, setAudioList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAudioList = async () => {
      try {
        setLoading(true);
        const data = await audioService.getAudioList();
        setAudioList(data);
      } catch (err) {
        setError("Failed to load audio content");
      } finally {
        setLoading(false);
      }
    };

    fetchAudioList();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-slate-800 absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-black-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-slate-800 to-slate-600 rounded-2xl mb-6 shadow-xl">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-6">
            AWS Daily Updates
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Stay ahead with the latest AWS announcements and updates in podcast
            format,
            <span className="text-slate-700 font-semibold"> powered by AI</span>
          </p>
          <div className="mt-8 flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live Updates</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="text-sm font-medium">AI Generated</span>
            </div>
          </div>
        </div>

        {/* Audio Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {audioList.map((audio, index) => (
            <div
              key={audio.id}
              className="group relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden hover:scale-[1.02] hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={audio.thumbnail}
                  alt={audio.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Floating Play Button */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                    <svg
                      className="w-5 h-5 text-white ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                      AWS Updates
                    </span>
                    {audio.itemCount && (
                      <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                        {audio.itemCount} Stories
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                  {audio.title}
                </h3>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                    </svg>
                    <span className="text-sm font-medium">
                      {audio.publishDate}
                    </span>
                  </div>

                  <Link
                    to={`/audio/${audio.id}`}
                    className="relative bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-900 hover:to-slate-800 text-white px-3 py-3 rounded-2xl transition-all duration-300 font-bold flex items-center space-x-3 shadow-lg hover:shadow-xl group/btn transform hover:scale-105"
                  >
                    <svg
                      className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Listen Now</span>
                  </Link>
                </div>
              </div>

              {/* Subtle border glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {audioList.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No Content Available
            </h3>
            <p className="text-gray-500 text-lg mb-6">
              Check back soon for new AWS updates!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioList;
