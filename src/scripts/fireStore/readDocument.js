import { doc, getDoc } from "firebase/firestore";
import { database } from "../firebaseSetup";

export async function readDocument(collectionName, documentId) {
  const reference = doc(database, collectionName, documentId);
  const document = await getDoc(reference);
  const result = { id: document.id, ...document.data() };

  return result;
}
