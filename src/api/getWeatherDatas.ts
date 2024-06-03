import axios from "axios";
import {
  checkCacheDataExist,
  getCachedDatas,
  generateKey,
  isCacheExpired,
} from "../utils/cacheUtils";

const urlWeather = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "acf1e1df9b83f7767c986cbc7e90a553";

export const getWeatherByCoords = async (
  latitude: number | null,
  longitude: number | null
) => {
  //verifier si un ya des elements dans le cache avant tout!

  if (!checkCacheDataExist()) {
    // retourn true ou false
    console.log("Fetching new data from API");
    const coords = { latitude, longitude };
    console.log(" create coords", coords);

    try {
      /* //=> executer requête vers l'API
      const response = await axios.get(`${urlWeather}`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: API_KEY,
          units: "metric",
        },
      }); */
    } catch {}

    // creer et stocker le cache
  } else {
    console.log("LS cache exist ! ");
  }
};
