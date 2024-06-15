import { WiDaySunny } from "react-icons/wi";
import { formatTimestampToHour } from "../../utils/formatTime";

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

  return (
    <ul className="forcastContainer">
      {fakeHourlyForecast.map((hourlyData, index) => (
        <li key={index} className="forcast-Item hourly">
          <div className="time">{formatTimestampToHour(hourlyData.time)}</div>
          <div className="icon">{hourlyData.icon}</div>
          <div className="temperature">{hourlyData.temperature}°</div>
        </li>
      ))}
    </ul>
  );
}
