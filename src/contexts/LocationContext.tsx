import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { useClientLocation } from "../hooks/useClientLocation";
import { Coords } from "../types/WeatherTypes";

//definition du type

type LocationContextType = {
  coords: Coords | null;
  errorBrowserLocation: boolean;
};

//creer le context
const LocationContext = createContext<LocationContextType | null>(null);

//Creer le fournisseur = provider

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const { coords, errorBrowserLocation } = useClientLocation();
  return (
    <LocationContext.Provider value={{ coords, errorBrowserLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
