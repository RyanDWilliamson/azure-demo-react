import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit


  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    if (!city) return;
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.current) {
        setWeather({
          condition: data.current.condition.text,
          temperature: data.current.temp_c,  // Always in Celsius
          icon: data.current.condition.icon
        });
      } else {
        setWeather(null);
        alert('City not found or API limit reached');
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      alert('Failed to fetch weather data');
    }
  };

  const convertToFahrenheit = (celsius) => (celsius * 9/5) + 32;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Finder</h1>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Get Weather</button>
        <button onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}>
          Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
        </button>
        {weather && (
          <div>
            <p><strong>Condition:</strong> {weather.condition}</p>
            <p><strong>Temperature:</strong> {unit === 'C' ? weather.temperature : convertToFahrenheit(weather.temperature)} °{unit}</p>
            <img src={weather.icon} alt="Weather Icon" />
          </div>
        )}
      </header>
    </div>
  );
};

export default App;