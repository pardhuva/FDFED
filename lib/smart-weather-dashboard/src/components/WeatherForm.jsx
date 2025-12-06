import React, { useState } from 'react'
import './WeatherForm.css'

const WeatherForm = ({ onAddCity, loading }) => {
  const [cityName, setCityName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cityName.trim()) {
      onAddCity(cityName.trim())
      setCityName('')
    }
  }

  return (
    <form className="weather-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter city name in India (e.g., Mumbai, Delhi, Bangalore)"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !cityName.trim()}>
          {loading ? '🔍 Searching...' : '➕ Add City'}
        </button>
      </div>
    </form>
  )
}

export default WeatherForm