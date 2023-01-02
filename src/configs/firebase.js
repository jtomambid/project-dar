// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { apiKey, authDomain, projectID, storageBucket, messagingSenderID, appID, measurementID } from "./config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Issue with dotenv
const firebaseConfig = {
  apiKey: "AIzaSyBx6yDGOCzm0zuePwHHX37T17wMjmzOcIY",
  authDomain: "project-dar.firebaseapp.com",
  projectId: "project-dar",
  storageBucket: "project-dar.appspot.com",
  messagingSenderId: "406207204348",
  appId: "1:406207204348:web:34ab241fd48c2cee180079",
  // measurementId: "G-K0LHBBC61V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {experimentalForceLongPolling: true, useFetchStreams: true});