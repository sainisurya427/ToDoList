// src/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Add Firestore import

const firebaseConfig = {
  apiKey: "AIzaSyBmWOBGkEyh8GuSpXp2jedkQIpcM7kVa4I",                // Replace with your actual API key
  authDomain: "your-project-id.firebaseapp.com", // Replace with your project's authDomain
  projectId: "todolist-c570c",          // Replace with your project ID
  storageBucket: "your-project-id.appspot.com",  // Replace with your storage bucket
  messagingSenderId: "your-sender-id",   // Replace with your messaging sender ID
  appId: "your-app-id",                  // Replace with your app ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(firebaseApp);

// Initialize Firestore and export it
const db = getFirestore(firebaseApp);

export { auth, db }; // Export both auth and db
