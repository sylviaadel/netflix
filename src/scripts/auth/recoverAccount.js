import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "../firebaseSetup";

export async function recoverAccount(email) {
  let result = { status: false, payload: "", message: "" };

  try {
    await sendPasswordResetEmail(auth, email);

    result = { status: true, payload: "", message: "Email Sent!" };
  } catch (error) {
    result.message = error.code;
  }

  return result;
}
