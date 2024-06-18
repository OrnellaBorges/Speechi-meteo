import { WeatherResponse } from "../../types/WeatherTypes";
import { formatCurrentDate } from "../../utils/formatTime";

type CurrentWeatherProps = {
  weatherInfos: WeatherResponse;
};
export default function CurrentWeather({ weatherInfos }: CurrentWeatherProps) {
  //console.log("weatherInfos =====", weatherInfos);

  return (
    <div className="currentWeather">
      <p className="date">{formatCurrentDate()}</p>
      <p
        className="temperature"
        style={{ fontSize: "3rem", padding: "0.5rem 0" }}
      >
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
