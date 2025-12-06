import React, { useState } from 'react'

export default function WeatherForm({ onSearch }) {
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!city.trim()) return
    setLoading(true)
    try {
      await onSearch(city.trim())
      setCity('')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="weather-form" onSubmit={submit}>
      <input
        placeholder="Enter city name (e.g., Mumbai)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        aria-label="City"
      />
      <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add City'}</button>
    </form>
  )
}