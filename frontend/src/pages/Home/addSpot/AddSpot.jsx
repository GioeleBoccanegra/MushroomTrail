import { useState } from "react";
import "./AddSpot.css";

export default function AddSpot({ closeAddingSpot }) {

  const [image, setImage] = useState(null);


  const handleChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    closeAddingSpot()
  }




  const handleCancel = () => {
    closeAddingSpot()
  };

  return (
    <div className="post-add-overlay">
      <div className="add-post-div">
        <h2>dati spot</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nome spot</label>
          <input name="name" id="name" type="text" />

          <label htmlFor="description">Descrizione</label>
          <input name="description" type="text" id="description" />

          <label htmlFor="immagineSpot">Carica immagine</label>
          <input type="file" accept="image/*" onChange={handleChangeImage}></input>

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
          <button type="submit">Carica</button>
          <button type="button" onClick={handleCancel}>annulla</button>
        </form>
      </div>
    </div >

  )
}