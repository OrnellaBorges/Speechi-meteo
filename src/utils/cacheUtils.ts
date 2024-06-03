import { CoordsType } from "../types/CoordsType";
import { WeatherResponse } from "../types/WeatherTypes";

type CachedWeatherDatas = {
  storageValue: WeatherResponse;
  storageTimestamp: number;
};

// 10 min expiration du cache
const CACHE_EXPIRATION_TIME = 10 * 60 * 1000;

//fonction qui permet de creer une key pour le cache besoins des coords en params
export function generateKey(coords: CoordsType): string {
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
export function checkCacheDataExist(): boolean {
  if (localStorage.length > 0) {
    return true;
  }
  return false;
}

//Creation du cache Si on a verifié qu'il n'y a pas de cache et qu'on a fetch la data de l'api
export function createCacheDatas(
  //coords?: CoordsType,
  key: string,
  apiResponseValue: WeatherResponse
) {
  const storageKey = key;

  const storageValue: CachedWeatherDatas = {
    storageValue: apiResponseValue,
    storageTimestamp: Date.now(),
  };
  console.log("storageValue", storageValue);
  console.log("storageKey", storageKey);
  const stockInnerStorage = localStorage.setItem(
    storageKey,
    JSON.stringify(storageValue)
  );
  console.log("stocked in localStorage!");
  return stockInnerStorage;
}

// RECUP LES DATAS DU CACHE SI CACHE EXISTE

// fonction qui recup les données du cache avec la cacheKey
/* export function getCachedDatas(key: string): WeatherResponse {
  const cachedDatas = localStorage.getItem(key)!; // ! dit a TS que c'est sure que ce sera non null
  console.log("cachedDatas", cachedDatas);
  const parsedDatas = JSON.parse(cachedDatas); // je convertit la data pour la lire en tableau d'objet par Js
  console.log("parsedDatas", parsedDatas);
  return parsedDatas;
} */

export function getCachedDatas(key: string) {
  const cachedDatas = localStorage.getItem(key);
  console.log(`getCachedDatas(${key}):`, cachedDatas);
  if (cachedDatas) {
    const parsedDatas = JSON.parse(cachedDatas);
    console.log("parsedDatas", parsedDatas);
    return parsedDatas;
  }
  return null;
}
//fonction pour voir si le cache est expired
//Si le Cache existe on regarde si il a expiré ou pas !
export function isCacheExpired(cachedDatas: CachedWeatherDatas): boolean {
  console.log("Is expired ? : ");
  //Sinon recup de timestamp du cache
  const storageTimeStamp = cachedDatas.storageTimestamp;
  const currentTime = Date.now(); //recup date actuelle
  return currentTime - storageTimeStamp < CACHE_EXPIRATION_TIME; // verif si c'est expiré
}

export function updateCacheIfExpired(coords: CoordsType) {
  console.log("REMOVE CURRENT CACHE");

  console.log("UPDATE with New");
}
