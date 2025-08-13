import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WeatherDisplay from './WeatherDisplay';
import ForecastDisplay from './ForecastDisplay';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import './WeatherPage.css';

const API_KEY = 'ec784b133d32aafc9a94a859ab777fa5';
const BASE_URL = 'http://api.openweathermap.org/data/2.5';

function WeatherPage() {
  const { location } = useParams();
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');

  // data from API
  const fetchWeatherData = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      let searchQuery = query.trim();
      
       if (searchQuery.includes(',')) {
         const [lat, lon] = searchQuery.split(',').map(coord => coord.trim());
         
         // make sure coordinates are valid
         const latNum = parseFloat(lat);
         const lonNum = parseFloat(lon);
        
                 if (isNaN(latNum) || isNaN(lonNum)) {
           throw new Error('Coordinates look wrong. Try format: latitude,longitude (like 40.7128,-74.0060)');
         }
         
         if (latNum < -90 || latNum > 90) {
           throw new Error('Latitude should be between -90 and 90');
         }
         
         if (lonNum < -180 || lonNum > 180) {
           throw new Error('Longitude should be between -180 and 180');
         }
        
        response = await fetch(
          `${BASE_URL}/weather?lat=${latNum}&lon=${lonNum}&appid=${API_KEY}&units=${unit}`
        );
             } else {
         response = await fetch(
           `${BASE_URL}/weather?q=${encodeURIComponent(searchQuery)}&appid=${API_KEY}&units=${unit}`
         );
       }
      
             if (!response.ok) {
         if (response.status === 404) {
           throw new Error(`Can't find "${searchQuery}". Check the spelling or try something else.`);
         } else if (response.status === 429) {
           throw new Error('Too many requests. Wait a bit and try again.');
         } else {
           throw new Error('Something went wrong. Try again.');
         }
       }
      
             const data = await response.json();
       setWeatherData(data);
       
       // forecast too
       await fetchForecastData(data.coord.lat, data.coord.lon);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, [unit]);

  // 5 day forecast
  const fetchForecastData = useCallback(async (lat, lon) => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      );
      
      if (!response.ok) {
        throw new Error('Could not get forecast data.');
      }
      
      const data = await response.json();
      setForecastData(data);
    } catch (err) {
      console.error('Forecast error:', err);
      setForecastData(null);
    }
  }, [unit]);

  useEffect(() => {
    if (location) {
      fetchWeatherData(decodeURIComponent(location));
    }
  }, [location, fetchWeatherData]);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleUnitToggle = () => {
    setUnit(prevUnit => prevUnit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="weather-page">
      <video 
        className="video-background" 
        autoPlay 
        muted 
        loop 
        playsInline
        preload="auto"
      >
        <source src="/Assests/nextpage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="weather-page-container">
        <header className="weather-page-header">
          <button className="back-button" onClick={handleBackClick}>
            ← Back to Search
          </button>
          <h1>Weather Forecast</h1>
        </header>

        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="error-section">
            <ErrorMessage message={error} />
          </div>
        )}

        {weatherData && !loading && (
          <div className="weather-content">
            <div className="weather-layout">
              <div className="current-weather-section">
                <WeatherDisplay data={weatherData} unit={unit} onUnitToggle={handleUnitToggle} />
              </div>
              <div className="forecast-section">
                {forecastData && <ForecastDisplay data={forecastData} unit={unit} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherPage;
