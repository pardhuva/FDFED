import React, { useMemo, useState } from 'react'
import WeatherCard from './WeatherCard'

export default function WeatherList({ cities, onRemove }) {
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('') // 'temp' | 'wind' | 'humidity' or ''
  const [dir, setDir] = useState('desc') // asc | desc

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = cities.filter(c => c.name.toLowerCase().includes(q))
    if (sortBy) {
      list = [...list].sort((a, b) => {
        const va = readKey(a, sortBy)
        const vb = readKey(b, sortBy)
        if (va == null) return 1
        if (vb == null) return -1
        return dir === 'asc' ? va - vb : vb - va
      })
    }
    return list
  }, [cities, query, sortBy, dir])

  function readKey(city, key) {
    if (!city.data) return null
    if (key === 'temp') return city.data.main.temp
    if (key === 'humidity') return city.data.main.humidity
    if (key === 'wind') return city.data.wind.speed
    return null
  }

  return (
    <section className="weather-list">
      <div className="controls">
        <input placeholder="Search cities" value={query} onChange={(e) => setQuery(e.target.value)} />

        <div className="sort-controls">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">-- none --</option>
            <option value="temp">Temperature (°C)</option>
            <option value="wind">Wind Speed (m/s)</option>
            <option value="humidity">Humidity (%)</option>
          </select>

          <button onClick={() => setDir(d => d === 'asc' ? 'desc' : 'asc')}>Dir: {dir}</button>
        </div>
      </div>

      <div className="cards">
        {filtered.length === 0 && <div className="empty">No matching cities — add one above.</div>}
        {filtered.map(city => (
          <WeatherCard key={city.id} city={city} onRemove={() => onRemove(city.id)} />
        ))}
      </div>
    </section>
  )
}