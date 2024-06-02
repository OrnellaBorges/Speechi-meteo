import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { CoordsType } from "../types/CoordsType";
import { useClientLocation } from "../hooks/useClientLocation";

//definition du type

type LocationContextType = {
  coords: CoordsType | null;
  error: boolean;
};

//creer le context
const LocationContext = createContext<LocationContextType | null>(null);

//Creer le fournisseur = provider

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const { coords, error } = useClientLocation();
  return (
    <LocationContext.Provider value={{ coords, error }}>
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
