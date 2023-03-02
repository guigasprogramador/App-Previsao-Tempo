import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";

export const WeatherContext = createContext();

const initialState = {
  name: "",
  weather: [],
  main: {},
  wind: {},
  loading: true,
  error: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_WEATHER_SUCCESS":
      return {
        ...state,
        name: action.payload.name,
        weather: action.payload.weather,
        wind: action.payload.wind,
        loading: false,
      };
    case "FETCH_WEATHER_ERROR":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export const WeatherProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const result = await axios(
          `https://api.openweathermap.org/data/2.5/weather?q=London&appid=7e6e900cf9e582d7085df308c71da15a&units=metric`
        );
        dispatch({ type: "FETCH_WEATHER_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_WEATHER_ERROR" });
      }
    };
    fetchWeatherData();
  }, []);

  return (
    <WeatherContext.Provider value={{ weatherData: state }}>
      {props.children}
    </WeatherContext.Provider>
  );
};
