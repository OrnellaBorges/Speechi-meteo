import CurrentWeather from "../components/WeatherComponents/CurrentWeather";
import CurrentWeatherDetails from "../components/WeatherComponents/CurrentWeatherDetails";
import ForcastWeather from "../components/WeatherComponents/ForcastWeather";
import WeatherCard from "../components/WeatherComponents/WeatherCard";
import { useWeather } from "../contexts/WeatherContext";

export function Weather() {
  const { weatherInfos, isLoading, isError, errorBrowserLocation } =
    useWeather();

  // Afficher le message de chargement en premier
  if (isLoading) {
    return <p>Loading...please wait a few moments</p>;
  }
  // Afficher les messages d'erreur s'il y a une erreur de localisation
  if (errorBrowserLocation) {
    if (!weatherInfos) {
      return <p className="errLocation">Error Location</p>; // Afficher uniquement le message d'erreur si pas de cache
    } else {
      return (
        <>
          <section className="weatherContainer">
            <WeatherCard customTitle="jeue">
              <CurrentWeather weatherInfos={weatherInfos} />
              <CurrentWeatherDetails />
            </WeatherCard>
            <WeatherCard customTitle="k;cldzpa">
              <ForcastWeather />
            </WeatherCard>
          </section>
          <p className="errLocation">Error Location</p>
        </>
      );
    }
  }

  if (isError) {
    return <p>Error classique</p>;
  }

  return (
    <>
      {weatherInfos && (
        <section className="weatherContainer">
          <WeatherCard customTitle="Current Weather">
            <CurrentWeather weatherInfos={weatherInfos} />
            <CurrentWeatherDetails />
          </WeatherCard>
          <WeatherCard customTitle=" Hourly Forcast ">
            <ForcastWeather />
          </WeatherCard>
        </section>
      )}
    </>
  );
}
