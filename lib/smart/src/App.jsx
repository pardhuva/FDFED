import React, { useEffect, useState, useCallback, useRef } from 'react'
import WeatherForm from './components/WeatherForm'
import WeatherList from './components/WeatherList'
import { fetchWeatherByCity } from './api'
import './App.css'

export default function App() {
  const [cities, setCities] = useState([]) // array of { id, name, data, lastUpdated, error }
  const intervalRef = useRef(null)

  // add city by name
  const addCity = async (cityName) => {
    const key = cityName.trim().toLowerCase()
    if (!key) return
    // avoid duplicates
    if (cities.some(c => c.name.toLowerCase() === cityName.toLowerCase())) return
    const newCity = { id: Date.now() + Math.random(), name: cityName, data: null, lastUpdated: null, error: null }
    setCities(prev => [newCity, ...prev])
    try {
      const data = await fetchWeatherByCity(cityName)
      setCities(prev => prev.map(c => c.id === newCity.id ? { ...c, data, lastUpdated: Date.now(), error: null } : c))
    } catch (err) {
      setCities(prev => prev.map(c => c.id === newCity.id ? { ...c, error: err.message } : c))
    }
  }

  // fetch updates for all cities
  const refreshAll = useCallback(async () => {
    setCities(prev => prev.map(c => ({ ...c, error: null })))
    await Promise.all(cities.map(async (city) => {
      try {
        const data = await fetchWeatherByCity(city.name)
        setCities(prev => prev.map(c => c.id === city.id ? { ...c, data, lastUpdated: Date.now(), error: null } : c))
      } catch (err) {
        setCities(prev => prev.map(c => c.id === city.id ? { ...c, error: err.message } : c))
      }
    }))
  }, [cities])

  // setup interval to refresh every 5 seconds
  useEffect(() => {
    // clear existing
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (cities.length > 0) refreshAll()
    }, 5000)
    return () => clearInterval(intervalRef.current)
  }, [cities, refreshAll])

  const removeCity = (id) => setCities(prev => prev.filter(c => c.id !== id))

  return (
    <div className="app">
      <header className="header">
        <h1>Smart Weather Dashboard</h1>
        <p className="sub">Search any city in India — data refreshes every 5 seconds</p>
      </header>

      <main>
        <WeatherForm onSearch={addCity} />
        <WeatherList cities={cities} onRemove={removeCity} />
      </main>

      <footer className="footer">Built with OpenWeatherMap • Deploy with Vercel or Netlify</footer>
    </div>
  )
}