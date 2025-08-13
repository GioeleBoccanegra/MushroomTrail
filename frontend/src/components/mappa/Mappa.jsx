
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ChangePosition from "./changePosition/ChangePosition"
import L from 'leaflet';
import { useEffect, useState } from 'react';

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
})

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
})




export default function Mappa({ latitudine, longitudine, spotsList }) {


  const [position, setPosition] = useState();







  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);
      },
      (err) => {
        console.error("Errore nel recuperare la posizione", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 5000,
      }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);







  if (!latitudine || !longitudine) {
    return (
      <div>Caricamento mappa</div>
    )
  }









  return (


    <MapContainer center={[latitudine, longitudine]} zoom={15} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri"
      />
      <ChangePosition position={position} />


      <Marker position={position} icon={greenIcon}>
        <Popup>sei Qui</Popup>
      </Marker>


      {spotsList && spotsList
        .filter(spot => spot.latitude !== undefined && spot.longitude !== undefined)
        .map((spot) => (
          <Marker key={spot.id} position={[spot.latitude, spot.longitude]} icon={redIcon}><Popup>
            punto di interesse <a href={`https://www.google.com/maps/search/?api=1&query=${spot.latitude},${spot.longitude}`} target="_blank"
              rel="noopener noreferrer">raggiungi </a></Popup></Marker>
        ))};








    </MapContainer >

  )

}