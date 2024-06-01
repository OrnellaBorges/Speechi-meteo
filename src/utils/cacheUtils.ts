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
  const { latitude, longitude } = coords;
  const keyCache = `weather_${latitude}_${longitude}`;
  return keyCache;
}

//fonction pour voir si le cache est expired
function cacheExpired(cachedDatas: CachedWeatherDatas) {
  if (!cachedDatas) return false;
  const timestamp = cachedDatas.timestamp;
  const currentTime = Date.now();
  return currentTime - timestamp < CACHE_EXPIRATION_TIME;
}

// fonction qui recup les données du cache
