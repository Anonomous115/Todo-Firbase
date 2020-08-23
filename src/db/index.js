import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
console.log(process.env);
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_MESSAGING_SENDER_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
});

export const db = firebase.firestore();
export default app;
