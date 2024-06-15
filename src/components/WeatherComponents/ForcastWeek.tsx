import { fakeNextDaysForecast } from "../../api/mockWeekForcast";

export default function ForcastWeek() {
  return (
    <ul className="forcastContainer scrollYList">
      {fakeNextDaysForecast.map((day, index) => (
        <li key={index} className="forcast-Item">
          <div className="day">Day</div>
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
