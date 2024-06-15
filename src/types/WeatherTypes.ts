export type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  visibility: number;
};

export type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

export type Clouds = {
  all: number;
};

export type Sys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export type Coords = {
  lon: number | null;
  lat: number | null;
};

export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type WeatherResponse = {
  coord: Coords;
  weather: Weather[];
  main: Main;
  wind: Wind;
  clouds: Clouds;
  dt: string;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};
