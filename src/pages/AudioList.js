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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            AWS Daily Updates
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Latest AWS announcements and updates in podcast format, powered by
            AI
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {audioList.map((audio) => (
            <div
              key={audio.id}
              className="group relative bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-105"
            >
              <div className="relative">
                <img
                  src={audio.thumbnail}
                  alt={audio.title}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      AWS Updates
                    </span>
                    {audio.itemCount && (
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {audio.itemCount} News
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">
                  {audio.title}
                </h3>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
                  {audio.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {audio.publishDate}
                  </span>

                  <Link
                    to={`/audio/${audio.id}`}
                    className="relative bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl group/btn"
                  >
                    <svg
                      className="relative w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span className="relative">Listen</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {audioList.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-500 text-xl">
              No audio content available
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioList;
