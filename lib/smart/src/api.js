const API_KEY = import.meta.env.VITE_OWM_KEY
const BASE = 'https://api.openweathermap.org/data/2.5'

export async function fetchWeatherByCity(city) {
  if (!API_KEY) throw new Error('VITE_OWM_KEY not found in environment')
  const q = encodeURIComponent(city + ',IN') // restrict to India
  const url = `${BASE}/weather?q=${q}&units=metric&appid=${API_KEY}`
  const res = await fetch(url)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const message = err.message || `${res.status} ${res.statusText}`
    throw new Error(message)
  }
  const data = await res.json()
  return data
}