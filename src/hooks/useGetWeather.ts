import { useState, useEffect } from "react";
import { getWeatherByCoords } from "../api/getWeatherDatas";
import { useClientLocation } from "./useClientLocation";
//import { CoordType } from "../types/CoordsType";
import { Coords, WeatherResponse } from "../types/WeatherTypes";
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
  const fetchWeather = async (coords: Coords) => {
    console.log("fetching en cours");
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
    if (coords && coords.lat !== null && coords.lon !== null) {
      fetchWeather(coords);
    }
  }, [coords]);

  // en cas de PB de geolocation:
  // Renvoyer les datas du LS si elle existe

  useEffect(() => {
    console.log("UE useGetWeather : Geoloc unvailable");
    if (errorBrowserLocation) {
      //recup le cache si il y a un probleme de location
      // envoyer quoi qu'il arrive les données dans le cache
      const currentStorageKeys = Object.keys(localStorage);
      console.log("currentStorageKeys", currentStorageKeys);

      const currentStorageData = getCachedDatas(currentStorageKeys[0]);
      console.log("ENVOI LES DATAS DU CACHE ");
      // mise a jour du state cachedWeather
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
