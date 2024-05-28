import axios from "axios";

const urlWeather = "https://api.openweathermap.org/data/2.5/weather";
const urlOneCall = "http://api.openweathermap.org/data/2.5/onecall";
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

/* export const getWeatherByCoords = async (
  latitude: number,
  longitude: number
) => {
  try {
    console.log("Weather by Coords");
    const response = await axios.get(`${urlOneCall}`, {
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
}; */

export const getWeatherByCoords = async (
  latitude: number,
  longitude: number
) => {
  try {
    console.log("1 - API > tryCoords");
    const response = await axios.get(`${urlWeather}`, {
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
