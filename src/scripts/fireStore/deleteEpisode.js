import { doc, deleteDoc, collection } from "firebase/firestore";
import { database } from "../firebaseSetup";

export async function deleteEpisode(collectionName, seriesId, seasonId, id) {
  const reference = collection(
    database,
    collectionName,
    seriesId,
    "seasons",
    seasonId,
    "episodes"
  );
  const document = doc(reference, id);
  await deleteDoc(document);

  return `updated document with id ${id}`;
}
