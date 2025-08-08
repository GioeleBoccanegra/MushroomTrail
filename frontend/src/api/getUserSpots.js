const BACKEND_URL = import.meta.env.VITE_CLOUDINARY_URL_BACKEND;
export const getUserSpots = async (userId, token) => {

  try {
    const res = await fetch(`${BACKEND_URL}/api/spot/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    )

    if (!res.ok) { throw new Error("Errore nel recupero degli spot") };
    const text = await res.text();
    if (!text) {
      throw new Error("risposta vuota al server");
    }
    const data = JSON.parse(text);

    return data
  } catch (err) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      throw new Error("Impossibile connettersi al server. Verificare che il backend sia attivo.");
    } else {
      throw new Error("errore nel recupero dati: " + (err.message || "errore sconosciuto"))
    }
  }


}