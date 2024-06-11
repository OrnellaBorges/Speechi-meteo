import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { CoordsType } from "../types/CoordsType";
import { Coords, WeatherResponse } from "../types/WeatherTypes";

import { useGetWeather } from "../hooks/useGetWeather";

// Définition du type pour le contexte
type WeatherContextType = {
  weatherInfos: WeatherResponse | null;
  isLoading: boolean;
  isError: boolean;
  coords: CoordsType | null;
  errorBrowserLocation: boolean;
};

// Créer le contexte
const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// Créer le fournisseur (provider)
export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const weatherData = useGetWeather();

  return (
    <WeatherContext.Provider value={{ ...weatherData }}>
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
