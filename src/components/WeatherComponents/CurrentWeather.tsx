import { WeatherResponse } from "../../types/WeatherTypes";

type CurrentWeatherProps = {
  weatherInfos: WeatherResponse;
};
export default function CurrentWeather({ weatherInfos }: CurrentWeatherProps) {
  return (
    <div
      className="currentWeather"
      style={{ border: "3px solid blue", width: "100%" }}
    >
      {/* <h2 className="cityName">{weatherInfos.name}</h2> */}
      <h3 className="title">Current Weather </h3>
      <p className="date">{new Date().toLocaleDateString()}</p>
      <p className="temperature">{weatherInfos.main.temp}°C</p>
      <div>
        <img
          src={`http://openweathermap.org/img/wn/${weatherInfos.weather[0].icon}.png`}
          alt={weatherInfos.weather[0].description}
        />
        <p>{weatherInfos.weather[0].description}</p>
      </div>
    </div>
  );
}
