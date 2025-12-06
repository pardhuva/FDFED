# Smart Weather Dashboard — Full Project

This single-file code document contains a complete React (Vite) project you can preview and copy. It uses functional components and satisfies the assignment requirements: search city (India), fetch from OpenWeatherMap, store data in `useState`, refresh every 5 seconds with `useEffect`, display each city in a separate card, and allow sorting by temperature, wind speed and humidity. The API key must be stored in a `.env` file (example provided).

---

## Folder structure (virtual view)

```
smart-weather-dashboard/
├─ package.json
├─ vite.config.js
├─ index.html
├─ .env.example
├─ README.md
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ api.js
│  ├─ styles.css
│  └─ components/
│     ├─ WeatherForm.jsx
│     ├─ WeatherList.jsx
│     └─ WeatherCard.jsx
└─ public/
   └─ placeholder-weather.png
```

---

### package.json

```json
{
  "name": "smart-weather-dashboard",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

### vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### .env.example

```
# Create a file named .env in project root and paste your OpenWeatherMap API key like below
VITE_OWM_KEY=your_openweathermap_api_key_here
```

> IMPORTANT: Vite environment variables that should be exposed to the client must start with `VITE_`.

---

### index.html

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Smart Weather Dashboard</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

### src/main.jsx

```jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')).render(<App />)
```

---

### src/api.js

```js
// helper to fetch weather from OpenWeatherMap
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
```

---

### src/App.jsx

```jsx
import React, { useEffect, useState, useCallback, useRef } from 'react'
import WeatherForm from './components/WeatherForm'
import WeatherList from './components/WeatherList'
import { fetchWeatherByCity } from './api'

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
```

---

### src/components/WeatherForm.jsx

```jsx
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
```

---

### src/components/WeatherList.jsx

```jsx
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
```

---

### src/components/WeatherCard.jsx

```jsx
import React from 'react'

// helper: deg -> cardinal
function degToCompass(num) {
  if (num == null) return '--'
  const val = Math.floor((num / 22.5) + 0.5)
  const arr = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
  return arr[(val % 16)]
}

export default function WeatherCard({ city, onRemove }) {
  const d = city.data
  return (
    <article className="card">
      <div className="card-header">
        <h3>{city.name}</h3>
        <div className="actions">
          <button onClick={onRemove} title="Remove">✖</button>
        </div>
      </div>

      {!d && city.error && <div className="card-body error">Error: {city.error}</div>}
      {!d && !city.error && <div className="card-body">Loading...</div>}

      {d && (
        <div className="card-body">
          <div className="main-row">
            <div className="image">
              <img src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`} alt={d.weather[0].description} />
            </div>
            <div className="summary">
              <div className="temp">{Math.round(d.main.temp)}°C</div>
              <div className="cond">{d.weather[0].main} — {d.weather[0].description}</div>
            </div>
          </div>

          <table className="details">
            <tbody>
              <tr><td>Speed</td><td>{d.wind.speed} m/s</td></tr>
              <tr><td>Wind Dir</td><td>{degToCompass(d.wind.deg)}</td></tr>
              <tr><td>Humidity</td><td>{d.main.humidity}%</td></tr>
              <tr><td>Pressure</td><td>{d.main.pressure} hPa</td></tr>
            </tbody>
          </table>

          <div className="meta">Last: {city.lastUpdated ? new Date(city.lastUpdated).toLocaleTimeString() : '—'}</div>
        </div>
      )}
    </article>
  )
}
```

---

### src/styles.css

```css
:root{--bg:#0f172a;--card:#0b1220;--muted:#9aa4b2;--accent:#06b6d4}
*{box-sizing:border-box}
body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial;background:linear-gradient(180deg,#071024 0%, #07192a 100%);color:#e6eef6;min-height:100vh}
.app{max-width:1100px;margin:28px auto;padding:18px}
.header{text-align:center}
.header h1{margin:4px 0;font-size:28px}
.header .sub{color:var(--muted);margin:0}
.weather-form{display:flex;gap:8px;margin:18px 0}
.weather-form input{flex:1;padding:10px;border-radius:8px;border:1px solid #142033;background:#07182a;color:inherit}
.weather-form button{padding:10px 14px;border-radius:8px;border:none;background:var(--accent);color:#021024;cursor:pointer}
.weather-list .controls{display:flex;gap:12px;align-items:center;margin-bottom:12px}
.weather-list input{padding:8px;border-radius:8px;border:1px solid #122233;background:#07182a;color:inherit}
.sort-controls{display:flex;gap:8px;align-items:center}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}
.card{background:rgba(255,255,255,0.03);border-radius:12px;padding:12px}
.card-header{display:flex;justify-content:space-between;align-items:center}
.card-header h3{margin:0}
.card-body{margin-top:8px}
.image img{width:84px;height:84px}
.main-row{display:flex;gap:12px;align-items:center}
.temp{font-size:32px;font-weight:600}
.cond{color:var(--muted)}
.details{width:100%;margin-top:8px;border-collapse:collapse}
.details td{padding:4px 6px;color:var(--muted)}
.meta{margin-top:8px;color:var(--muted);font-size:12px}
.footer{text-align:center;margin-top:20px;color:var(--muted);font-size:13px}
.empty{color:var(--muted);padding:16px}
.error{color:#ffb4b4}
button[disabled]{opacity:0.6}
.actions button{background:transparent;border:none;color:var(--muted);cursor:pointer}
```

---

### public/placeholder-weather.png

Include any small placeholder image if you want; the app uses official OpenWeather icons by default.

---

### README.md (run instructions)

```md
# Smart Weather Dashboard

## Setup

1. Clone or copy the project.
2. Install dependencies: `npm install`.
3. Create `.env` in project root with `VITE_OWM_KEY=your_api_key` (get key from https://openweathermap.org/api).
4. Run locally: `npm run dev`
5. Build: `npm run build` and deploy the `dist/` folder to Vercel/Netlify.

Notes:
- The app restricts searches to India by appending `,IN` to the city query (so search for Indian cities only).
- Data for all added cities refreshes every 5 seconds using `useEffect`.
- Sorting options available: Temperature, Wind Speed, Humidity.
```

---

## Deployment tips

- On Vercel: push repo to GitHub, create a new Vercel project, set Environment Variable `VITE_OWM_KEY` in Vercel dashboard, and deploy.
- On Netlify: set the environment variable `VITE_OWM_KEY` in Site settings > Build & deploy > Environment.

---

## Accessibility & Responsiveness

- The layout is responsive using a grid for cards. It is mobile friendly and will fit to small screens.

---

That's everything — open the files above and copy them into your project. If you'd like, I can also:
- generate a ready-to-download zip,
- convert the styling to Tailwind,
- or add localStorage persistence for saved cities.


