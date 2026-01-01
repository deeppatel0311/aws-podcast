import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AudioList from "./pages/AudioList";
import AudioDetail from "./pages/AudioDetail";
import About from "./pages/About";

function App() {
  return (
    <Router basename="/aws-podcast">
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<AudioList />} />
            <Route path="/audio/:id" element={<AudioDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
