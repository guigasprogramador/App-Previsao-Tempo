import React, { useContext } from "react";
import { WeatherContext } from "./WeatherContext";
import "./CurrentWeather.css";

function CurrentWeather() {
  const { weatherData } = useContext(WeatherContext);

  return (
    <div className="weather-container">
      <h1>{weatherData.name}</h1>
      <p>{weatherData.weather[0].description}</p>
      <p>Temperature: {weatherData.main.temp}ºC</p>
      <p>Feels like: {weatherData.main.feels_like}ºC</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind speed: {weatherData.wind.speed}</p>
    </div>
  );
}

export default CurrentWeather;
