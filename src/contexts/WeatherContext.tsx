import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { useGetWeather } from "../hooks/useGetWeather";
import { CoordType } from "../types/CoordsType";

// Définition du type pour le contexte
type WeatherContextType = {
  weatherInfos: any;
  isLoading: boolean;
  isError: boolean;
  coords?: CoordType;
  error?: boolean;
};

// Créer le contexte
const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// Créer le fournisseur (provider)
export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const { weatherInfos, isError, isLoading } = useGetWeather();

  return (
    <WeatherContext.Provider value={{ weatherInfos, isLoading, isError }}>
      {children}
    </WeatherContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte Weather
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};