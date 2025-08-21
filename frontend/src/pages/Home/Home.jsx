import { useEffect, useState } from "react"
import "./Home.css"
import { getValidToken } from "../../utils/getValidToken"
import { getUserSpots } from "../../api/getUserSpots"
import Mappa from "../../components/mappa/Mappa"
import AddSpot from "./addSpot/AddSpot"
import Loader from "../../components/Loader"



export default function Home() {
  const [latitudine, setLatitudine] = useState(null);
  const [longitudine, setLongitudine] = useState(null);
  const [error, setError] = useState(null);
  const [spotsList, setSpotsList] = useState([]);
  const [addingSpot, setAddingSpot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ripos, setRipos] = useState(false);


  const openAddingSpot = () => {
    document.body.classList.add('no-scroll');
    setAddingSpot(true)
  }

  const closeAddingSpot = () => {
    document.body.classList.remove('no-scroll');
    setAddingSpot(false)
  }

  const rimuoviSpotDallaLista = (spotId) => {
    setSpotsList(prev => prev.filter(s => s.id !== spotId));
  };

  const aggiungiSpotAllaLista = (spot) => {
    setSpotsList(prev => [...prev, spot])
  }




  const getSposts = async (userId, token) => {
    const res = await getUserSpots(userId, token)
    return res
  }


  useEffect(() => {
    setLoading(true)
    setError("")

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
            setError("Errore nel recupero della posizione, controllare che l'app abbia accesso alla posizione: Vai su Impostazioni > Privacy > Posizione ")
            console.log(error)
          }
        )
      } else {
        setError("Geolocalizzazione non supportata dal browser.");
      }

      const spots = await getSposts(userId, token);
      setSpotsList(spots)
    }
    try {
      fetchData()
    } catch (err) {
      setError("errore nel recupero degli spot")
      console.log(err)
    } finally {
      setLoading(false)
    }


  }, [spotsList])



  return (
    <div className={addingSpot ? "home-content no-click" : "home-content"}>

      <h1>MUSHROOMTRAIL</h1>
      {loading && <Loader />}
      {error && <p style={{ color: "red" }} aria-live="assertive">{error}</p>}
      {!loading && (
        <div className="map-container">
          <Mappa longitudine={longitudine} latitudine={latitudine} spotsList={spotsList} rimuoviSpotDallaLista={rimuoviSpotDallaLista} setRipos={setRipos} ripos={ripos} />
        </div>
      )}

      {addingSpot && <AddSpot closeAddingSpot={closeAddingSpot} aggiungiSpotAllaLista={aggiungiSpotAllaLista} />}
      {!loading && (
        <div className="button-section">
          <button type="button" onClick={() => { setRipos(true) }} disabled={loading}>RIPOSIZIONA</button>
          <button onClick={() => { openAddingSpot() }} disabled={loading}>AGGIUNGI SPOT</button>
        </div>)}


    </div >
  )

}