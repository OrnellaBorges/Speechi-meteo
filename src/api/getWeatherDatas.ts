import axios from "axios";
import { WEATHER_API_KEY } from "../config";

import {
  checkCacheDataExist,
  getCachedDatas,
  generateKey,
  isCacheExpired,
  createCacheDatas,
} from "../utils/cacheUtils";
import { CoordsType } from "../types/CoordsType";

const urlWeather = "https://api.openweathermap.org/data/2.5/weather";

export const getWeatherByCoords = async (coords: CoordsType) => {
  // SI LS existe pas !
  if (!checkCacheDataExist()) {
    try {
      // Exécuter la requête vers l'API
      const response = await axios.get(`${urlWeather}`, {
        params: {
          lat: coords.latitude,
          lon: coords.longitude,
          appid: WEATHER_API_KEY,
          units: "metric",
        },
      });

      // Créer les datas pour le LS et stocker dans le localStorage
      createCacheDatas(coords, response.data); // stockage !
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw new Error("Failed to fetch weather data");
    }
  }

  console.log("LS exist !");

  // Récupérer la première clé du localStorage
  const currentStorageKeys = Object.keys(localStorage);
  const key = currentStorageKeys[0];
  console.log("key", key);

  const currentStorageData = getCachedDatas(key);
  console.log("localStorageData", currentStorageData);

  const isExpired = isCacheExpired(currentStorageData);
  console.log("isExpired", isExpired);

  if (!isExpired) {
    //utiliser le LS si pas expiré
    console.log("not expired use cache!", key);

    // recup des datas du storage
    const useStorageDatas = currentStorageData.storageValue;
    console.log("useStorageDatas", useStorageDatas);
    return useStorageDatas;
  } else {
    console.log("Expired recall API");
    // Effacer les datas du LS
    console.log("REMOVE LS");
    localStorage.clear();

    // refaire le call Api
    try {
      console.log("RECALLING API");
      // Exécuter la requête vers l'API
      const response = await axios.get(`${urlWeather}`, {
        params: {
          lat: coords.latitude,
          lon: coords.longitude,
          appid: WEATHER_API_KEY,
          units: "metric",
        },
      });

      // refaire createCacheData() => stockage

      createCacheDatas(coords, response.data); // stockage !

      // return le resultat de la nouvelle request
      console.log("response.data", response.data);
      return response.data;
    } catch {
      throw new Error("Failed to fetch weather data");
    }
  }
};
