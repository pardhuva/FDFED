import React from "react";

const WeatherCard = ({ data }) => {
  const { city, temperature, condition, humidity, windSpeed, lastUpdated } = data;

  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <p>🌡️ Temperature: {temperature} °C</p>
      <p>🌤️ Condition: {condition}</p>
      <p>💧 Humidity: {humidity}%</p>
      <p>🌬️ Wind Speed: {windSpeed} km/h</p>
      <p>⏰ Last Updated: {lastUpdated}</p>
    </div>
  );
};

export default WeatherCard;
