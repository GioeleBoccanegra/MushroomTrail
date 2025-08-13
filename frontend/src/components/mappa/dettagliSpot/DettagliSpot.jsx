
import { useState } from "react"
import "./DettagliSpot.css"
import Loader from "../../Loader";

export default function DettagliSpot({ spot, closeAddingSpot }) {

  const [loading, setLoading] = useState(false)


  const handleCancel = () => {
    setLoading(true);
    closeAddingSpot();
    setLoading(false);
  }



  return (
    <div className="post-add-overlay">
      <div className="add-post-div">
        <h2>dettagli spot</h2>
        {loading && <Loader />}
        <div>
          <h3>nome spot</h3>
          <p>{spot.name}</p>
          <h3>descrizione spot</h3>
          <p> {spot.description}</p>

          <h3>immagine spot</h3>
          <p>da aggiungere</p>
        </div>
        <button type="submit" disabled={loading} onClick={console.log("eliminba")}>Elimina</button>
        <button type="button" onClick={handleCancel} disabled={loading}>annulla</button>

      </div>
    </div >
  )
}