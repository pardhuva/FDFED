import React, { useState } from "react";

const WeatherForm = ({ onAddWeather }) => {
  const [formData, setFormData] = useState({
    city: "",
    temperature: "",
    condition: "",
    humidity: "",
    windSpeed: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { city, temperature, condition, humidity, windSpeed } = formData;

  
    if (!city || !temperature || !condition || !humidity || !windSpeed) {
      alert(" Please fill all fields");
      return;
    }

    
    if (!/^[A-Za-z\s]+$/.test(city)) {
      alert("🏙️ City name should only contain letters (no numbers or symbols)");
      return;
    }

    
    if (parseFloat(temperature) < -100 || parseFloat(temperature) > 70) {
      alert("🌡️ Temperature must be between -100°C and 70°C");
      return;
    }

    if (parseFloat(humidity) < 0 || parseFloat(humidity) > 100) {
      alert("💧 Humidity must be between 0% and 100%");
      return;
    }

    if (parseFloat(windSpeed) < 0 || parseFloat(windSpeed) > 300) {
      alert("🌬️ Wind speed must be between 0 and 300 km/h");
      return;
    }

   
    onAddWeather({
      ...formData,
      temperature: parseFloat(temperature),
      humidity: parseFloat(humidity),
      windSpeed: parseFloat(windSpeed),
      lastUpdated: new Date().toLocaleTimeString(),
    });

    
    setFormData({
      city: "",
      temperature: "",
      condition: "",
      humidity: "",
      windSpeed: "",
    });
  };

  return (
    <form className="weather-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City Name"
      />
      <input
        name="temperature"
        value={formData.temperature}
        onChange={handleChange}
        placeholder="Temperature (°C)"
        type="number"
      />
      <select name="condition" value={formData.condition} onChange={handleChange}>
        <option value="">Select Condition</option>
        <option value="Sunny">Sunny</option>
        <option value="Cloudy">Cloudy</option>
        <option value="Rainy">Rainy</option>
        <option value="Stormy">Stormy</option>
      </select>
      <input
        name="humidity"
        value={formData.humidity}
        onChange={handleChange}
        placeholder="Humidity (%)"
        type="number"
      />
      <input
        name="windSpeed"
        value={formData.windSpeed}
        onChange={handleChange}
        placeholder="Wind Speed (km/h)"
        type="number"
      />
      <button type="submit">Add Weather</button>
    </form>
  );
};

export default WeatherForm;
