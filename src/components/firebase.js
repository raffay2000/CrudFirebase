import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// import {addDoc,collection} from 'firebase/firestore';
const firebase = {
  apiKey: "AIzaSyCqUnmDuQ9cZApnCXtJeT3zdjcs5cf8XRc",
  authDomain: "crudoperations-4c8fd.firebaseapp.com",
  projectId: "crudoperations-4c8fd",
  storageBucket: "crudoperations-4c8fd.appspot.com",
  messagingSenderId: "696613004753",
  appId: "1:696613004753:web:947be8297bb24394acecf0"
};
export const app = initializeApp(firebase);
export const authentication = getAuth(app)
export const db = getFirestore(app)