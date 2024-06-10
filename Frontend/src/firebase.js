// Import the required functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqZqfQc4MZCJQNz4XXevOtkZSZ_FBcq5c",
  authDomain: "biddingbazaartemp.firebaseapp.com",
  projectId: "biddingbazaartemp",
  storageBucket: "biddingbazaartemp.appspot.com",
  messagingSenderId: "100032960477",
  appId: "1:100032960477:web:6981f50841b48ffb764834",
  measurementId: "G-2KTSR6M63V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const firestoreApp = getFirestore(app);
const storageApp = getStorage(app);

// Export initialized services
export { auth, googleAuthProvider, serverTimestamp, firestoreApp, storageApp };
