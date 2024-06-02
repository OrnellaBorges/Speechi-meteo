import { CoordsType } from "../types/CoordsType";
import { WeatherResponse } from "../types/WeatherTypes";

type CachedWeatherDatas = {
  cachecontent: WeatherResponse | null;
  timestamp: number;
};

// 10 min expiration du cache
const CACHE_EXPIRATION_TIME = 10 * 60 * 1000;

//fonction qui permet de creer une key pour le cache
function generateCacheKey(coords: CoordsType): String {
  const { latitude, longitude } = coords; // destructuration de l'objet coords
  const cacheKey = `weather_${latitude}_${longitude}`; // creation clé unique de cache

  return cacheKey;
}

// fonction qui verifie si il ya un cache ou pas en fonction de la clé
function checkCacheExist(cacheKey: string): boolean {
  const localStorageResponse = localStorage.getItem(cacheKey);
  if (localStorageResponse !== null) {
    console.log("true => le cache existe");
    return true;
  }
  console.log("key does not exist");
  return false;
}

//fonction pour voir si le cache est expired
function isCacheExpired(cachedDatas: CachedWeatherDatas | null): boolean {
  if (!cachedDatas) return false;
  const timestamp = cachedDatas.timestamp;
  const currentTime = Date.now();
  return currentTime - timestamp < CACHE_EXPIRATION_TIME;
}

// fonction qui recup les données du cache
function getCacheDatas() {
  // const getCacheWeatherData = localStorage.getItem()

  return;
}
