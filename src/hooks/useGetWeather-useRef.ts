import { useState, useEffect } from "react";
import { getWeatherByCoords } from "../api/getWeatherDatas";
import { useClientLocation } from "./useClientLocation";

export function useGetWeather(latitude: number, longitude: number) {
  const [weatherInfos, setWeatherInfos] = useState<any>(null); // Changez {} en null pour initialiser correctement
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);

  const fetchWeather = () => {
    const getWeather = async () => {
      try {
        const response = await getWeatherByCoords(latitude, longitude);
        setWeatherInfos(response);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    getWeather();
  };

  useEffect(() => {
    console.log("fetchData");
    fetchWeather();
    //ne s'active que si il reçoit lat et lon
    /* if (latitude && longitude) {
      tryGetWeatherInfo();
    } */
  }, [latitude, longitude]);

  return {
    weatherInfos,
    isLoading,
    isError,
  };
}
