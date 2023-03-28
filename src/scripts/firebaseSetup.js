import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const setup = {
  apiKey: "AIzaSyAAJs7CdOtwqqz5t5Vxq4grRmXaEHYuRCE",
  authDomain: "sylvia-tadross-netflix.firebaseapp.com",
  projectId: "sylvia-tadross-netflix",
  storageBucket: "sylvia-tadross-netflix.appspot.com",
  messagingSenderId: "1094456682320",
  appId: "1:1094456682320:web:569a13a50f224b40fb2e55",
};

const firebaseApp = initializeApp(setup);

export const database = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const cloudStorage = getStorage(firebaseApp);
