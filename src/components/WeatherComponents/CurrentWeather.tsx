import { WeatherResponse } from "../../types/WeatherTypes";

type CurrentWeatherProps = {
  weatherInfos: WeatherResponse;
};
export default function CurrentWeather({ weatherInfos }: CurrentWeatherProps) {
  return (
    <div className="currentWeather">
      <p className="date">{new Date().toLocaleDateString()}</p>
      <p className="temperature" style={{ fontSize: "3rem" }}>
        {Math.round(weatherInfos.main.temp)}°C
      </p>
      <div className="apiIcon">
        <img
          src={`http://openweathermap.org/img/wn/${weatherInfos.weather[0].icon}.png`}
          alt={weatherInfos.weather[0].description}
        />
      </div>

      <p className="weatherDescription">
        {weatherInfos.weather[0].description}
      </p>
    </div>
  );
}
