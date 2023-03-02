import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { WeatherContext } from "./WeatherContext";
import "./Header.css";

function Header() {
  const { setCity } = useContext(WeatherContext);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/" activeclassname="active">
              CurrentWeather
            </NavLink>
          </li>
          <li>
            <NavLink to="/forecast" activeclassname="active">
              ForecastWeather
            </NavLink>
          </li>
          <li>
            <NavLink to="/historical" activeclassname="active">
              HistoricalWeather
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <label htmlFor="city">City: </label>
        <input type="text" id="city" onChange={handleCityChange} />
      </div>
    </header>
  );
}

export default Header;
