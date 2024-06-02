import axios from "axios";
import {
  checkCacheDataExist,
  getCachedDatas,
  generateCacheKey,
  isCacheExpired,
} from "../utils/cacheUtils";

const urlWeather = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "acf1e1df9b83f7767c986cbc7e90a553";

export const getWeatherByCoords = async (
  latitude: number | null,
  longitude: number | null
) => {
  //verifier si un ya des elements dans le cache  dans le cache
  const isCacheInnerStorage = checkCacheDataExist();
  console.log("isCacheInnerStorage", isCacheInnerStorage);

  if (checkCacheDataExist()) {
    // generer Key
    const coords = { latitude, longitude };
    console.log(" create coords", coords);
    generateCacheKey(coords);

    // creer et stocker le cache
  } else {
    console.log("POPO");
  }
};
