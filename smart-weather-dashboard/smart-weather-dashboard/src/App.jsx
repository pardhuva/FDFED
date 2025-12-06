import React, { useState, useEffect, useContext } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherCard from "./components/WeatherCard";
import { ThemeContext } from "./context/ThemeContext";
import "./styles.css";

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [currentCity, setCurrentCity] = useState(null);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(null); 

  const { themeColor, updateTheme } = useContext(ThemeContext);

  const handleAddWeather = (data) => {
    setWeatherData((prev) => [...prev, data]);
    setLastUpdatedTime(data.lastUpdated); 
  };

  useEffect(() => {
    if (weatherData.length === 0) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * weatherData.length);
      const selectedCity = weatherData[randomIndex];

      const currentTime = new Date().toLocaleTimeString();

      setCurrentCity({
        ...selectedCity,
        lastUpdated: currentTime,
      });

      setLastUpdatedTime(currentTime); 
      updateTheme(selectedCity.temperature);
    }, 5000);

    return () => clearInterval(interval);
  }, [weatherData]);

  return (
    <div className="app" style={{ backgroundColor: themeColor }}>
      <h1>🌦️ Smart Weather Dashboard</h1>

      
      {lastUpdatedTime && (
        <p className="last-updated">Last updated: {lastUpdatedTime}</p>
      )}

      <WeatherForm onAddWeather={handleAddWeather} />

      {currentCity ? (
        <WeatherCard data={currentCity} />
      ) : (
        <p className="no-data">No weather data available</p>
      )}
    </div>
  );
};

export default App;
