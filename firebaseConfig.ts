import { initializeApp, FirebaseApp, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "REPLACE_WITH_YOUR_API_KEY",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "better-esg.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "better-esg",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "better-esg.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "REPLACE_WITH_YOUR_SENDER_ID",
  appId: process.env.FIREBASE_APP_ID || "REPLACE_WITH_YOUR_APP_ID",
};

// Initialize Firebase defensively
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  // Check if app is already initialized to avoid duplicate error
  try {
      app = getApp();
  } catch {
      app = initializeApp(firebaseConfig);
  }
  
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase initialization failed (expected in demo/preview without valid keys). App will run in fallback mode.", error);
  // Create dummy objects to prevent crashes in imports
  // @ts-ignore
  app = {};
  // @ts-ignore
  auth = { currentUser: null }; 
  // @ts-ignore
  db = {}; 
}

export { app, auth, db };