import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "risetech-assessment.firebaseapp.com",
  databaseURL: "https://risetech-assessment-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "risetech-assessment",
  storageBucket: "risetech-assessment.appspot.com",
  messagingSenderId: "xxx",
  appId: "xxx"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

