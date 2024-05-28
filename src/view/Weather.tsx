import { useWeather } from "../contexts/WeatherContext";

export function Weather() {
  const { weatherInfos, isLoading, isError, error } = useWeather();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {isError && <p>{isError}</p>}
      {weatherInfos && (
        <div className="weatherContainer">
          <h2 className="weatherCity">{weatherInfos.name}</h2>
          <p className="weatherDate">{new Date().toLocaleDateString()}</p>
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
