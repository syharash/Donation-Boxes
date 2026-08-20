import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB4kSCgdJLSCFMUdEyqT_I9xgrEFNnPulQ",
  authDomain: "ijtima-ae364.firebaseapp.com",
  projectId: "ijtima-ae364",
  storageBucket: "ijtima-ae364.appspot.com",   // corrected: should end with .appspot.com
  messagingSenderId: "843664116262",
  appId: "1:843664116262:web:b6144381ce4b92934374e7",
  measurementId: "G-HGZZGTGFZN"
};

export const app = initializeApp(firebaseConfig);
