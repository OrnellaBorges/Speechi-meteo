import { useState, useEffect } from "react";
import { Coords } from "../types/WeatherTypes";

// Fonction debounce
/* function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  } */

export function useClientLocation() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [errorBrowserLocation, setErrorBrowserLocation] =
    useState<boolean>(false);
  const [successCount, setSuccessCount] = useState<number>(0);

  useEffect(() => {
    console.warn("UE-LOCATION");
    if (!("geolocation" in navigator)) {
      setErrorBrowserLocation(true);
      return;
    }

    const isSuccess = (position: GeolocationPosition) => {
      console.log(" SUCCESS GEOLOC!");

      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      // Incrémenter le compteur de succès
      setSuccessCount((prevCount) => {
        console.log("isSuccess count:", prevCount + 1);
        return prevCount + 1;
      });
    };

    // isSuccess with DEBOUNCE !
    /*  const isSuccess = debounce((position) => {
        console.log("SUCCESS! TIME 10S watchCoord", position.coords);
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }, 10000); // 10 secondes de debounce */

    const isError = () => {
      console.log("Geolocation is not available in this browser.");
      setErrorBrowserLocation(true);
    };

    //navigator.geolocation.getCurrentPosition(isSuccess, isError);

    const watchCoord = navigator.geolocation.watchPosition(isSuccess, isError, {
      enableHighAccuracy: false,
      maximumAge: 5000,
      timeout: 5000,
    });

    return () => navigator.geolocation.clearWatch(watchCoord);
  }, []);

  return {
    coords,
    errorBrowserLocation,
  };
}
