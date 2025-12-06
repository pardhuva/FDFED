# Smart Weather Dashboard — Full Project

This document contains the full React project for the **Smart Weather Dashboard** assignment. Copy files into a new Create React App (or Vite React) project and replace the `.env` value with your OpenWeatherMap API key.

---

## Folder structure

```
smart-weather-dashboard/
├── package.json
├── .env.example
├── README.md
├── public/
│   └── index.html
└── src/
    ├── index.js
    ├── App.jsx
    ├── components/
    │   ├── WeatherApp.jsx
    │   ├── WeatherForm.jsx
    │   ├── WeatherList.jsx
    │   └── WeatherCard.jsx
    ├── hooks/
    │   └── useIntervalFetch.js
    ├── utils/
    │   └── windDirection.js
    └── styles.css
```

---

## .env.example

```env
# Copy to .env and set your key
REACT_APP_OWM_API_KEY=your_openweathermap_api_key_here
```

---

## package.json (minimal)

```json
{
  "name": "smart-weather-dashboard",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

---

## public/index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Smart Weather Dashboard</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

---

## src/index.js

```js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import WeatherApp from './components/WeatherApp';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<WeatherApp />);
```

---

## src/hooks/useIntervalFetch.js

```js
import { useEffect, useRef } from 'react';

