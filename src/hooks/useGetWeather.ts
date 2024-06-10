import { useState, useEffect } from "react";
import { getWeatherByCoords } from "../api/getWeatherDatas";
import { useClientLocation } from "./useClientLocation";
//import { CoordType } from "../types/CoordsType";
import { WeatherResponse } from "../types/WeatherTypes";
import { CoordsType } from "../types/CoordsType";

export function useGetWeather() {
  const [weatherInfos, setWeatherInfos] = useState<WeatherResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const { coords, error } = useClientLocation();

  // fonction qui fait le fetch et appel getWeatherByCoords
  const fetchWeather = async (coords: CoordsType) => {
    setIsLoading(true);
    try {
      const res = await getWeatherByCoords(coords);
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
    console.warn("UE = HOOK - GETWEATHER", coords);
    // condition pour executer le fetch:
    if (coords && coords.latitude !== null && coords.longitude !== null) {
      // passer coords dans la fonction qui fait le fetch
      fetchWeather(coords);
    }
  }, [coords]);

  return {
    weatherInfos,
    isLoading,
    isError,
  };
}
