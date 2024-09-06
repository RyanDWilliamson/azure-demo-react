import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (evt) => {
      evt.preventDefault();
      if (!city) return;

      setLoading(true);
      setError(null);
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

      try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          
          const data = await response.json();
          setWeather(data);
      } catch (error) {
          console.error("Failed to fetch weather data:", error);
          setError(`Failed to fetch weather data: ${error.message}`);
      } finally {
          setLoading(false);
      }
  };

  return (
      <div className="weather-container">
          <form onSubmit={fetchWeather}>
              <input
                  className="weather-input"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name"
              />
              <button className="weather-submit" type="submit">Get Weather</button>
          </form>

          {loading && <p>Loading weather data...</p>}
          {error && <p>{error}</p>}
          {weather && (
              <div className="weather-info">
                  <h1>{weather.name}</h1>
                  <p>Temperature: {weather.main && `${weather.main.temp.toFixed(2)}°F`}</p>
                  <p>Weather: {weather.weather && weather.weather.length > 0 && weather.weather[0].description}</p>
              </div>
          )}
      </div>
  );
}

export default App;