// small hook to mimic setInterval with latest callback
export default function useIntervalFetch(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
```

---

## src/utils/windDirection.js

```js
export function degToCompass(num) {
  const val = Math.floor((num / 22.5) + 0.5);
  const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return arr[(val % 16)];
}
```

---

## src/components/WeatherApp.jsx

```jsx
import React, { useEffect, useState, useCallback } from 'react';
import WeatherForm from './WeatherForm';
import WeatherList from './WeatherList';
import useIntervalFetch from '../hooks/useIntervalFetch';

const API_KEY = process.env.REACT_APP_OWM_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export default function WeatherApp() {
  const [cities, setCities] = useState([]); // array of { name, data, lastUpdated, error }
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState({ key: null, dir: 'asc' });

  const fetchCity = useCallback(async (cityName) => {
    const q = `${cityName},IN`;
    try {
      const res = await fetch(`${BASE_URL}?q=${encodeURIComponent(q)}&units=metric&appid=${API_KEY}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return { data: json, error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  }, []);

  // add city (called from form)
  const addCity = async (cityName) => {
    const existing = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
    if (existing) return; // don't duplicate
    const { data, error } = await fetchCity(cityName);
    setCities(prev => [{ name: cityName, data, error, lastUpdated: Date.now() }, ...prev]);
  };

  // refresh all cities
  const refreshAll = useCallback(async () => {
    if (!cities.length) return;
    const promises = cities.map(async (c) => {
      const { data, error } = await fetchCity(c.name);
      return { name: c.name, data, error, lastUpdated: Date.now() };
    });
    const results = await Promise.all(promises);
    setCities(results);
  }, [cities, fetchCity]);

  // interval refresh every 5 seconds
  useIntervalFetch(() => {
    refreshAll();
  }, 5000);

  // remove a city
  const removeCity = (cityName) => {
    setCities(prev => prev.filter(c => c.name.toLowerCase() !== cityName.toLowerCase()));
  };

  // manual refresh single city
  const refreshCity = async (cityName) => {
    const { data, error } = await fetchCity(cityName);
    setCities(prev => prev.map(c => c.name.toLowerCase() === cityName.toLowerCase() ? { name: cityName, data, error, lastUpdated: Date.now() } : c));
  };

  // sorting handler
  const handleSort = (key) => {
    setSortBy(prev => {
      if (prev.key === key) return { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
      return { key, dir: 'asc' };
    });
  };

  // filtered + sorted list
  const displayed = (() => {
    let list = cities.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
    if (sortBy.key) {
      list = [...list].sort((a, b) => {
        const valA = getSortValue(a, sortBy.key);
        const valB = getSortValue(b, sortBy.key);
        if (valA == null && valB == null) return 0;
        if (valA == null) return 1;
        if (valB == null) return -1;
        return sortBy.dir === 'asc' ? valA - valB : valB - valA;
      });
    }
    return list;
  })();

  function getSortValue(item, key) {
    if (!item || !item.data) return null;
    const d = item.data;
    switch (key) {
      case 'temp': return d.main?.temp ?? null;
      case 'windSpeed': return d.wind?.speed ?? null;
      case 'humidity': return d.main?.humidity ?? null;
      default: return null;
    }
  }

  // Persist cities to localStorage to survive reloads (optional)
  useEffect(() => {
    const raw = localStorage.getItem('swf_cities');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) setCities(parsed);
      } catch (e) { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('swf_cities', JSON.stringify(cities));
  }, [cities]);

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Smart Weather Dashboard (India)</h1>
        <p className="sub">Search cities in India — auto-refresh every 5 seconds</p>
      </header>

      <main className="app-main">
        <section className="left">
          <WeatherForm onSearch={(city) => { setQuery(''); addCity(city); }} />

          <div className="controls">
            <label>Search list:</label>
            <input className="small-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter cities..." />
            <div className="sort-buttons">
              <button onClick={() => handleSort('temp')}>Sort by Temp</button>
              <button onClick={() => handleSort('windSpeed')}>Sort by Wind</button>
              <button onClick={() => handleSort('humidity')}>Sort by Humidity</button>
            </div>
          </div>

          <WeatherList
            cities={displayed}
            onRemove={removeCity}
            onRefresh={refreshCity}
            sortBy={sortBy}
          />
        </section>

        <aside className="right">
          <h2>City Cards</h2>
          <div className="cards-grid">
            {displayed.map(c => (
              <div key={c.name} className="card-wrapper">
                <div className="card-head">
                  <h3>{c.name}</h3>
                  <div className="card-actions">
                    <button onClick={() => refreshCity(c.name)}>↻</button>
                    <button onClick={() => removeCity(c.name)}>✖</button>
                  </div>
                </div>
                <div className="card-body">
                  {c.error && <div className="error">Error: {c.error}</div>}
                  {!c.data && !c.error && <div className="loading">Loading...</div>}
                  {c.data && (
                    <div>
                      <img
                        src={`https://openweathermap.org/img/wn/${c.data.weather[0].icon}@2x.png`}
                        alt={c.data.weather[0].description}
                        className="weather-img"
                      />
                      <p className="temp">{Math.round(c.data.main.temp)}°C</p>
                      <p className="cond">{c.data.weather[0].main} — {c.data.weather[0].description}</p>
                      <p>Humidity: {c.data.main.humidity}%</p>
                      <p>Wind: {c.data.wind.speed} m/s</p>
                      <p>Pressure: {c.data.main.pressure} hPa</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {displayed.length === 0 && <p>No cities to show. Add a city above.</p>}
          </div>
        </aside>
      </main>

      <footer className="app-footer">
        <small>Data from OpenWeatherMap · Auto-refresh every 5 seconds · Built with React</small>
      </footer>
    </div>
  );
}
```

---

## src/components/WeatherForm.jsx

```jsx
import React, { useState } from 'react';

export default function WeatherForm({ onSearch }) {
  const [city, setCity] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city.trim());
    setCity('');
  };

  return (
    <form className="weather-form" onSubmit={submit}>
      <label htmlFor="city">Search city (India):</label>
      <div className="form-row">
        <input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Mumbai" />
        <button type="submit">Search</button>
      </div>
    </form>
  );
}
```

---

## src/components/WeatherList.jsx

```jsx
import React from 'react';
import { degToCompass } from '../utils/windDirection';

export default function WeatherList({ cities, onRemove, onRefresh, sortBy }) {
  return (
    <div className="weather-list">
      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (°C) {sortBy.key==='temp' ? (sortBy.dir==='asc' ? '▲' : '▼') : ''}</th>
            <th>Condition</th>
            <th>Speed (m/s) {sortBy.key==='windSpeed' ? (sortBy.dir==='asc' ? '▲' : '▼') : ''}</th>
            <th>Humidity (%) {sortBy.key==='humidity' ? (sortBy.dir==='asc' ? '▲' : '▼') : ''}</th>
            <th>Wind Dir</th>
            <th>Pressure (hPa)</th>
            <th>Wind Speed (km/h)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map(c => (
            <tr key={c.name}>
              <td>{c.name}</td>
              <td>{c.data ? Math.round(c.data.main.temp) : '-'}</td>
              <td>{c.data ? c.data.weather[0].main : '-'}</td>
              <td>{c.data ? c.data.wind.speed : '-'}</td>
              <td>{c.data ? c.data.main.humidity : '-'}</td>
              <td>{c.data ? degToCompass(c.data.wind.deg || 0) : '-'}</td>
              <td>{c.data ? c.data.main.pressure : '-'}</td>
              <td>{c.data ? Math.round((c.data.wind.speed || 0) * 3.6) : '-'}</td>
              <td>
                <button onClick={() => onRefresh(c.name)}>Refresh</button>
                <button onClick={() => onRemove(c.name)}>Remove</button>
              </td>
            </tr>
          ))}
          {cities.length === 0 && (
            <tr><td colSpan={9}>No cities added.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
//let this be weather related 
```

---

## src/styles.css

```css
:root{
  --bg:#f6f9fc;
  --card:#fff;
  --accent:#2b6ef6;
  --muted:#666;
}
*{box-sizing:border-box}
body{font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:var(--bg);margin:0;color:#111}
.app-root{max-width:1200px;margin:18px auto;padding:16px}
.app-header{text-align:center}
.app-header h1{margin:0;font-size:1.6rem}
.sub{color:var(--muted);margin-top:6px}
.app-main{display:grid;grid-template-columns:1fr 360px;gap:16px;margin-top:14px}
.left{background:var(--card);padding:12px;border-radius:10px;box-shadow:0 6px 18px rgba(20,20,40,0.04)}
.right{padding:12px}
.weather-form .form-row{display:flex;gap:8px;margin-top:8px}
.weather-form input{flex:1;padding:8px;border:1px solid #ddd;border-radius:6px}
.weather-form button{padding:8px 12px;border-radius:6px;border:none;background:var(--accent);color:white}
.controls{display:flex;align-items:center;gap:8px;margin-top:12px}
.small-search{padding:6px;border:1px solid #ddd;border-radius:6px}
.sort-buttons button{margin-left:8px;padding:6px 8px;border-radius:6px;border:1px solid #ddd;background:white}
.weather-list table{width:100%;border-collapse:collapse;margin-top:12px}
.weather-list th, .weather-list td{padding:8px;border-bottom:1px solid #eee;text-align:left;font-size:0.95rem}
.cards-grid{display:grid;grid-template-columns:1fr;gap:12px}
@media(min-width:900px){.cards-grid{grid-template-columns:1fr 1fr}}
.card-wrapper{background:var(--card);padding:10px;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,0.04)}
.card-head{display:flex;justify-content:space-between;align-items:center}
.card-actions button{margin-left:6px}
.weather-img{width:80px;height:80px}
.temp{font-size:1.4rem;margin:6px 0}
.loading{color:var(--muted)}
.error{color:#b00020}
.app-footer{text-align:center;margin-top:18px;color:var(--muted)}

/* Mobile adjustments */
@media(max-width:760px){
  .app-main{grid-template-columns:1fr}
  .right{order:2}
}
```

---

## README.md (quick)

```md
# Smart Weather Dashboard

Features:
- Search for cities in India (OpenWeatherMap)
- Stores results locally (useState + localStorage)
- Auto-refresh every 5 seconds using useEffect + interval hook
- Each city displayed as a card + in a sortable table
- Sorting by temperature, wind speed, humidity
- Responsive layout

## Setup
1. Copy `.env.example` to `.env` and set `REACT_APP_OWM_API_KEY`.
2. Install: `npm install`
3. Start: `npm start`

## Deployment
Build: `npm run build`. Deploy `build/` to Netlify or Vercel.
Make sure your environment variable `REACT_APP_OWM_API_KEY` is configured in the hosting platform.

Notes:
- The app uses the OpenWeatherMap current weather API. Free-tier has limits — if you need many cities, consider increasing refresh interval.
```

---

End of project. Replace `REACT_APP_OWM_API_KEY` in your .env with your real OpenWeatherMap API key before running.

