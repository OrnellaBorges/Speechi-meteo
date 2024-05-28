import { useState, useEffect, useRef } from "react";
import { getWeatherByCoords } from "../api/getWeatherDatas";
import { useClientLocation } from "./useClientLocation";
import { WeatherResponse } from "../types/WeatherTypes";
import { CoordType } from "../types/CoordsType";

export function useGetWeather() {
  const [weatherInfos, setWeatherInfos] = useState<WeatherResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [fetchCount, setFetchCount] = useState(0); // Ajout d'un compteur de fetch

  const { coords, error } = useClientLocation();

  const coordsRef = useRef<CoordType>({ latitude: null, longitude: null });
  console.log("coords", coords);
  console.log("coordsRef", coordsRef);

  useEffect(() => {
    if (
      coords &&
      coords.latitude !== 0 &&
      coords.longitude !== 0 &&
      fetchCount === 0
    ) {
      // Vérifier que les coordonnées sont disponibles et non nulles et que le fetch n'a pas déjà été effectué
      setIsLoading(true);
      const fetchWeather = async () => {
        try {
          const response = await getWeatherByCoords(
            coords.latitude,
            coords.longitude
          );
          console.log("response HOOK", response.data);
          setWeatherInfos(response.data); // Assurez-vous de définir les bonnes données ici
          setIsError(false);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
          setFetchCount(fetchCount + 1); // Incrémenter le compteur de fetch
        }
      };

      fetchWeather();
    }
  }, [coords, fetchCount]);

  console.log("fetchCount", fetchCount);

  return {
    weatherInfos,
    isLoading,
    isError,
  };
}
