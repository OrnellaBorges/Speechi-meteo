import axios from "axios";

const urlWeather = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "acf1e1df9b83f7767c986cbc7e90a553";

export const getWeatherByCoords = async (
  latitude: number | null,
  longitude: number | null
) => {
  try {
    //verifier si le cache LS contient la clé "cacheWeatherData"
    const cachedWeatherData = localStorage.getItem("cacheWeatherData");
    console.log("cache vide?  = ", cachedWeatherData);
    if (cachedWeatherData) {
      console.log("cache full");
      return JSON.parse(cachedWeatherData);
    } else {
      //=> executer requête vers l'API
      const response = await axios.get(`${urlWeather}`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: API_KEY,
          units: "metric",
        },
      });

      const weatherData = response.data;
      console.log("weatherData", weatherData);
      //creer la clé et stocker les datas de l'api dans cache LS weatherData
      localStorage.setItem("cacheWeatherData", JSON.stringify(weatherData));

      return weatherData;
    }
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};
