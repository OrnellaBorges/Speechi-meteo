import React from "react";

//import { IconName } from "react-icons/wi";

import { WiDaySunny } from "react-icons/wi";

export default function ForcastWeather() {
  const fakeHourlyForecast = [
    {
      time: 1623432000,
      icon: <WiDaySunny />,
      temperature: 25,
    },
    {
      time: 1623453600,
      icon: <WiDaySunny />,
      temperature: 20,
    },
    {
      time: 1623475200,
      icon: <WiDaySunny />,
      temperature: 18,
    },
    {
      time: 1623453600,
      icon: <WiDaySunny />,
      temperature: 20,
    },
    {
      time: 1623475200,
      icon: <WiDaySunny />,
      temperature: 18,
    },
    {
      time: 1623475200,
      icon: <WiDaySunny />,
      temperature: 18,
    },
    {
      time: 1623453600,
      icon: <WiDaySunny />,
      temperature: 20,
    },
    {
      time: 1623475200,
      icon: <WiDaySunny />,
      temperature: 18,
    },
  ];

  // Convertir un timestamp en une heure au format "19h"
  function formatTimestampToHour(timestamp: number) {
    // Créer une nouvelle instance de Date à partir du timestamp
    const date = new Date(timestamp * 1000); // *1000 car le timestamp est en secondes
    //console.log("date", date);

    // Obtenir l'heure et les minutes de la date
    const hour = date.getHours();

    // Construire l'heure au format "19h"
    const formattedHour = `${hour}h`;

    return formattedHour;
  }

  return (
    <>
      <h3 style={{ marginBottom: "1rem" }}>Hourly Forecast</h3>
      <ul
        className="forcast"
        style={{
          border: "1px solid black",
          overflow: "scroll",
          display: "flex",
        }}
      >
        {fakeHourlyForecast.map((hourlyData, index) => (
          <li
            key={index}
            className="forcastItem"
            style={{
              border: "1px solid yellow",
              width: "max-content",
              padding: "0.5rem",
            }}
          >
            <div>{formatTimestampToHour(hourlyData.time)}</div>
            <div style={{ fontSize: "2rem" }}>{hourlyData.icon}</div>
            <div>{hourlyData.temperature}°</div>
          </li>
        ))}
      </ul>
    </>
  );
}
