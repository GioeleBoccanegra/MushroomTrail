import { useMap } from "react-leaflet";

export const SetPosition = () => {

  const map = useMap();
  const getPosition = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(//ricavo posizione attuale
        (position) => {
          const posAtt = [];
          posAtt.push(position.coords.latitude);
          posAtt.push(position.coords.longitude);
          return posAtt
        },
        (error) => {
          console.log(error)
          throw new Error("Errore nel recupero della posizione, controllare che l'app abbia accesso alla posizione: Vai su Impostazioni > Privacy > Posizione ")

        }
      )
    } else {
      throw new Error("Geolocalizzazione non supportata dal browser.");
    }
  }


  const RiposizionaMappa = async () => {
    try {
      const posAttuale = await getPosition();
      if (posAttuale) {
        map.setView(posAttuale, map.getZoom())
      }

    } catch (err) {
      throw new Error(err.message)
    }
  }
  RiposizionaMappa();
}