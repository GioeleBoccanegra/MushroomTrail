
import { useState } from "react"
import "./DettagliSpot.css"
import Loader from "../../Loader";
import { deleteSpotUser } from "../../../api/deleteSpotUser.js"
import { getValidToken } from "../../../utils/getValidToken.js"

export default function DettagliSpot({ spot, closeAddingSpot }) {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");


  const handleCancel = () => {
    setLoading(true);
    closeAddingSpot();
    setLoading(false);
  }

  const deleteSpot = async (token) => {
    const res = await deleteSpotUser(token, spot.id);
    if (res) {
      closeAddingSpot();
    }
  }

  const handleDelete = async () => {
    setError("");
    setLoading(true)
    const token = getValidToken();
    try {
      await deleteSpot(token);
    } catch (err) {
      setError(err);
    } finally { setLoading(false) }


  }



  return (
    <div className="post-add-overlay">
      <div className="add-post-div">
        <h2>dettagli spot</h2>
        {loading && <Loader />}
        {error && <p style={{ color: "red" }} aria-live="assertive">{error}</p>}
        <div>
          <h3>nome spot</h3>
          <p>{spot.name}</p>
          <h3>descrizione spot</h3>
          <p> {spot.description}</p>

          <h3>immagine spot</h3>
          <p>da aggiungere</p>
        </div>
        <button type="submit" disabled={loading} onClick={handleDelete}>Elimina</button>
        <button type="button" onClick={handleCancel} disabled={loading}>annulla</button>

      </div>
    </div >
  )
}