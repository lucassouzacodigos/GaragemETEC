import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB28hFlCnD2M8ACbYpHLLhcblkpY-A6StU",
  authDomain: "garagemetec.firebaseapp.com",
  projectId: "garagemetec",
  storageBucket: "garagemetec.firebasestorage.app",
  messagingSenderId: "1004619613660",
  appId: "1:1004619613660:web:a152790b7e049b6124bb19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }