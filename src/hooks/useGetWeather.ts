import { useState, useEffect } from "react";
import { getWeatherByCoords } from "../api/getWeatherDatas";

export function useGetWeather(latitude: number, longitude: number) {
  const [weatherInfos, setWeatherInfos] = useState<any>(null); // Changez {} en null pour initialiser correctement
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction qui fait le fetch
  const tryGetWeatherInfo = async () => {
    try {
      const response = await getWeatherByCoords(latitude, longitude);
      setWeatherInfos(response);
      setIsLoading(false);
    } catch (error) {
      setError("Erreur lors de la récupération des données météo.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    //ne s'active que si il reçoit lat et lon
    console.log("UeHOOK-useGetWeather");
    if (latitude && longitude) {
      tryGetWeatherInfo();
    }
  }, [latitude, longitude]);

  return {
    weatherInfos,
    isLoading,
    error,
  };
}
