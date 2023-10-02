import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        position: lat: {lat} lng: {lng}
      </h1>
      <button onClick={() => setSearchParams({ lat: 30, lng: 50 })}>
        change pos
      </button>
    </div>
  );
}

export default Map;
