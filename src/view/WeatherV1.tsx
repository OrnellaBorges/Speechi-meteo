import { useGetWeather } from "../hooks/useGetWeather";
import { useLocation } from "../contexts/LocationContext";

export function Weather() {
  const { coords, error } = useLocation();
  const { weatherInfos, isLoading, isError } = useGetWeather();

  console.log("datas =>>", weatherInfos);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherInfos && (
        <div className="weatherContainer">
          <h2 className="weatherCity">{weatherInfos.name}</h2>
          <p className="date">Date: {new Date().toLocaleDateString()}</p>
          <p className="temperature">{weatherInfos.main.temp}°C</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherInfos.weather[0].icon}.png`}
            alt={weatherInfos.weather[0].description}
          />
          <p>{weatherInfos.weather[0].description}</p>
        </div>
      )}
    </>
  );
}
