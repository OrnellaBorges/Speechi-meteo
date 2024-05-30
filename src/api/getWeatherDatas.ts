import axios from "axios";

const urlWeather = "https://api.openweathermap.org/data/2.5/weather";
const urlOneCall = "http://api.openweathermap.org/data/2.5/onecall";
const API_KEY = "acf1e1df9b83f7767c986cbc7e90a553";
const API_SPEECHI_KEY = "c6dea39f86ea31dc114f0a4f0eec8fa9";

/* export const getWeatherByCity = async (city: string) => {
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
}; */

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

let requestApiCount = 0;
export const getWeatherByCoords = async (
  latitude: number | null,
  longitude: number | null
) => {
  requestApiCount++;
  console.log(`Number of requests: ${requestApiCount}`);
  try {
    console.log("FETCH API");
    const response = await axios.get(`${urlWeather}`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: "metric",
      },
    });
    console.log("response->API", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

export const getRequestCount = () => {
  return requestApiCount;
};
