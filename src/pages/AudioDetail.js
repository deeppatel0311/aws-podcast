import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { audioService } from "../services/audioService";

const AudioDetail = () => {
  const { id } = useParams();
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState(null);
  const [visualizerBars, setVisualizerBars] = useState(Array(20).fill(8));
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // Animate visualizer bars when playing
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setVisualizerBars((prev) => prev.map(() => Math.random() * 40 + 10));
      }, 150);
    } else {
      setVisualizerBars(Array(20).fill(8));
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        setLoading(true);
        const data = await audioService.getAudioById(id);
        if (!data) {
          setError("Audio not found");
        } else {
          setAudio(data);
        }
      } catch (err) {
        setError("Failed to load audio details");
      } finally {
        setLoading(false);
      }
    };

    fetchAudio();
  }, [id]);

  const handlePlayPause = () => {
    if (audioRef) {
      if (isPlaying) {
        audioRef.pause();
      } else {
        audioRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef) {
      setCurrentTime(audioRef.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef) {
      setDuration(audioRef.duration);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleVolumeUp = () => {
    if (audioRef && volume < 1) {
      const newVolume = Math.min(volume + 0.1, 1);
      setVolume(newVolume);
      audioRef.volume = newVolume;
    }
  };

  const handleVolumeDown = () => {
    if (audioRef && volume > 0) {
      const newVolume = Math.max(volume - 0.1, 0);
      setVolume(newVolume);
      audioRef.volume = newVolume;
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: audio.title,
      text: audio.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

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

  if (error || !audio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">
            {error || "Audio not found"}
          </div>
          <Link
            to="/"
            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

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
          Back to Audio List
        </Link>

        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden">
          <div className="relative">
            <img
              src={audio.thumbnail}
              alt={audio.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {audio.category}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 leading-tight">
              {audio.title}
            </h1>

            {/* Description */}
            {audio.description && (
              <div className="mb-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {audio.description}
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
              <span>Published: {audio.publishDate}</span>
            </div>

            {/* Audio Player */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-800">
                <svg
                  className="w-6 h-6 mr-2 text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
                Audio Player
              </h3>

              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                {/* Audio Player Layout */}
                <div className="flex flex-col items-center space-y-8">
                  
                  {/* Main Control Section */}
                  <div className="flex items-center justify-center space-x-12">
                    
                    {/* Volume Down */}
                    <button
                      onClick={handleVolumeDown}
                      className="group bg-slate-800 hover:bg-slate-900 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                        <path d="M16 12h3v-1h-3v1z"/>
                      </svg>
                    </button>

                    {/* Play Button */}
                    <div className="relative">
                      <button
                        onClick={handlePlayPause}
                        className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-105 border-4 border-gray-200 ${
                          isPlaying 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : 'bg-slate-800 hover:bg-slate-900'
                        }`}
                      >
                        <svg
                          className="w-12 h-12 text-white ml-1"
                          fill={isPlaying ? "none" : "currentColor"}
                          stroke={isPlaying ? "currentColor" : "none"}
                          viewBox="0 0 24 24"
                        >
                          {isPlaying ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M10 9v6m4-6v6"
                            />
                          ) : (
                            <path d="M8 5v14l11-7z" />
                          )}
                        </svg>
                      </button>
                    </div>

                    {/* Volume Up */}
                    <button
                      onClick={handleVolumeUp}
                      className="group bg-slate-800 hover:bg-slate-900 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                        <path d="M16 9h3v1h-3V9zm0 2h3v1h-3v-1z"/>
                      </svg>
                    </button>
                  </div>

                  {/* Audio Visualizer */}
                  <div className="flex flex-col items-center space-y-6">
                    <div className="flex items-end justify-center space-x-2 h-24 px-8">
                      {visualizerBars.map((height, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-gradient-to-t from-slate-600 via-slate-500 to-slate-400 rounded-full transition-all duration-300 ease-out"
                          style={{
                            height: `${height}px`
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    <div className="text-center space-y-2">
                      <p className={`text-xl font-semibold transition-colors duration-300 ${
                        isPlaying ? 'text-slate-800' : 'text-gray-600'
                      }`}>
                        {isPlaying ? '♪ Now Playing' : '♫ Ready to Play'}
                      </p>
                    </div>
                  </div>

                  {/* Info Display */}
                  <div className="flex items-center justify-center space-x-8">
                    {/* Timer */}
                    <div className="bg-gray-100 border border-gray-200 rounded-xl px-6 py-3">
                      <div className="text-center">
                        <div className="text-3xl font-mono font-bold text-slate-800 tracking-wider">
                          {formatTime(currentTime)}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {formatTime(duration)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Volume Display */}
                    <div className="bg-gray-100 border border-gray-200 rounded-xl px-6 py-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-800">
                          {Math.round(volume * 100)}%
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Volume
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <audio
                  ref={setAudioRef}
                  src={audio.audioUrl}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => {
                    setIsPlaying(false);
                    setVisualizerBars(Array(20).fill(8));
                    setCurrentTime(0);
                  }}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            {/* News Items */}
            {audio.items && audio.items.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-800">
                  <svg
                    className="w-6 h-6 mr-2 text-slate-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  News Items ({audio.itemCount})
                </h3>
                <div className="space-y-4">
                  {audio.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                    >
                      <h4 className="font-semibold text-slate-800 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(item.pubDate).toLocaleDateString()}
                        </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-700 hover:text-slate-900 text-sm font-medium flex items-center transition-colors duration-300"
                        >
                          Read More
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center">
              <button
                onClick={handleShare}
                className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                <span>Share Podcast</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioDetail;