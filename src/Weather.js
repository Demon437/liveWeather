import React, { useState } from "react";
import "./Weather.css";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState();
  const [weather, setWeather] = useState();

  const handlecitychange = (event) => {
    setCity(event.target.value);
  };
  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"c47c453265d4e53eacf7d4c43fed7bb4"}`
      );
      setWeather(response);
    } catch (error) {
      console.log("Error featching weather data", error);
    }
  };

  console.log(weather, "weather");
  const handleclick = () => {
    fetchWeather();
  };

  return (
    <div className="Weather-container">
      <input type="text"placeholder="Enter Your City"value={city}
      onChange={handlecitychange}/>
      <br />
      <div className="btn">
        <button onClick={handleclick}>Get Weather</button>
      </div>
      {weather && (
        <>
          <div className="wearher-info">
            <h2>{weather.data.name}</h2>
            <p>Temp is : {weather.data.main.temp}</p>
            <p>description : {weather.data.weather[0].description}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
