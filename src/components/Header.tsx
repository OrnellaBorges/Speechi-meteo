import React from "react";
import { useWeather } from "../contexts/WeatherContext";

export default function Header() {
  const { weatherInfos, isLoading } = useWeather();
  return (
    <header
      className="header "
      style={{
        flex: "0 0 auto",
        textAlign: "center",
        border: "3px solid black",
        padding: "1rem",
      }}
    >
      {/* <h1>WEATHER APP SPEECHI</h1> */}

      {isLoading ? <h1>Speechi Weather App</h1> : <h1>CityName Location</h1>}

      {/* <h2>WEATHER APP SPEECHI</h2> */}
    </header>
  );
}
