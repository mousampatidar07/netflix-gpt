// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB93Zm24GMzr1dVxWiB6sbW2_AwIDhjt6o",
  authDomain: "netflixgpt-34978.firebaseapp.com",
  projectId: "netflixgpt-34978",
  storageBucket: "netflixgpt-34978.firebasestorage.app",
  messagingSenderId: "982961445994",
  appId: "1:982961445994:web:011f07b3e5094d95d93e13",
  measurementId: "G-81RT20R2ZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();