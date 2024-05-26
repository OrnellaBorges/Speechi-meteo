import { createContext, useContext, ReactNode } from "react";
import { useClientLocation } from "../hooks/useClientLocation";

type LocationContextType = {
  latitude: number | null;
  longitude: number | null;
};
/* 
type WeatherContextType = {

}

const WeatherContext = createContext<LocationContextType>({
  latitude: null,
  longitude: null,
});

export const useLocation = () => useContext(LocationContext);


 */
