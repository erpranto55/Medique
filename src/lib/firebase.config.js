import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCefTiWIYb33omoiNA_C67Cn1xnMkaVaYw",

  authDomain: "mediqueue-5eeca.firebaseapp.com",

  projectId: "mediqueue-5eeca",

  storageBucket: "mediqueue-5eeca.firebasestorage.app",

  messagingSenderId: "254670049246",

  appId: "1:254670049246:web:2e28dea2aa2a5329c0574f",

  measurementId: "G-H7YE2DRD1M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// AUTH
export const auth = getAuth(app);

export default app;
