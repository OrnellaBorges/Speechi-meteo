import { useState, useEffect } from "react";
import { getWeatherByCoords } from "../api/getWeatherDatas";
import { useClientLocation } from "./useClientLocation";
//import { CoordType } from "../types/CoordsType";
import { WeatherResponse } from "../types/WeatherTypes";

export function useGetWeather() {
  const [weatherInfos, setWeatherInfos] = useState<WeatherResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const { coords, error } = useClientLocation();

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
    // condition pour executer le fetch:
    if (coords && coords.latitude !== null && coords.longitude !== null) {
      // destructuration de l'objet coord importé de useClientLocation
      const { latitude, longitude } = coords;

      // passer latitude longitude dans la fonction qui fait le fetch
      fetchWeather(latitude, longitude);
    }
  }, [coords]);

  return {
    weatherInfos,
    isLoading,
    isError,
  };
}
