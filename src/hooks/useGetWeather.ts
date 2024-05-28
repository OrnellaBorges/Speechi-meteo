import { useState, useEffect } from "react";
import { getWeatherByCoords } from "../api/getWeatherDatas";
import { useClientLocation } from "./useClientLocation";

import { WeatherResponse } from "../types/WeatherTypes";

export function useGetWeather() {
  const [weatherInfos, setWeatherInfos] = useState<any>(null); // Changez {} en null pour initialiser correctement
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const { coords, error } = useClientLocation();
  console.log("coords", coords);

  useEffect(() => {
    const fetchWeather = async () => {
      if (coords) {
        setIsLoading(true);
        try {
          const response = await getWeatherByCoords(
            coords.latitude,
            coords.longitude
          );
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
  }, [coords]);

  return {
    weatherInfos,
    isLoading,
    isError,
  };
}
