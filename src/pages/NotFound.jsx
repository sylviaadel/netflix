import { useLocation } from "react-router-dom";

export default function NotFound() {
  let location = useLocation();

  return (
    <div className="error">
      <h1>Resourse not found at {location.pathname}</h1>
    </div>
  );
}
