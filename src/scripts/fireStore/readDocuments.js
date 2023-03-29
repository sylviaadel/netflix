import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebaseSetup";

export async function readDocuments(collectionName) {
  const reference = collection(database, collectionName);
  const spanshot = await getDocs(reference);
  const result = spanshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return result;
}
