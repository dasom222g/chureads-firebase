// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUrvnD4JnC6Hx82hnJ3BX5UyaXAirS2xQ",
  authDomain: "chureads.firebaseapp.com",
  projectId: "chureads",
  storageBucket: "chureads.appspot.com",
  messagingSenderId: "537776898557",
  appId: "1:537776898557:web:52ed5ae9b0ae475aa25994",
  measurementId: "G-RCZFWH25DS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app); // 우리 서비스에서 인증 서비스를 사용하겠다고 선언

export const db = getFirestore(app);
