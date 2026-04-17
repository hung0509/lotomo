import { signInWithCustomToken } from "firebase/auth";
import { auth } from "./FirebaseConfig";

export const initFirebaseAuth = async (accessToken) => {
  try {
    // 🔥 nếu đã login rồi thì bỏ qua
    if (auth.currentUser) {
      console.log("Firebase already logged in");
      return;
    }

    await signInWithCustomToken(auth, accessToken);

    console.log("🔥 Firebase login success");
  } catch (err) {
    console.error("❌ Firebase login failed:", err);
  }
};