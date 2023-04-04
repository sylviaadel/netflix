import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebaseSetup";

export async function createEpisode(collectionName, seriesId, seasonId, data) {
  const reference = collection(
    database,
    collectionName,
    seriesId,
    "seasons",
    seasonId,
    "episodes"
  );
  const document = await addDoc(reference, data);
  const result = document.id;

  return result;
}
