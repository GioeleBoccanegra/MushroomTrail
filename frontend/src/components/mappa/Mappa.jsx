
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ChangePosition from "./changePosition/ChangePosition"


export default function Mappa({ latitudine, longitudine }) {
  if (!latitudine || !longitudine) {
    return (
      <div>Caricamento mappa</div>
    )
  }





  return (
    <MapContainer center={[latitudine, longitudine]} zoom={15} style={{ height: '500px', width: '100%' }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangePosition latitudine={latitudine} longitudine={longitudine} />

      <Marker position={[latitudine, longitudine]}>
        <Popup>sei Qui</Popup>
      </Marker>






    </MapContainer>
  )

}