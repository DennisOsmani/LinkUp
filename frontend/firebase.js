// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC45Xdjl0tlef0LDeEtqnlARpytYb_FhRI",
  authDomain: "linkup-ee15a.firebaseapp.com",
  projectId: "linkup-ee15a",
  storageBucket: "linkup-ee15a.appspot.com",
  messagingSenderId: "489312222314",
  appId: "1:489312222314:web:8ca801d08241b538fc1e13",
  measurementId: "G-DR6XW4HWDX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
