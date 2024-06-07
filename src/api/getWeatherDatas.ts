import axios from "axios";
import {
  checkCacheDataExist,
  getCachedDatas,
  generateKey,
  isCacheExpired,
  createCacheDatas,
} from "../utils/cacheUtils";
import { CoordsType } from "../types/CoordsType";

const urlWeather = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "acf1e1df9b83f7767c986cbc7e90a553";

export const getWeatherByCoords = async (coords: CoordsType) => {
  // SI LS existe !
  if (!checkCacheDataExist()) {
    // Création d'une clé unique
    try {
      // Exécuter la requête vers l'API
      const response = await axios.get(`${urlWeather}`, {
        params: {
          lat: coords.latitude,
          lon: coords.longitude,
          appid: API_KEY,
          units: "metric",
        },
      });

      // Créer et stocker dans le localStorage
      createCacheDatas(coords, response.data);
      return response.data;
    } catch {
      throw new Error("Failed to fetch weather data");
    }
  }
  console.log("LS cache exist !");

  // Récupérer la première clé du localStorage
  const currentStorageKeys = Object.keys(localStorage);
  const key = currentStorageKeys[0];
  console.log("key", key);

  const currentStorageData = getCachedDatas(key);
  console.log("localStorageData", currentStorageData);

  const isExpired = isCacheExpired(currentStorageData);
  console.log("isExpired", isExpired);

  if (!isExpired) {
    console.log("not expired");
    //utiliser le cache
    const useStorageDatas = currentStorageData.storageValue;

    console.log("useStorageDatas", useStorageDatas);
    return useStorageDatas;
  } else {
    console.log("Expired recall API");
    // refaire le call Api
  }
};
