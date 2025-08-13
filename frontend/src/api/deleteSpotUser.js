const BACKEND_URL = import.meta.env.VITE_CLOUDINARY_URL_BACKEND;
import unauthorizedCall from "../utils/unauthorizedCall";

export const deleteSpotUser = async (token, spotId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/spot/${spotId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })

    unauthorizedCall(res);
    if (res.ok) {
      // risposta con status 2xx
      console.log("Cancellazione avvenuta con successo");
      return true;
    }
    else {
      // errore dal server
      const errorText = await res.text();
      throw new Error("Errore nella cancellazione:", errorText);
    }




  } catch (err) {
    console.log(err)
    throw new Error("impossibile eliminare lo spot");
  }

}