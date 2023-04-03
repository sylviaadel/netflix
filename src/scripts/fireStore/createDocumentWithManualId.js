import { doc, collection, setDoc } from "firebase/firestore";
import { database } from "../firebaseSetup";

export async function createDocumentWithManualId(collectionName, id, data) {
  const reference = collection(database, collectionName);
  const document = doc(reference, id);

  await setDoc(document, data);

  return `created document with manual id ${id}`;
}
