import { useState, useEffect } from "react";
import { getWeatherByCoords } from "../api/getWeatherDatas";
import { useClientLocation } from "./useClientLocation";
//import { CoordType } from "../types/CoordsType";
import { WeatherResponse } from "../types/WeatherTypes";
import { CoordsType } from "../types/CoordsType";
import { getCachedDatas } from "../utils/cacheUtils";

export function useGetWeather() {
  const { coords, errorBrowserLocation } = useClientLocation();
  const [weatherInfos, setWeatherInfos] = useState<WeatherResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [cachedWeather, setCachedWeather] = useState<WeatherResponse | null>(
    null
  );

  // fonction qui fait le fetch et appel getWeatherByCoords
  const fetchWeather = async (coords: CoordsType) => {
    console.log("fetching");
    setIsLoading(true);
    try {
      const res = await getWeatherByCoords(coords);
      setWeatherInfos(res);
      console.log("res", res);
      setIsError(false);
    } catch (error) {
      console.log("error", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  //UE se déclanche en fonction du changement de coord
  useEffect(() => {
    console.warn("UE = HOOK - GETWEATHER");
    // condition pour executer le fetch:
    console.log("coord", coords);
    if (coords && coords.latitude !== null && coords.longitude !== null) {
      fetchWeather(coords);
    }
  }, [coords]);

  useEffect(() => {
    console.log("UE - hook utiliser cache");
    if (errorBrowserLocation) {
      //recup le cache si il y a un probleme de location
      const currentStorageKeys = Object.keys(localStorage);
      console.log("currentStorageKeys", currentStorageKeys);

      const currentStorageData = getCachedDatas(currentStorageKeys[0]);
      console.log("currentStorageData", currentStorageData);
      setCachedWeather(currentStorageData.storageValue);
    }
  }, [errorBrowserLocation]);

  return {
    weatherInfos: weatherInfos || cachedWeather,
    isLoading,
    isError,
    coords,
    errorBrowserLocation,
  };
}
