import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    "AIzaSyAu2PiH64j533utca6dpwHBAhGC8hseSbM",
  authDomain:
    "crwn-clothing-db-b3605.firebaseapp.com",
  projectId: "crwn-clothing-db-b3605",
  storageBucket:
    "crwn-clothing-db-b3605.firebasestorage.app",
  messagingSenderId: "478212611877",
  appId:
    "1:478212611877:web:0b9dbf462593ca383584cc",
  measurementId: "G-NQDZM5DZX2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopUp = () =>
  signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth
) => {
  const userDocRef = doc(
    db,
    "users",
    userAuth.uid
  );

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error creating user", error);
    }
  }

  return userDocRef;
};
