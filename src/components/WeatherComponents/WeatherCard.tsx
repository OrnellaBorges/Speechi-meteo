import "./style.css";

type WeatherCardProps = {
  children: React.ReactNode;
  customTitle: string;
};
export default function WeatherCard({
  children,
  customTitle,
}: WeatherCardProps) {
  return (
    <div className="card">
      <h2 className="cardTitle" style={{ marginBottom: "1rem" }}>
        {customTitle}
      </h2>
      {children}
    </div>
  );
}
