import { doc, deleteDoc } from "firebase/firestore";
import { database } from "../firebaseSetup";

export async function deleteDocument(collectionName, id) {
  const reference = doc(database, collectionName, id);
  await deleteDoc(reference);

  return `updated document with id ${id}`;
}
