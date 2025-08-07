import { useEffect, useState } from "react"
import "./Home.css"
import { useSelector } from "react-redux"

import Mappa from "../../components/mappa/Mappa"


export default function Home() {
  const [latitudine, setLatitudine] = useState(null);
  const [longitudine, setLongitudine] = useState(null);
  const [error, setError] = useState(null);



  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(//ricavo posizione attuale
        (position) => {
          setLatitudine(position.coords.latitude);
          setLongitudine(position.coords.longitude);
        },
        (error) => {
          setError("Errore nel recupero della posizione:", error)
        }
      )
    } else {
      setError("Geolocalizzazione non supportata dal browser.");
    }
  }, [])

  return (
    <div>

      <h1>MASHROOMTRAIL</h1>
      {error && <p style={{ color: "red" }} aria-live="assertive">{error}</p>}
      <Mappa longitudine={longitudine} latitudine={latitudine} />

      <button onClick={() => { console.log("ciao") }}>aggiungi punto</button>
    </div>
  )

}