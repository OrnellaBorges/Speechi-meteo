import { WeatherResponse } from "../../types/WeatherTypes";

type CurrentWeatherProps = {
  weatherInfos: WeatherResponse;
};
export default function CurrentWeather({ weatherInfos }: CurrentWeatherProps) {
  return (
    <>
      <h2 className="weatherCity">{weatherInfos.name}</h2>
      <p className="weatherDate">{new Date().toLocaleDateString()}</p>
      <p className="temperature">{weatherInfos.main.temp}°C</p>
      <img
        src={`http://openweathermap.org/img/wn/${weatherInfos.weather[0].icon}.png`}
        alt={weatherInfos.weather[0].description}
      />
      <p>{weatherInfos.weather[0].description}</p>
    </>
  );
}
