// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD24huFpSlGTiGErMjxopoIUTgzxZX646k",
    authDomain: "sitebocaboca.firebaseapp.com",
    projectId: "sitebocaboca",
    storageBucket: "sitebocaboca.appspot.com",
    messagingSenderId: "201469288781",
    appId: "1:201469288781:web:65907e40ce487f4dedd704"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();