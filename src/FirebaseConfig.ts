import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYP1A9K8w983WhZvDxl20zfu-g4QxCVoY",
  authDomain: "dare-accounts-test.firebaseapp.com",
  projectId: "dare-accounts-test",
  storageBucket: "dare-accounts-test.appspot.com",
  messagingSenderId: "535428778213",
  appId: "1:535428778213:web:1d144f456819706a1fec0c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
