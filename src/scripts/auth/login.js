import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebaseSetup";

export async function login(email, password) {
  let result = { status: false, payload: "", message: "" };

  try {
    const data = await signInWithEmailAndPassword(auth, email, password);

    result = { status: true, payload: data.user.uid, message: "Logged in!" };
  } catch (error) {
    result.message = error.code;
  }

  return result;
}
