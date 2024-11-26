// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCMLACCMM91IJoPrayobYD3_kJHHXGyYxQ",
    authDomain: "y12task1pwa.firebaseapp.com",
    projectId: "y12task1pwa",
    storageBucket: "y12task1pwa.firebasestorage.app",
    messagingSenderId: "659206083230",
    appId: "1:659206083230:web:86dcd3c4f0e23111a9e18f",
    measurementId: "G-VQC3C0BDZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)
export const db = getFirestore(app);
console.log(db)


