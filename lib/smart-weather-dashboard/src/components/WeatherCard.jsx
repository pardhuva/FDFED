import React from 'react'
import './WeatherCard.css'

const WeatherCard = ({ city, onRemove }) => {
  const getTemperatureColor = (temp) => {
    if (temp < 10) return '#4fc3f7'
    if (temp < 20) return '#81c784'
    if (temp < 30) return '#ffb74d'
    return '#e57373'
  }

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    return directions[Math.round(degrees / 22.5) % 16]
  }

  return (
    <div className="weather-card">
      <div 
        className="weather-card-header"
        style={{ borderBottomColor: getTemperatureColor(city.temperature) }}
      >
        <div className="city-name">
          <h3>{city.city}</h3>
          <img 
            src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`} 
            alt={city.condition}
          />
        </div>
        <button onClick={onRemove} className="close-btn">×</button>
      </div>
      
      <div className="weather-card-body">
        <div className="temperature-section">
          <div 
            className="temperature"
            style={{ color: getTemperatureColor(city.temperature) }}
          >
            {city.temperature}°C
          </div>
          <div className="condition">{city.condition}</div>
        </div>
        
        <div className="weather-details">
          <div className="detail-item">
            <span className="label">💨 Wind Speed</span>
            <span className="value">{city.windSpeed} km/h</span>
          </div>
          
          <div className="detail-item">
            <span className="label">🧭 Wind Direction</span>
            <span className="value">
              <span 
                className="wind-arrow"
                style={{ transform: `rotate(${city.windDirection}deg)` }}
              >↑</span>
              {getWindDirection(city.windDirection)} ({city.windDirection}°)
            </span>
          </div>
          
          <div className="detail-item">
            <span className="label">💧 Humidity</span>
            <span className="value">{city.humidity}%</span>
          </div>
          
          <div className="detail-item">
            <span className="label">📊 Pressure</span>
            <span className="value">{city.pressure} hPa</span>
          </div>
        </div>
        
        <div className="last-updated">
          Last updated: {city.lastUpdated}
        </div>
      </div>
    </div>
  )
}

export default WeatherCard