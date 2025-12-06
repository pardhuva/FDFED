import React, { useState } from 'react'
import WeatherCard from './WeatherCard'
import './WeatherList.css'

const WeatherList = ({ cities, onRemoveCity }) => {
  const [sortBy, setSortBy] = useState('city')
  const [sortOrder, setSortOrder] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const filteredAndSortedCities = cities
    .filter(city => 
      city.city.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (sortBy === 'city') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const getSortIcon = (field) => {
    if (sortBy !== field) return '↕️'
    return sortOrder === 'asc' ? '↑' : '↓'
  }

  return (
    <div className="weather-list">
      <div className="weather-list-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="sort-controls">
          <span>Sort by:</span>
          <button 
            onClick={() => handleSort('temperature')}
            className={sortBy === 'temperature' ? 'active' : ''}
          >
            Temperature {getSortIcon('temperature')}
          </button>
          <button 
            onClick={() => handleSort('windSpeed')}
            className={sortBy === 'windSpeed' ? 'active' : ''}
          >
            Wind Speed {getSortIcon('windSpeed')}
          </button>
          <button 
            onClick={() => handleSort('humidity')}
            className={sortBy === 'humidity' ? 'active' : ''}
          >
            Humidity {getSortIcon('humidity')}
          </button>
          <button 
            onClick={() => handleSort('city')}
            className={sortBy === 'city' ? 'active' : ''}
          >
            City {getSortIcon('city')}
          </button>
        </div>
      </div>

      {filteredAndSortedCities.length === 0 ? (
        <div className="no-cities">
          {cities.length === 0 
            ? 'No cities added yet. Search for a city to get started!'
            : 'No cities match your search.'
          }
        </div>
      ) : (
        <>
          <div className="weather-cards">
            {filteredAndSortedCities.map(city => (
              <WeatherCard
                key={city.id}
                city={city}
                onRemove={() => onRemoveCity(city.id)}
              />
            ))}
          </div>

          <div className="weather-table-container">
            <table className="weather-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('city')}>
                    City {getSortIcon('city')}
                  </th>
                  <th onClick={() => handleSort('temperature')}>
                    Temp (°C) {getSortIcon('temperature')}
                  </th>
                  <th>Condition</th>
                  <th onClick={() => handleSort('humidity')}>
                    Humidity (%) {getSortIcon('humidity')}
                  </th>
                  <th onClick={() => handleSort('windSpeed')}>
                    Wind (km/h) {getSortIcon('windSpeed')}
                  </th>
                  <th>Wind Direction</th>
                  <th>Pressure (hPa)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedCities.map(city => (
                  <tr key={city.id}>
                    <td>
                      <div className="city-cell">
                        <img 
                          src={`https://openweathermap.org/img/wn/${city.icon}.png`} 
                          alt={city.condition}
                        />
                        {city.city}
                      </div>
                    </td>
                    <td>{city.temperature}°C</td>
                    <td>{city.condition}</td>
                    <td>{city.humidity}%</td>
                    <td>{city.windSpeed} km/h</td>
                    <td>
                      <div className="wind-direction">
                        <span 
                          className="wind-arrow"
                          style={{ transform: `rotate(${city.windDirection}deg)` }}
                        >↑</span>
                        {city.windDirection}°
                      </div>
                    </td>
                    <td>{city.pressure}</td>
                    <td>
                      <button 
                        onClick={() => onRemoveCity(city.id)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default WeatherList