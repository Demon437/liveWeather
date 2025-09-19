import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Default to system preference or dark mode
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Update body class for dark/light mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      setError("Failed to fetch weather data. Please check the city name or try again later.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`weather-container ${darkMode ? "dark" : "light"}`}>
      <header className="header">
        <h1 className="title">Weather Forecast</h1>
        <button
          className="mode-toggle-btn"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle dark/light mode"
          title="Toggle dark/light mode"
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="city-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchWeather();
          }}
        />
        <button onClick={fetchWeather} className="btn" disabled={loading}>
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-info fade-in">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <div className="weather-main">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
              className="weather-icon"
            />
            <div className="weather-details">
              <p>🌡 Temp: {weather.main.temp} °C</p>
              <p>🤒 Feels Like: {weather.main.feels_like} °C</p>
              <p>🔽 Min Temp: {weather.main.temp_min} °C</p>
              <p>🔼 Max Temp: {weather.main.temp_max} °C</p>
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>🌬 Wind Speed: {weather.wind.speed} m/s</p>
              <p>☁️ Condition: {weather.weather[0].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;