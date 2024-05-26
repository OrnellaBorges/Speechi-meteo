import { useState, useEffect } from "react";
import { getWeatherByCoords } from "../api/getWeatherDatas";

export function useGetWeather(latitude: number, longitude: number) {
  const [weatherInfos, setWeatherInfos] = useState<any>(null); // Changez {} en null pour initialiser correctement
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchWeather = async () => {
      if (latitude && longitude) {
        setIsLoading(true);
        try {
          const response = await getWeatherByCoords(latitude, longitude);
          setWeatherInfos(response);
          setIsError(false);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  return {
    weatherInfos,
    isLoading,
    isError,
  };
}
