import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebaseSetup";

export async function createSeason(collectionName, seriesId, data) {
  const reference = collection(database, collectionName, seriesId, "seasons");
  const document = await addDoc(reference, data);
  const result = document.id;

  return result;
}
