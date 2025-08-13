import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherPage from './components/WeatherPage';

function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      navigate(`/weather/${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          navigate(`/weather/${latitude},${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation not supported.');
    }
  };

  return (
    <div className="App">
      <video 
        className="video-background" 
        autoPlay 
        muted 
        loop 
        playsInline
        preload="auto"
      >
        <source src="/Assests/naturevideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="container">
        <header className="app-header">
          <h1>Weather Forecast</h1>
          <p>Get real-time weather information for any location</p>
        </header>

        <div className="search-section">
          <SearchBar onSearch={handleSearch} onLocationClick={handleLocationClick} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weather/:location" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
}

export default App;
