import { useGetWeather } from "../hooks/useGetWeather";
import { CoordType } from "../types/CoordsType";
import { useLocation } from "../contexts/LocationContext";

export function Weather() {
  const { clientCoords, error } = useLocation();
  const { weatherInfos, isLoading, isError } = useGetWeather(
    clientCoords.latitude,
    clientCoords.longitude
  );

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
