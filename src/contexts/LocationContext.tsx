import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Children,
} from "react";

import { CoordType } from "../types/CoordsType";
import { useClientLocation } from "../hooks/useClientLocation";

//definition du type

type LocationContextType = {
  clientCoords: CoordType;
  error: boolean;
};

//creer le context
const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

//Creer le fournisseur = provider

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const { clientCoords, error } = useClientLocation();
  return (
    <LocationContext.Provider value={{ clientCoords, error }}>
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
