import { useEffect } from "react";
import { useMap } from "react-leaflet"

export default function ChangePosition({ latitudine, longitudine }) {
  const map = useMap();

  useEffect(() => {
    const center = [latitudine, longitudine];
    if (center) {
      map.setView(center, map.getZoom())
    }
  }, [latitudine, longitudine, map])

  return null;
}