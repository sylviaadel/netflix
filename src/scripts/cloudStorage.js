import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { cloudStorage } from "./firebaseSetup";

export async function uploadFile(file, filePath) {
  const storageRef = ref(cloudStorage, filePath);
  const snapshot = await uploadBytes(storageRef, file);

  return `Uploaded file ${snapshot}`;
}

export async function downloadFile(filePath) {
  const storageRef = ref(cloudStorage, filePath);
  const result = await getDownloadURL(storageRef);

  return result;
}
