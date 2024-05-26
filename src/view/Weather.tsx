import { useGetWeather } from "../hooks/useGetWeather";
import { CoordType } from "../types/CoordsType";

type WeatherProps = {
  clientCoords: CoordType;
};

export function Weather({ clientCoords }: WeatherProps) {
  const { weatherInfos, isLoading, error } = useGetWeather(
    clientCoords.latitude,
    clientCoords.longitude
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching weather data: {error}</p>;
  }
  console.log("ce que j'ai reçu", weatherInfos);
  return (
    <>
      <h1>WEATHER</h1>
      {weatherInfos ? (
        <>
          <p>Ville: {weatherInfos.name}</p>
          <p>Temperature: {weatherInfos.main.temp}</p>
          <p>Latitude: {clientCoords.latitude}</p>
          <p>Longitude: {clientCoords.longitude}</p>
        </>
      ) : (
        <p>No weather data available</p>
      )}
    </>
  );
}
