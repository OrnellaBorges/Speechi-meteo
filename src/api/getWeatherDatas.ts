import axios from "axios";
import {
  checkCacheDataExist,
  getCachedDatas,
  generateKey,
  isCacheExpired,
  createCacheDatas,
} from "../utils/cacheUtils";

const urlWeather = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "acf1e1df9b83f7767c986cbc7e90a553";

export const getWeatherByCoords = async (
  latitude: number | null,
  longitude: number | null
) => {
  const coords = { latitude, longitude };
  const key = generateKey(coords);
  console.log("Generated key:", key);

  //verifier si un ya des elements dans le cache avant tout!
  if (!checkCacheDataExist()) {
    // retourn true ou false
    console.log("Fetching new data from API");

    try {
      //=> executer requête vers l'API
      const response = await axios.get(`${urlWeather}`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: API_KEY,
          units: "metric",
        },
      });
      // creer et stocker dans le storage
      const weatherData = response.data;
      console.log("weatherData", weatherData);
      createCacheDatas(key, weatherData);
      return weatherData;
    } catch {
      throw new Error("Failed to fetch weather data");
    }
  } else {
    console.log("LS cache exist ! ");
    console.log("key ===>", key);

    // recup la liste de key das le LS
    const cachedStorageKeys = Object.keys(localStorage);
    console.log("cachedStorageKeys", cachedStorageKeys);

    // check si la key est différente de celle du LS
    const isDifferentKey = !cachedStorageKeys.includes(key);
    console.log("isDifferentKey", isDifferentKey);

    // SI key différente OU Key idem mais Expiré

    //ALORS je supprime l'element du le locaLStorage
    // creation nouvelle clé
    // creation des nouvelles data
    // envoyer la nouvelle data dans le LS
  }
};
