import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

export const uploadImageToCloudinary = async (imageFile) => {

  // Funzione per ridimensionare l'immagine mantenendo proporzioni
  const resizeImage = (file, maxWidth = 1024, maxHeight = 1024) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Mantieni proporzioni
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          file.type,
          0.8 // qualità compressione
        );
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  // Ridimensiona l'immagine
  const resizedImage = await resizeImage(imageFile);

  const formData = new FormData();
  formData.append("file", resizedImage);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "spot-utenti");

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData
      });

    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.error("Errore durante l'upload su Cloudinary:", err);
    throw new Error("Upload fallito");
  }
}
