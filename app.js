
import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

// EduSync login system
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userId = document.getElementById("userId").value
      .trim()
      .toLowerCase();

    const password = document.getElementById("password").value;

    message.textContent = "Signing in...";

    try {
      // This starter version expects an email address.
      // Custom EduSync IDs need a secure ID-to-account lookup.
      if (!userId.includes("@")) {
        throw new Error(
          "Custom EduSync IDs need account setup before login."
        );
      }

      const result = await signInWithEmailAndPassword(
        auth,
        userId,
        password
      );

      const profileRef = doc(db, "users", result.user.uid);
      const profileSnap = await getDoc(profileRef);

      if (!profileSnap.exists()) {
        await signOut(auth);
        throw new Error("Account profile not found. Contact your admin.");
      }

      const profile = profileSnap.data();

      if (!["student", "parent", "teacher", "admin"].includes(profile.role)) {
        await signOut(auth);
        throw new Error("Invalid account role.");
      }

      message.textContent = `Welcome to EduSync! Role: ${profile.role}`;

      // Connect the appropriate dashboard here.
      // Firestore security rules must enforce access permissions.

    } catch (error) {
      console.error("EduSync login error:", error);
      message.textContent =
        error.code === "auth/invalid-credential"
          ? "Incorrect email or password."
          : error.message || "Login failed. Please try again.";
    }
  });
}
