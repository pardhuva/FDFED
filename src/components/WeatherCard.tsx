import React from 'react';
import './WeatherCard.css';

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  speed: number;
  humidity: number;
  windDirection: string;
  pressure: number;
  windSpeed: number;
  icon: string;
}

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="weather-card">
      <h2 className="city-name">{weather.city}</h2>
      <div className="weather-info">
        <img 
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.condition}
          className="weather-icon"
        />
        <div className="temperature">{weather.temperature.toFixed(1)}°C</div>
        <div className="condition">{weather.condition}</div>
        <div className="details">
          <div className="detail-item">
            <span>Humidity:</span> {weather.humidity}%
          </div>
          <div className="detail-item">
            <span>Wind Speed:</span> {weather.windSpeed} km/h
          </div>
          <div className="detail-item">
            <span>Wind Direction:</span> {weather.windDirection}
          </div>
          <div className="detail-item">
            <span>Pressure:</span> {weather.pressure} hPa
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;