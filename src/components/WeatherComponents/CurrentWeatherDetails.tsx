import { WiHumidity, WiStrongWind } from "react-icons/wi";

export default function CurrentWeatherDetails() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        border: "3px solid yellow",
      }}
    >
      <p>Feel 13°</p>
      <p>Min 6°</p>
      <p>Max 16°</p>

      <p>
        <WiStrongWind style={{ fontSize: "2rem" }} />
        15%
      </p>
      <p>
        <WiHumidity style={{ fontSize: "2rem" }} />
        15%
      </p>
    </div>
  );
}
