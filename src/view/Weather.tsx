import CurrentWeather from "../components/WeatherComponents/CurrentWeather";
import WeatherCard from "../components/WeatherComponents/WeatherCard";
import { useWeather } from "../contexts/WeatherContext";

export function Weather() {
  const { weatherInfos, isLoading, isError, error } = useWeather();

  return (
    <>
      {isLoading && <p>Loading...please wait a few moment</p>}
      {error && <p>{error}</p>}
      {isError && <p>{isError}</p>}
      {weatherInfos && (
        <section className="weatherContainer">
          <WeatherCard>
            <CurrentWeather weatherInfos={weatherInfos} />
          </WeatherCard>
        </section>
      )}
    </>
  );
}
