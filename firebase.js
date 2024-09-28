// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAnalytics } from "firebase/analytics"; // Optional if you're using Analytics
import { getStorage } from "firebase/storage"; // Import Firebase Storage
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8zMBSwadavMW_BdqizhzuuvGtzIXZZqk",
  authDomain: "bitnbuild-79172.firebaseapp.com",
  projectId: "bitnbuild-79172",
  storageBucket: "bitnbuild-79172.appspot.com",
  messagingSenderId: "242129827543",
  appId: "1:242129827543:web:cd51d9acf30f42319ca292",
  measurementId: "G-PX85FYMMSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optionally initialize Analytics
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app); // Add Firestore initialization

// Initialize Storage
const storage = getStorage(app); // Initialize storage

const auth = getAuth(app);


export { auth, db, storage }; // Export Firestore and Storage instances
