import axios from "axios";

const urlWeather = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "acf1e1df9b83f7767c986cbc7e90a553";

export const getWeatherByCoords = async (
  latitude: number | null,
  longitude: number | null
) => {
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
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};
