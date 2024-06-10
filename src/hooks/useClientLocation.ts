import { useState, useEffect } from "react";
import { CoordsType } from "../types/CoordsType";

// Fonction debounce
/* function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  } */

export function useClientLocation() {
  const [coords, setCoords] = useState<CoordsType | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    console.warn("UE-LOCATION");
    if (!("geolocation" in navigator)) {
      setError(true);
      return;
    }

    let lastUpdateTime = 0;
    const debounceTime = 10000; // 10 seconds

    const isSuccess = (position: GeolocationPosition) => {
      console.log(" SUCCESS! TIME 10S watchCoord", position.coords);

      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    // isSuccess with debounce !
    /*  const isSuccess = debounce((position) => {
        console.log("SUCCESS! TIME 10S watchCoord", position.coords);
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }, 10000); // 10 secondes de debounce */

    const isError = () => {
      console.log("Geolocation is not available in this browser.");
      setError(true);
    };

    //navigator.geolocation.getCurrentPosition(isSuccess, isError);

    const watchCoord = navigator.geolocation.watchPosition(isSuccess, isError, {
      enableHighAccuracy: false,
      maximumAge: 10000,
      timeout: 5000,
    });
    console.log("WATCHING");

    return () => navigator.geolocation.clearWatch(watchCoord);
  }, []);

  return {
    coords,
    error,
  };
}
