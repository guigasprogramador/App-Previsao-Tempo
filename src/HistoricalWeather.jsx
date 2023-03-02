import React, { useContext, useState } from "react";
import { WeatherContext } from "./WeatherContext";
import axios from "axios";
import "./HistoricalWeather.css";

function HistoricalWeather() {
  const { weatherData } = useContext(WeatherContext);
  const [date, setDate] = useState("");
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Adicione a verificação de segurança aqui
    let timeInMilliseconds = null;
    if (date) {
      timeInMilliseconds = new Date(date).getTime();
    }

    const result = await axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        weatherData.name
      }&appid=${process.env.REACT_APP_API_KEY}a&units=metric&dt=${Math.floor(
        timeInMilliseconds / 1000
      )}`
    );
    setHistoricalData(result.data);
    setLoading(false);
  };

  return (
    <div>
      <h1>Historical Weather for {weatherData.name}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Enter a date (YYYY-MM-DD): </label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Get Historical Weather</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : historicalData ? (
        <div>
          <p>Date: {new Date(historicalData.dt * 1000).toDateString()}</p>
          <p>Description: {historicalData.weather[0].description}</p>
          <p>Temperature: {historicalData.main.temp}ºC</p>
          <p>Feels like: {historicalData.main.feels_like}ºC</p>
          <p>Humidity: {historicalData.main.humidity}%</p>
          <p>Wind speed: {historicalData.wind.speed} m/s</p>
        </div>
      ) : null}
    </div>
  );
}

export default HistoricalWeather;
