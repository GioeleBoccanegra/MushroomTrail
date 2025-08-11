const BACKEND_URL = import.meta.env.VITE_CLOUDINARY_URL_BACKEND;



export const postUser = async (token, spot) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/spot`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ spot })
    })

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