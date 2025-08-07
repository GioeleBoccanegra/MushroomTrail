import { useEffect } from "react";
import { useMap } from "react-leaflet"

export default function ChangePosition({ position }) {


  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom())
    }
  }, [position, map])

  return null;
}