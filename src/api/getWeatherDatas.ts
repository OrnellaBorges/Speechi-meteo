import axios from "axios";
import { WEATHER_API_KEY } from "../config";
import {
  checkCacheDataExist,
  getCachedDatas,
  isCacheExpired,
  createCacheDatas,
} from "../utils/cacheUtils";
import { Coords } from "../types/WeatherTypes";

const urlWeather = "https://api.openweathermap.org/data/2.5/weather";

// Fonction pour effectuer l'appel à l'API
const callWeatherAPI = async (coords: Coords) => {
  try {
    console.log("Calling API");
    const response = await axios.get(`${urlWeather}`, {
      params: {
        lat: coords.lat,
        lon: coords.lon,
        appid: WEATHER_API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch weather data from API", error);
    throw new Error("Failed to fetch weather data");
  }
};

export const getWeatherByCoords = async (coords: Coords) => {
  // SI LS existe pas !
  if (!checkCacheDataExist()) {
    try {
      // Exécuter la requête vers l'API
      const response = await callWeatherAPI(coords);

      // Créer les données pour le cache et stocker dans le localStorage
      createCacheDatas(coords, response); // stockage !
      return response;
    } catch (error) {
      throw error;
    }
  }

  console.log("STORAGE EXIST!");

  //SINON => Récup Key du localStorage
  const currentStorageKeys = Object.keys(localStorage);
  const key = currentStorageKeys[0];
  //console.log("key", key);

  const currentStorageData = getCachedDatas(key);
  //console.log("localStorageData", currentStorageData);

  const isExpired = isCacheExpired(currentStorageData);
  console.warn("STORAGE IS EXPIRED", isExpired);

  if (!isExpired) {
    // Utiliser le cache si pas expiré
    console.log("not expired, use cache!", key);

    // Récupérer les données du cache
    console.log(
      "currentStorageData.storageValue",
      currentStorageData.storageValue
    );
    return currentStorageData.storageValue;
  } else {
    console.log("Expired, recall API");
    // Effacer les données du cache
    console.log("REMOVE LS");
    localStorage.clear();

    // Refaire l'appel API
    try {
      const response = await callWeatherAPI(coords);

      // Recréer le cache avec les nouvelles données
      createCacheDatas(coords, response); // stockage !

      // Retourner le résultat de la nouvelle requête
      console.log("response.data", response);
      return response;
    } catch (error) {
      throw error;
    }
  }
};
