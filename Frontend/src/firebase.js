// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqZqfQc4MZCJQNz4XXevOtkZSZ_FBcq5c",
  authDomain: "biddingbazaartemp.firebaseapp.com",
  projectId: "biddingbazaartemp",
  storageBucket: "biddingbazaartemp.appspot.com",
  messagingSenderId: "100032960477",
  appId: "1:100032960477:web:6981f50841b48ffb764834",
  measurementId: "G-2KTSR6M63V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export { auth, googleAuthProvider };