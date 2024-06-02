import { useState, useEffect } from "react";
import { CoordsType } from "../types/CoordsType";

export function useClientLocation() {
  const [coords, setCoords] = useState<CoordsType | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError(true);
      return;
    }

    const isSuccess = (position: GeolocationPosition) => {
      console.log("position", position);
      console.warn("Success");
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const isError = () => {
      setError(true);
    };

    //navigator.geolocation.getCurrentPosition(isSuccess, isError);

    const watchCoord = navigator.geolocation.watchPosition(isSuccess, isError);

    return () => navigator.geolocation.clearWatch(watchCoord);
  }, []);

  return {
    coords,
    error,
  };
}
