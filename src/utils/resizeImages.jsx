import imageCompression from "browser-image-compression";

export const resizeImages = async (file) => {
  const options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 4000,
    useWebWorker: true,
  };
  const compressedFile = await imageCompression(file, options);
  return compressedFile;
}