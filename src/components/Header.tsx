import React from "react";
import { useWeather } from "../contexts/WeatherContext";

export default function Header() {
  const { weatherInfos, isLoading } = useWeather();
  return (
    <header className="header ">
      {/* <h1>WEATHER APP SPEECHI</h1> */}

      {isLoading ? <h1>Speechi Weather App</h1> : <h1>{weatherInfos?.name}</h1>}

      {/* <h2>WEATHER APP SPEECHI</h2> */}
    </header>
  );
}
