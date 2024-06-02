import { time, timeStamp } from "console";
import { CoordsType } from "../types/CoordsType";
import { WeatherResponse } from "../types/WeatherTypes";

type CachedWeatherDatas = {
  cacheContent: WeatherResponse;
  timestamp: number;
};

// 10 min expiration du cache
const CACHE_EXPIRATION_TIME = 10 * 60 * 1000;

//fonction qui permet de creer une key pour le cache besoins des coords en params
function generateCacheKey(coords: CoordsType): string {
  const { latitude, longitude } = coords; // destructuration de l'objet coords
  const cacheKey = `weather_${latitude}_${longitude}`; // creation clé unique de cache
  return cacheKey;
}

/*
// fonction verifie si il y a un cache ou pas en fonction de la clé

 function checkCacheExist(cacheKey: string): boolean {
  const localStorageResponse = localStorage.getItem(cacheKey);
  if (localStorageResponse !== null) {
    console.log("true => le cache existe");
    return true;
  }
  console.log("key does not exist");
  return false;
} */

// Ya un truc dans le cache ???
function checkCacheDataExist(): boolean {
  if (localStorage.length > 0) {
    return true;
  }
  return false;
}

//Creation du cache Si on a verifié qu'il n'y a pas de cache et qu'on a fetch la data de l'api
export function createCacheDatas(
  coords: CoordsType,
  apiResponseValue: WeatherResponse
) {
  const key = generateCacheKey(coords); // creation de la Key
  const cacheValue: CachedWeatherDatas = {
    cacheContent: apiResponseValue,
    timestamp: Date.now(),
  };
  console.log("cacheValue", cacheValue);
  console.log("key", key);

  return localStorage.setItem(key, JSON.stringify(cacheValue));
}

// RECUP LES DATAS DU CACHE SI CACHE EXISTE

// fonction qui recup les données du cache avec la cacheKey
export function getCachedDatas(cacheKey: string): WeatherResponse {
  const cachedDatas = localStorage.getItem(cacheKey)!; // ! dit a TS que c'est sure que ce sera non null
  const parsedDatas = JSON.parse(cachedDatas); // je convertit la data pour la lire en tableau d'objet par Js
  return parsedDatas;
}

//fonction pour voir si le cache est expired
//Si le Cache existe on regarde si il a expiré ou pas !
export function isCacheExpired(cachedDatas: CachedWeatherDatas): boolean {
  console.log("Is expired ? : ");
  if (!cachedDatas) return false; // si le cache existe pas

  //Sinon recup de timestamp du cache
  const timestamp = cachedDatas.timestamp;
  const currentTime = Date.now(); //recup date actuelle
  return currentTime - timestamp < CACHE_EXPIRATION_TIME; // verif si c'est expiré
}
