import { initializeApp, FirebaseApp, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Firebase web config for the "better-esg" project.
// These are client-side config values (NOT secrets): access is controlled by Firebase
// Authentication + Firestore security rules, not by hiding them. Shipping them is standard.
const firebaseConfig = {
  apiKey: "AIzaSyAfFLd8zT2L-gRWNIX81mxu1vGzHsqjaVw",
  authDomain: "better-esg.firebaseapp.com",
  projectId: "better-esg",
  storageBucket: "better-esg.firebasestorage.app",
  messagingSenderId: "342985969310",
  appId: "1:342985969310:web:9349d49709968f32fd758f",
  measurementId: "G-JMDV0J6RSR",
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