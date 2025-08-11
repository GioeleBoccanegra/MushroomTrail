import { useEffect, useState } from "react"
import "./Home.css"
import { getValidToken } from "../../utils/getValidToken"
import { getUserSpots } from "../../api/getUserSpots"
import Mappa from "../../components/mappa/Mappa"
import AddSpot from "./addSpot/AddSpot"


export default function Home() {
  const [latitudine, setLatitudine] = useState(null);
  const [longitudine, setLongitudine] = useState(null);
  const [error, setError] = useState(null);
  const [spotsList, setSpotsList] = useState([]);
  const [addingSpot, setAddingSpot] = useState(false);


  const openAddingSpot = () => {
    document.body.classList.add('no-scroll');
    setAddingSpot(true)
  }

  const closeAddingSpot = () => {
    document.body.classList.remove('no-scroll');
    setAddingSpot(false)
  }


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
    <div className={addingSpot ? "home-content no-click" : "home-content"}>

      <h1>MASHROOMTRAIL</h1>
      {error && <p style={{ color: "red" }} aria-live="assertive">{error}</p>}
      <Mappa longitudine={longitudine} latitudine={latitudine} spotsList={spotsList} />
      {addingSpot && <AddSpot closeAddingSpot={closeAddingSpot} />}
      <button onClick={() => { openAddingSpot() }}>aggiungi punto</button>
    </div>
  )

}