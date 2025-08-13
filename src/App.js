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
        <source src={`${process.env.PUBLIC_URL}/Assests/naturevideo.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="pm-accelerator-section">
        <a 
          href="https://www.pmaccelerator.io/" 
          rel="noopener noreferrer"
          className="pm-accelerator-link"
        >
          About Us
        </a>
      </div>
      
      <div className="container">
        <header className="app-header">
          <div className="header-content">
            <div className="header-main">
              <h1>Weather Forecast</h1>
              <p>Get real-time weather information for any location.</p>
            </div>
          </div>
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
    <Router basename="/PM-Accelerator--Test-1">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weather/:location" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
}

export default App;
