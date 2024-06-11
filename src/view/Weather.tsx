import CurrentWeather from "../components/WeatherComponents/CurrentWeather";
import CurrentWeatherDetails from "../components/WeatherComponents/CurrentWeatherDetails";
import ForcastWeather from "../components/WeatherComponents/ForcastWeather";
import WeatherCard from "../components/WeatherComponents/WeatherCard";
import { useGetWeather } from "../contexts/WeatherContext";

export function Weather() {
  const { weatherInfos, isLoading, isError, errorBrowserLocation } =
    useGetWeather();

  // Afficher le message de chargement en premier
  if (isLoading) {
    return <p>Loading...please wait a few moments</p>;
  }

  // Afficher les messages d'erreur s'il y a une erreur de localisation et aucune donnée météo
  if (errorBrowserLocation && !weatherInfos) {
    return <p>Error Location</p>;
  }

  if (isError) {
    return <p>Error classique</p>;
  }

  return (
    <>
      {weatherInfos && (
        <section className="weatherContainer">
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
