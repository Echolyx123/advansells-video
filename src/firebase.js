// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxKxQtsK1YTXtuE0nIibqdICb8h-iuPGg",
  authDomain: "authenticateflash.firebaseapp.com",
  projectId: "authenticateflash",
  storageBucket: "authenticateflash.firebasestorage.app",
  messagingSenderId: "1016397797146",
  appId: "1:1016397797146:web:d3bf97086e89649e5a3ea3",
  measurementId: "G-LG1EM8YDYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { app, analytics, storage };