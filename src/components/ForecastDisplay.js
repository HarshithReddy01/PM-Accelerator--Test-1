import React from 'react';
import './ForecastDisplay.css';

function ForecastDisplay({ data, unit }) {
  const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return '⛈️';
    if (weatherId >= 300 && weatherId < 400) return '🌧️';
    if (weatherId >= 500 && weatherId < 600) return '🌧️';
    if (weatherId >= 600 && weatherId < 700) return '❄️';
    if (weatherId >= 700 && weatherId < 800) return '🌫️';
    if (weatherId === 800) return '☀️';
    if (weatherId >= 801 && weatherId < 900) return '☁️';
    return '🌤️';
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  const formatFullDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTemperatureUnit = () => unit === 'metric' ? '°C' : '°F';

  // data by day
  const groupByDay = (forecastList) => {
    const grouped = {};
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });
    return grouped;
  };

  // averages
  const calculateDailyAverages = (dayData) => {
    const temps = dayData.map(item => item.main.temp);
    const humidities = dayData.map(item => item.main.humidity);
    const windSpeeds = dayData.map(item => item.wind.speed);
    
    return {
      temp_min: Math.min(...temps),
      temp_max: Math.max(...temps),
      humidity: Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length),
      wind_speed: Math.round((windSpeeds.reduce((a, b) => a + b, 0) / windSpeeds.length) * 10) / 10,
      weather: dayData[Math.floor(dayData.length / 2)].weather[0] 
    };
  };

  const groupedForecast = groupByDay(data.list);
  const today = new Date().toDateString();
  

  const dailyForecasts = Object.entries(groupedForecast)
    .filter(([date]) => date !== today)
    .map(([date, dayData]) => ({
      date: new Date(date),
      data: calculateDailyAverages(dayData)
    }));

  return (
    <div className="forecast-display">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {dailyForecasts.map((day, index) => (
          <div key={index} className="forecast-day">
            <div className="forecast-date">
              <div className="day-name">{formatDate(day.date.getTime() / 1000)}</div>
              <div className="full-date">{formatFullDate(day.date.getTime() / 1000)}</div>
            </div>
            
            <div className="forecast-icon">
              {getWeatherIcon(day.data.weather.id)}
            </div>
            
            <div className="forecast-description">
              {day.data.weather.description}
            </div>
            
            <div className="forecast-temp-range">
              <span className="temp-max">
                {Math.round(day.data.temp_max)}{getTemperatureUnit()}
              </span>
              <span className="temp-min">
                {Math.round(day.data.temp_min)}{getTemperatureUnit()}
              </span>
            </div>
            
            <div className="forecast-details">
              <div className="forecast-detail">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{day.data.humidity}%</span>
              </div>
              <div className="forecast-detail">
                <span className="detail-label">Wind</span>
                <span className="detail-value">{day.data.wind_speed} {unit === 'metric' ? 'm/s' : 'mph'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastDisplay;
