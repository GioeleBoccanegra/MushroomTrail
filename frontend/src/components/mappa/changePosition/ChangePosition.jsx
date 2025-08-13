
import { useMap } from "react-leaflet"

export default function ChangePosition({ position, setRipos }) {


  const map = useMap();


  if (position) {
    map.setView(position, map.getZoom())
    setRipos(false)
  }


  return null;
}