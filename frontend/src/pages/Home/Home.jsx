import { useEffect, useState } from "react"
import "./Home.css"
import { useSelector } from "react-redux"
import { getValidToken } from "../../utils/getValidToken"
import { getUserSpots } from "../../api/getUserSpots"

import Mappa from "../../components/mappa/Mappa"


export default function Home() {
  const [latitudine, setLatitudine] = useState(null);
  const [longitudine, setLongitudine] = useState(null);
  const [error, setError] = useState(null);
  const [spotsList, setSpotsList] = useState([]);



  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)


  const getSposts = async (token, userId) => {
    const res = await getUserSpots(token, userId)
    return res
  }

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId")
      const token = getValidToken();
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

      const spots = await getSposts(userId, token);
      setSpotsList(spots)
    }

    fetchData();


  }, [])

  return (
    <div>

      <h1>MASHROOMTRAIL</h1>
      {error && <p style={{ color: "red" }} aria-live="assertive">{error}</p>}
      <Mappa longitudine={longitudine} latitudine={latitudine} spotsList={spotsList} />

      <button onClick={() => { console.log("ciao") }}>aggiungi punto</button>
    </div>
  )

}