import { fakeNextDaysForecast } from "../../api/mockWeekForcast";
import { getNextDay } from "../../utils/formatTime";
import { useState } from "react";

export default function ForcastWeek() {
  const currentDate = Date.now();
  //const date = getNextDay(currentDate);
  /* const hello = currentDate.toLocaleString("en-US", {
    weekday: "long",
  });
 */
  return (
    <ul className="forcastContainer column">
      {fakeNextDaysForecast.map((day, index) => (
        <li key={index} className="forcast-Item">
          <div className="day">czvs</div>
          <div className="icon">
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].main}
            />
          </div>
          <div className="temperature">{day.temp.day}°</div>
        </li>
      ))}
    </ul>
  );
}
