
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJo2MNqvfIdZDaU1-8DIa0cIVmjY_tkrw",
  authDomain: "edusync-57295.firebaseapp.com",
  projectId: "edusync-57295",
  storageBucket: "edusync-57295.firebasestorage.app",
  messagingSenderId: "1064594895228",
  appId: "1:1064594895228:web:fa3c497096963a04d8b4f9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
