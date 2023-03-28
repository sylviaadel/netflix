import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth, database } from "../firebaseSetup";
import { setDoc, doc } from "@firebase/firestore";

export async function createAccount(name, email, password) {
  let result = { status: false, payload: "", message: "" };

  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    result = { status: true, payload: data.user.uid, message: "User Created!" };
    const docRef = doc(database, "users", data.user.uid);

    await setDoc(docRef, {
      name: name,
      isTeacher: false,
    });
  } catch (error) {
    result.message = error.code;
  }

  return result;
}
