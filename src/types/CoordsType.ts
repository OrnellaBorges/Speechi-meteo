export type CoordType = {
  latitude: number;
  longitude: number;
};

type WeatherInfo = {
  timezone: string;
  current: {
    temp: number;
    weather: {
      description: string;
    }[];
  };
};
