import { CoordsType } from "../types/CoordsType";
import { WeatherResponse } from "../types/WeatherTypes";

type CachedWeatherDatas = {
  cachecontent: WeatherResponse;
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

// fonction verifie si il y a un cache ou pas en fonction de la clé

/* function checkCacheExist(cacheKey: string): boolean {
  const localStorageResponse = localStorage.getItem(cacheKey);
  if (localStorageResponse !== null) {
    console.log("true => le cache existe");
    return true;
  }
  console.log("key does not exist");
  return false;
} */

function checkCacheDataExist(): boolean {
  if (localStorage.length > 0) {
    return true;
  }
  return false;
}

//Creation du cache Si on a verifié qu'il n'y a pas de cache

// RECUP LES DATAS DU CACHE SI CACHE EXISTE

//fonction pour voir si le cache est expired
//Si le Cache existe on regarde si il a expiré ou pas !
function isCacheExpired(cachedDatas: CachedWeatherDatas): boolean {
  if (!cachedDatas) return false;
  const timestamp = cachedDatas.timestamp;
  const currentTime = Date.now();
  return currentTime - timestamp < CACHE_EXPIRATION_TIME;
}

// fonction qui recup les données du cache avec la cacheKey
function getCachedDatas(cacheKey: string): WeatherResponse {
  const cachedDatas = localStorage.getItem(cacheKey)!; // ! dit a TS que c'est sure que ce sera non null
  const parsedDatas = JSON.parse(cachedDatas); // je convertit la data pour la lire en tableau d'objet par Js
  return parsedDatas;
}
