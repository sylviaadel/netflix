import { collection, getDocs, query } from "firebase/firestore";
import { database } from "../firebaseSetup";

export async function readSubCollection(collectionName) {
  const reference = collection(database, collectionName);
  const spanshot = await getDocs(query(reference));
  const result = spanshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return result;
}
