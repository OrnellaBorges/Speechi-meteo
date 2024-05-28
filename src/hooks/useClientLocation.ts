import { useState, useEffect } from "react";
import { CoordType } from "../types/CoordsType";

export function useClientLocation() {
  const [coords, setCoords] = useState<CoordType>({
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError(true);
      return;
    }

    const isSuccess = (position: GeolocationPosition) => {
      console.warn("Success");
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const isError = () => {
      setError(true);
    };

    const watchCoord = navigator.geolocation.watchPosition(isSuccess, isError);

    return () => navigator.geolocation.clearWatch(watchCoord);
  }, []);

  return {
    coords,
    error,
  };
}
