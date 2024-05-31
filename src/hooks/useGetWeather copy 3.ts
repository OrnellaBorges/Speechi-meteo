import { useState, useEffect, useRef } from "react";
import { getWeatherByCoords } from "../api/getWeatherDatas";
import { useClientLocation } from "./useClientLocation";
import { CoordType } from "../types/CoordsType";
import { WeatherResponse } from "../types/WeatherTypes";

export function useGetWeather() {
  const [weatherInfos, setWeatherInfos] = useState<WeatherResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const { coords, error } = useClientLocation();
  console.log("coords", coords);
  //ref qui va stocker
  const lastCoords = useRef<CoordType>({ latitude: null, longitude: null });
  console.log("lastCoords", lastCoords);

  // fonction qui fait le fetch et appel getWeatherByCoords
  const fetchWeather = async (latitude: number, longitude: number) => {
    setIsLoading(true);
    try {
      const res = await getWeatherByCoords(latitude, longitude);
      setWeatherInfos(res);
      console.log("res", res);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  //UE se déclanche en fonction du changement de coord
  useEffect(() => {
    if (coords && coords.latitude !== null && coords.longitude !== null) {
      const { latitude, longitude } = coords;

      // SI les nouvelles coords sont les mêmes que la ref lastCoord
      if (
        lastCoords.current.latitude === latitude &&
        lastCoords.current.longitude === longitude
      ) {
        return;
      }
      // On remplace la ref ancienne par les nouvelles coords
      lastCoords.current = { latitude, longitude };
      console.log("lastCoords UE", lastCoords);
      // je déclanche le fetch
      fetchWeather(latitude, longitude);
    }
  }, [coords]);

  return {
    weatherInfos,
    isLoading,
    isError,
  };
}
