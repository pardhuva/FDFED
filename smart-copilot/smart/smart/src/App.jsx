import React, { useEffect, useState, useCallback } from 'react'
import WeatherForm from '../smart/smart/src/components/WeatherForm'
import WeatherList from '../smart/smart/src/components/WeatherList'

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY

function App() {
  const [cities, setCities] = useState([]) // array of { name, data, lastUpdated, error }

  const fetchWeather = useCallback(async (cityName) => {
    try {
      const q = encodeURIComponent(`${cityName},IN`)
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${API_KEY}`
      )
      if (!res.ok) throw new Error(`API error ${res.status}`)
      const json = await res.json()
      return { data: json, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }, [])

  // Add a city (by name). If city exists, refresh it instead.
  const addCity = async (cityName) => {
    const existing = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase())
    if (existing) {
      // refresh single
      const res = await fetchWeather(cityName)
      setCities(prev => prev.map(c => c.name.toLowerCase() === cityName.toLowerCase() ? { ...c, ...res, lastUpdated: Date.now() } : c))
      return
    }

    const res = await fetchWeather(cityName)
    setCities(prev => [...prev, { name: cityName, ...res, lastUpdated: Date.now() }])
  }

  const removeCity = (cityName) => {
    setCities(prev => prev.filter(c => c.name.toLowerCase() !== cityName.toLowerCase()))
  }

  // Refresh all cities every 5 seconds
  useEffect(() => {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') return
    const interval = setInterval(() => {
      cities.forEach(async (city) => {
        const res = await fetchWeather(city.name)
        setCities(prev => prev.map(c => c.name === city.name ? { ...c, ...res, lastUpdated: Date.now() } : c))
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [cities, fetchWeather])

  return (
    <div className="app-container">
      <header>
        <h1>Smart Weather Dashboard — India</h1>
        <p className="subtitle">Search cities in India. Data updates every 5s.</p>
      </header>

      <main>
        <WeatherForm onSearch={addCity} />
        <WeatherList cities={cities} onRemove={removeCity} />
      </main>

      <footer>
        <small>Powered by OpenWeatherMap • Remember to set your API key in <code>.env</code></small>
      </footer>
    </div>
  )
}
