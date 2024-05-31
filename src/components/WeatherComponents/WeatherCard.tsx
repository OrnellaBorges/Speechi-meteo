import "./style.css";

type WeatherCardProps = {
  children: React.ReactNode;
};
export default function WeatherCard({ children }: WeatherCardProps) {
  return <div className="card">{children}</div>;
}
