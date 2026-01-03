import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAu2PiH64j533utca6dpwHBAhGC8hseSbM",
  authDomain: "crwn-clothing-db-b3605.firebaseapp.com",
  projectId: "crwn-clothing-db-b3605",
  storageBucket: "crwn-clothing-db-b3605.firebasestorage.app",
  messagingSenderId: "478212611877",
  appId: "1:478212611877:web:0b9dbf462593ca383584cc",
  measurementId: "G-NQDZM5DZX2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Google Authorization Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Firebase Auth Object
export const firebaseAuth = getAuth(firebaseApp);

// Sign In with Popup
export const signInWithGooglePopUp = () => signInWithPopup(firebaseAuth, googleProvider);

// Sign in with Google Redirect
export const signInWithGoogleRedirect = () => signInWithRedirect(firebaseAuth, googleProvider);

// Google Firebase Firestore Object
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());

    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating user", error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export const signInAuthUserWithEmailAndPasswordForm = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const signOutUser = async () => {
  await signOut(firebaseAuth);
};

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(firebaseAuth, callback);
};
