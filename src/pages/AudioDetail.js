import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { audioService } from "../services/audioService";

// Custom CSS for the slider
const sliderStyles = `
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #1e293b;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    border: 2px solid white;
  }
  
  .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #1e293b;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    border: 2px solid white;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = sliderStyles;
  document.head.appendChild(styleSheet);
}

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

  // Auto-play audio when component loads and audio is available
  useEffect(() => {
    if (audioRef && audio && audio.audioUrl && !isPlaying) {
      // Add a small delay to ensure audio element is ready
      const timer = setTimeout(async () => {
        try {
          audioRef.volume = volume;
          await audioRef.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Auto-play prevented by browser:", error);
          // Show a user-friendly message
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [audioRef, audio, isPlaying, volume]); // Include all dependencies

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
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <span className="font-semibold">Back to Audio List</span>
        </Link>

        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative">
            <img
              src={audio.thumbnail}
              alt={audio.title}
              className="w-full h-72 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-xl backdrop-blur-sm">
                  {audio.category}
                </span>
                <div className="flex items-center space-x-2 text-white/90">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Audio</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-6 leading-tight">
              {audio.title}
            </h1>

            {/* Description */}
            {audio.description && (
              <div className="mb-8">
                <p className="text-gray-600 text-xl leading-relaxed">
                  {audio.description}
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-6 mb-10 text-gray-500">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                </svg>
                <span className="font-medium">Published: {audio.publishDate}</span>
              </div>
              {audio.itemCount && (
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                  <span className="font-medium">{audio.itemCount} News Items</span>
                </div>
              )}
            </div>

            {/* Audio Player */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-3xl p-8 mb-10 shadow-inner">
              <h3 className="text-2xl font-bold mb-8 flex items-center text-slate-800">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
                Audio Player
              </h3>

              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl p-10 shadow-2xl">
                {/* Audio Player Layout */}
                <div className="flex flex-col items-center space-y-10">
                  {/* Main Control Section */}
                  <div className="flex items-center justify-center space-x-12">
                    {/* Volume Down */}
                    <button
                      onClick={handleVolumeDown}
                      className="group bg-slate-800 hover:bg-slate-900 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 9H7L4 12L7 15H10L14 19V5L10 9Z"
                          fill="currentColor"
                        />
                        <path
                          d="M15 12H19"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>

                    {/* Play Button */}
                    <div className="relative">
                      <button
                        onClick={handlePlayPause}
                        className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-105 border-4 border-gray-200 ${
                          isPlaying
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-slate-800 hover:bg-slate-900"
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
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 9H7L4 12L7 15H10L14 19V5L10 9Z"
                          fill="currentColor"
                        />
                        <path
                          d="M17 10V14M15 12H19"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Audio Visualizer with Progress */}
                  <div className="flex flex-col items-center space-y-6">
                    <div 
                      className="flex items-end justify-center space-x-2 h-24 px-8 cursor-pointer" 
                      onClick={(e) => {
                        if (audioRef && duration) {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const clickX = e.clientX - rect.left;
                          const width = rect.width;
                          const newTime = (clickX / width) * duration;
                          audioRef.currentTime = newTime;
                          setCurrentTime(newTime);
                        }
                      }}
                    >
                      {visualizerBars.map((height, i) => {
                        const progress = duration ? currentTime / duration : 0;
                        const barProgress = i / visualizerBars.length;
                        const isActive = barProgress <= progress;
                        
                        return (
                          <div
                            key={i}
                            className={`w-1.5 rounded-full transition-all duration-300 ease-out hover:scale-110 ${
                              isActive 
                                ? 'bg-gradient-to-t from-slate-800 via-slate-700 to-slate-600' 
                                : 'bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100'
                            }`}
                            style={{
                              height: `${isPlaying ? height : 8}px`,
                            }}
                          ></div>
                        );
                      })}
                    </div>

                    <div className="text-center space-y-2">
                      <p
                        className={`text-xl font-semibold transition-colors duration-300 ${
                          isPlaying ? "text-slate-800" : "text-gray-600"
                        }`}
                      >
                        {isPlaying ? "♪ Now Playing" : "♫ Ready to Play"}
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
                        <div className="text-sm text-gray-500 mt-1">Volume</div>
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
