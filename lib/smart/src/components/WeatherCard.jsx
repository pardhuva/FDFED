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