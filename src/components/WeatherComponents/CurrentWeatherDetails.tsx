import { WiHumidity, WiStrongWind } from "react-icons/wi";

export default function CurrentWeatherDetails() {
  return (
    <div className="currentDetails">
      <p>Feel 13°</p>
      <p>Min 6°</p>
      <p>Max 16°</p>

      <div>
        <WiStrongWind style={{ fontSize: "2rem" }} />
        15%
      </div>
      <div>
        <WiHumidity style={{ fontSize: "2rem" }} />
        15%
      </div>
    </div>
  );
}
