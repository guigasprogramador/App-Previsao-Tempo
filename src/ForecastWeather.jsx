import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "./WeatherContext";
import axios from "axios";
import "./ForecastWeather.css";

function ForecastWeather() {
  const { weatherData } = useContext(WeatherContext);
  const [ForecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios(
        `https://api.openweathermap.org/data/2.5/forecast?q=${weatherData.name}&appid=${process.env.REACT_APP_API_KEY}a&units=metric`
      );
      setForecastData(result.data.list);
      setLoading(false);
    };
    fetchData();
  }, [weatherData]);

  return (
    <div>
      <h1>Forecast for {weatherData.name}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {ForecastData.map((data) => (
            <div key={data.dt}>
              <p>Date: {data.dt_txt.split("")[0]}</p>
              <p>Time: {data.dt_txt.split("")[1]}</p>
              <p>Description: {data.weather[0].description}</p>
              <p>Feels like: {data.main.feels_like}ºC</p>
              <p>Humidity: {data.main.humidity}%</p>
              <p>Wind speed: {data.wind.speed} m/s</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ForecastWeather;
