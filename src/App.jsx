import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";
import HistoricalWeather from "./HistoricalWeather";
import { WeatherContext } from "./WeatherContext";
import axios from "axios";
import "./App.css";

function App() {
  const [weatherData, SetWeatherData] = useState({});
  const [city, setCity] = useState("London");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7e6e900cf9e582d7085df308c71da15a&units=metric`
      );
      SetWeatherData(result.data);
      setLoading(false);
    };
    fetchData();
  }, [city]);

  return (
    <WeatherContext.Provider value={{ weatherData, setCity }}>
      <Router>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              loading ? (
                <React.Fragment>Loading...</React.Fragment>
              ) : (
                <CurrentWeather />
              )
            }
          />

          <Route path="/forecast" element={<ForecastWeather />} />

          <Route path="/historical" element={<HistoricalWeather />} />
        </Routes>
      </Router>
    </WeatherContext.Provider>
  );
}

export default App;
