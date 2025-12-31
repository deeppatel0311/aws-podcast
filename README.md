# AudioHub - React Audio Content App

A modern React application for browsing and listening to audio content with a responsive design using Tailwind CSS.

## Features

- 📱 Fully responsive design with Tailwind CSS
- 🎵 Audio content listing with thumbnails
- 📄 Detailed audio content pages
- 🔄 API integration with loading states
- 🎨 Modern UI with hover effects and animations
- 📱 Mobile-first responsive design

## Tech Stack

- React 18
- React Router DOM
- Tailwind CSS
- Axios for API calls

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API Integration

The app is configured to work with an API backend. By default, it tries to connect to `http://localhost:3001/api`.

### API Endpoints Expected:

- `GET /api/audio` - Get list of audio content
- `GET /api/audio/:id` - Get specific audio content details

### Fallback Data

If the API is not available, the app will use mock data as a fallback.

## Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_NAME=AudioHub
REACT_APP_VERSION=1.0.0
```

## Project Structure

```
src/
├── components/
│   ├── Header.js
│   └── Footer.js
├── pages/
│   ├── AudioList.js
│   └── AudioDetail.js
├── services/
│   └── audioService.js
├── data/
│   └── audioContent.js
├── App.js
├── index.js
└── index.css
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App

## Responsive Design

The app is built with mobile-first responsive design:

- Mobile: Single column layout
- Tablet: 2-column grid
- Desktop: 3-4 column grid
- Large screens: 4+ column grid

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request