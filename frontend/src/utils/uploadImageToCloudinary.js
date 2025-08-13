import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
import.meta.env.VITE_CLOUDINARY_CLOUD_NAME


export const uploadImageToCloudinary = async (imageFile) => {

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "spot-utenti");

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",

        body: formData

      })

    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.error("Errore durante l'upload su Cloudinary:", err);
    throw new Error("Upload fallito");
  }
}