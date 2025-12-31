const API_BASE_URL = 'https://5olj3l3dvf.execute-api.us-east-1.amazonaws.com/prod';

export const audioService = {
  // Get all audio content
  getAudioList: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/podcasts`);
      if (!response.ok) {
        throw new Error('Failed to fetch podcasts');
      }
      const data = await response.json();
      return data.map(podcast => ({
        id: podcast.id,
        title: podcast.title,
        description: podcast.description,
        duration: podcast.duration,
        category: podcast.category,
        publishDate: new Date(podcast.pubDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        audioUrl: podcast.audioUrl,
        thumbnail: podcast.thumbnail,
        itemCount: podcast.itemCount,
        items: podcast.items
      }));
    } catch (error) {
      console.error('Error fetching audio list:', error);
      return getMockAudioList();
    }
  },

  // Get single audio content by ID
  getAudioById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/podcasts/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch podcast');
      }
      const podcast = await response.json();
      return {
        id: podcast.id,
        title: podcast.title,
        description: podcast.description,
        duration: podcast.duration,
        category: podcast.category,
        publishDate: new Date(podcast.pubDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        audioUrl: podcast.audioUrl,
        thumbnail: podcast.thumbnail,
        itemCount: podcast.itemCount,
        items: podcast.items,
        script: podcast.script
      };
    } catch (error) {
      console.error('Error fetching audio details:', error);
      return getMockAudioById(id);
    }
  },
};

// Mock data fallback
const getMockAudioList = () => {
  return [
    {
      id: 1,
      title: "Tech Talk: AI Revolution",
      description:
        "Exploring the latest developments in artificial intelligence and machine learning.",
      duration: "45:30",
      category: "Technology",
      publishDate: "2024-01-15",
      audioUrl: "https://placeholder.guru/api/audio?type=speech",
      thumbnail: "https://placehold.co/600x400",
    },
    {
      id: 2,
      title: "Music Spotlight: Jazz Classics",
      description:
        "A deep dive into the golden age of jazz music and its influential artists.",
      duration: "38:15",
      category: "Music",
      publishDate: "2024-01-12",
      audioUrl: "https://example.com/audio2.mp3",
      thumbnail: "https://via.placeholder.com/300x200?text=Jazz+Classics",
    },
    {
      id: 3,
      title: "Science Today: Climate Change",
      description:
        "Understanding the current state of climate science and environmental solutions.",
      duration: "52:45",
      category: "Science",
      publishDate: "2024-01-10",
      audioUrl: "https://example.com/audio3.mp3",
      thumbnail: "https://via.placeholder.com/300x200?text=Climate+Science",
    },
    {
      id: 4,
      title: "History Hour: Ancient Civilizations",
      description:
        "Uncovering the mysteries of ancient civilizations and their lasting impact.",
      duration: "41:20",
      category: "History",
      publishDate: "2024-01-08",
      audioUrl: "https://example.com/audio4.mp3",
      thumbnail: "https://via.placeholder.com/300x200?text=Ancient+History",
    },
  ];
};

const getMockAudioById = (id) => {
  const audioList = getMockAudioList();
  return audioList.find((audio) => audio.id === parseInt(id));
};
