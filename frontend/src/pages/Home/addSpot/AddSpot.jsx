import { useState } from "react";
import "./AddSpot.css";
import { postSpotUser } from "../../../api/postSpotUser"
import { getValidToken } from "../../../utils/getValidToken";
import Loader from "../../../components/Loader";
import { uploadImageToCloudinary } from "../../../utils/uploadImageToCloudinary"

export default function AddSpot({ closeAddingSpot, aggiungiSpotAllaLista }) {

  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [descrizione, setDescrizione] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)




  const handleChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert("L'immagine è troppo grande! (max 5MB)");
        e.target.value = ""; // reset
        return;
      }
    }
  }

  /*function getCurrentPositionAsync() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocalizzazione non supportata dal browser."));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 1000,
        });
      }
    });
  }*/



  const handleSubmit = async (e) => {
    setError("")
    setLoading(true)
    e.preventDefault();
    if (!name) {
      setError("Devi inserire un nome spot per continuare")
      return
    } else if (!descrizione) {
      setError("devi inserire una descrizione per continuare")
      return

    }
    else if (!image) {
      setError("Devi caricre un immagine per continuare")
      return
    }

    const urlImmagine = await uploadImageToCloudinary(image);


    /*let position;
    try {
      position = await getCurrentPositionAsync();
    } catch (error) {
      setError("Errore nel recupero della posizione: " + error.message);
      setLoading(false);
      return;
    }*/

    // const latitude = position.coords.latitude;
    //const longitude = position.coords.longitude;

    const latitude = -0.127758
    const longitude = 51.507351





    const valUserId = localStorage.getItem("userId");
    const user = { id: valUserId };
    const token = getValidToken();

    if (!longitude || !latitude) {
      setError("errore nel recupero delle coordinate, riprovare")
      return
    }
    console.log(urlImmagine)

    const spot = {
      name: name,
      description: descrizione,
      imageUrl: urlImmagine,
      latitude: latitude,
      longitude: longitude,
      user: user
    }



    try {

      const res = await postSpotUser(token, spot)
      console.log(res);

      aggiungiSpotAllaLista(spot);
      closeAddingSpot()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false);
    }
  }




  const handleCancel = () => {
    closeAddingSpot()
  };

  return (
    <div className="post-add-overlay">
      <div className="add-post-div">
        <h2>dati spot</h2>
        {!error && loading && <Loader />}
        {error && <p style={{ color: "red" }} aria-live="assertive">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nome spot</label>
          <input name="name" id="name" type="text" disabled={loading} onChange={(e) => { setName(e.target.value) }} />

          <label htmlFor="description">Descrizione</label>
          <input name="description" type="text" id="description" disabled={loading} onChange={(e) => { setDescrizione(e.target.value) }} />

          <label htmlFor="immagineSpot">Carica immagine</label>
          <input id="immagineSpot" type="file" accept="image/*" capture="environment" onChange={handleChangeImage} disabled={loading}></input>

          {image && (
            <div>
              <p>anteprima</p>
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                style={{ maxWidth: "200px", borderRadius: "8px" }}
              />
            </div>
          )}
          <button type="submit" disabled={loading}>Carica</button>
          <button type="button" onClick={handleCancel} disabled={loading}>annulla</button>
        </form>
      </div>
    </div >

  )
}