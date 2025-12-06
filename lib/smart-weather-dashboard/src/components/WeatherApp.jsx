import React, { useState, useEffect } from 'react'
import WeatherForm from './WeatherForm'
import WeatherList from './WeatherList'
import './WeatherApp.css'

const WeatherApp = () => {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true)
      setError('')
      
      const response = await fetch(
        `${BASE_URL}?q=${cityName},IN&units=metric&appid=${API_KEY}`
      )
      
      if (!response.ok) {
        throw new Error('City not found or API error')
      }
      
      const data = await response.json()
      
      const weatherData = {
        id: data.id,
        city: data.name,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg,
        pressure: data.main.pressure,
        icon: data.weather[0].icon,
        lastUpdated: new Date().toLocaleTimeString()
      }
      
      return weatherData
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const addCity = async (cityName) => {
    const weatherData = await fetchWeatherData(cityName)
    if (weatherData) {
      setCities(prev => {
        const existingIndex = prev.findIndex(city => city.id === weatherData.id)
        if (existingIndex >= 0) {
          const updated = [...prev]
          updated[existingIndex] = weatherData
          return updated
        }
        return [...prev, weatherData]
      })
    }
  }

  const removeCity = (cityId) => {
    setCities(prev => prev.filter(city => city.id !== cityId))
  }

  const updateAllCities = async () => {
    if (cities.length === 0) return
    
    const updatedCities = await Promise.all(
      cities.map(async (city) => {
        const updatedData = await fetchWeatherData(city.city)
        return updatedData || city
      })
    )
    
    setCities(updatedCities.filter(city => city !== null))
  }

  useEffect(() => {
    const interval = setInterval(updateAllCities, 5000)
    return () => clearInterval(interval)
  }, [cities])

  return (
    <div className="weather-app">
      <header className="weather-app-header">
        <h1>🌤️ Smart Weather Dashboard</h1>
        <p>Real-time weather updates for Indian cities</p>
      </header>
      
      <WeatherForm onAddCity={addCity} loading={loading} />
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <WeatherList 
        cities={cities} 
        onRemoveCity={removeCity}
        setCities={setCities}
      />
    </div>
  )
}

export default WeatherApp