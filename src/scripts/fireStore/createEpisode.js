import { doc, collection, setDoc } from "firebase/firestore";
import { database } from "../firebaseSetup";

export async function createEpisode(
  collectionName,
  seriesId,
  seasonId,
  id,
  data
) {
  const reference = collection(
    database,
    collectionName,
    seriesId,
    "seasons",
    seasonId,
    "episodes"
  );
  const document = doc(reference, id);
  await setDoc(document, data);

  return `created document with manual id ${id}`;
}
