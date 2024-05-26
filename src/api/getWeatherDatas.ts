import axios from "axios";

const url = "https://api.openweathermap.org/data/2.5/weather";

const API_KEY = "acf1e1df9b83f7767c986cbc7e90a553";

export const getWeatherByCity = async (city: string) => {
  console.log("fonction getWeather");
  const res = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    }
  );
  return res;
};

export const getWeatherByCoords = async (
  latitude: number,
  longitude: number
) => {
  try {
    console.log("1 - API > try");
    const response = await axios.get(`${url}`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: "metric",
      },
    });
    console.log("response->APi", response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};
