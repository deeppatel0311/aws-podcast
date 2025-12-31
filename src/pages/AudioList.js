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

      <div className="space-y-4">
        {audioList.map((audio) => (
          <div
            key={audio.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex"
          >
            <div className="w-24 h-24 flex items-center justify-center flex-shrink-0">
              <img
                src={audio.thumbnail}
                alt={audio.title}
                className="w-16 h-16 object-cover rounded"
              />
            </div>

            <div className="flex-1 p-4 flex justify-between items-center">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {audio.title}
                </h3>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {audio.category}
                  </span>
                  <span>{audio.duration}</span>
                  <span>{audio.publishDate}</span>
                  {audio.itemCount && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      {audio.itemCount} items
                    </span>
                  )}
                </div>
              </div>

              <Link
                to={`/audio/${audio.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors font-medium ml-4"
              >
                Listen
              </Link>
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
