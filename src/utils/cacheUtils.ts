import { Coords, WeatherResponse } from "../types/WeatherTypes";

type CachedWeatherDatas = {
  storageValue: WeatherResponse;
  storageTimestamp: number;
};

// 10 min expiration du cache
const CACHE_EXPIRATION_TIME = 2 * 60 * 1000; //= 2min

//fonction qui permet de creer une key pour le cache besoins des coords en params
export function generateKey(coords: Coords): string {
  const { lat, lon } = coords; // destructuration de l'objet coords
  const cacheKey = `weather_${lat}_${lon}`; // creation clé unique de cache
  return cacheKey;
}

// Ya un truc dans le cache ???
export function checkCacheDataExist(): boolean {
  if (localStorage.length > 0) {
    return true;
  }
  return false;
}

//Creation du cache Si on a verifié qu'il n'y a pas de cache et qu'on a fetch la data de l'api
export function createCacheDatas(
  coords: Coords,
  apiResponseValue: WeatherResponse
) {
  //creation des datas a envoyer dans le storage
  console.log("CREATE CACHE !");
  const storageKey = generateKey(coords);
  console.log("KEY CREATED!");
  const storageValue: CachedWeatherDatas = {
    storageValue: apiResponseValue,
    storageTimestamp: Date.now(),
  };
  //console.log("storageKey", storageKey);
  //console.log("storageValue", storageValue);

  console.log("STOCKAGE => LS");
  const stockInnerStorage = localStorage.setItem(
    storageKey,
    JSON.stringify(storageValue)
  );
  console.log("STOCKED!");
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
  //console.log(`getCachedDatas(${key}):`, cachedDatas);
  if (cachedDatas) {
    const parsedDatas = JSON.parse(cachedDatas);
    // console.log("parsedDatas", parsedDatas);
    return parsedDatas;
  }
  return null;
}
//fonction pour voir si le cache est expired
//Si le Cache existe on regarde si il a expiré ou pas !
/* export function isCacheExpired(cachedDatas: CachedWeatherDatas): boolean {
  //Sinon recup de timestamp du cache
  const storageTimeStamp = cachedDatas.storageTimestamp;
  console.log("storageTimeStamp", storageTimeStamp);

  const currentTime = Date.now(); //recup date actuelle
  console.log("currentTime", currentTime);
  const calcul = currentTime - storageTimeStamp < CACHE_EXPIRATION_TIME;
  return calcul;
}
 */
export function isCacheExpired(cachedDatas: CachedWeatherDatas): boolean {
  const storageTimeStamp = cachedDatas.storageTimestamp;
  //console.log("storageTimeStamp", storageTimeStamp);
  const currentTime = Date.now(); // Recupérer la date actuelle
  //console.log("currentTime", currentTime);
  const timeElapsed = currentTime - storageTimeStamp; // Calculer le temps écoulé depuis le dernier enregistrement dans le cache
  //console.log("timeElapsed", timeElapsed);
  return timeElapsed >= CACHE_EXPIRATION_TIME; // Vérifier si le temps écoulé dépasse la durée de validité du cache
}

export function removeCache() {
  console.log("REMOVE !");
}
