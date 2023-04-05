import { doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { database } from "../firebaseSetup";

export async function updateDocument(collectionName, documentToUpdate) {
  const id = documentToUpdate.id;
  const reference = doc(database, collectionName, id);

  await updateDoc(reference, documentToUpdate);

  return `updated document with id ${id}`;
}
