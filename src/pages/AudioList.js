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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AWS Daily Updates
        </h1>
        <p className="text-gray-600">
          Latest AWS announcements and updates in podcast format
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {audioList.map((audio) => (
          <div
            key={audio.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col"
          >
            <div className="relative">
              <img
                src={audio.thumbnail}
                alt={audio.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    AWS Updates
                  </span>
                  {audio.itemCount && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {audio.itemCount} News
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                {audio.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                {audio.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {audio.publishDate}
                </span>

                <Link
                  to={`/audio/${audio.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center space-x-2 shadow-md hover:shadow-lg group"
                >
                  <svg
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Listen</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {audioList.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-xl">
            No audio content available
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioList;
