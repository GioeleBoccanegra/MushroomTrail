const BACKEND_URL = import.meta.env.VITE_CLOUDINARY_URL_BACKEND;
import unauthorizedCall from "../utils/unauthorizedCall";



export const postSpotUser = async (token, spot) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/spot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(spot)
    })

    unauthorizedCall(res);


    if (!res.ok) {
      throw new Error("Errore nella creazione spot")
    }
    return res
  } catch (err) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      throw new Error("Impossibile connettersi al server. Verificare che il backend sia attivo.");
    } else {
      throw new Error("errore nel recupero dati: " + (err.message || "errore sconosciuto"))
    }
  }


}