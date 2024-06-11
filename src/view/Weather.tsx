import CurrentWeather from "../components/WeatherComponents/CurrentWeather";
import CurrentWeatherDetails from "../components/WeatherComponents/CurrentWeatherDetails";
import ForcastWeather from "../components/WeatherComponents/ForcastWeather";
import WeatherCard from "../components/WeatherComponents/WeatherCard";
import { useWeather } from "../contexts/WeatherContext";

export function Weather() {
  const { weatherInfos, isLoading, isError, errorBrowserLocation } =
    useWeather();

  return (
    <>
      {isLoading && <p>Loading...please wait a few moment</p>}
      {errorBrowserLocation && <p>ERROR LOCATION</p>}
      {isError && <p>{isError}</p>}
      {weatherInfos && (
        <section
          className="weatherContainer"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <WeatherCard>
            <CurrentWeather weatherInfos={weatherInfos} />
            <CurrentWeatherDetails />
          </WeatherCard>
          <WeatherCard>
            <ForcastWeather />
          </WeatherCard>
        </section>
      )}
    </>
  );
}
