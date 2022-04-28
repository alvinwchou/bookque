// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYQGev6wK9vkrde6X2LTgztMjK7DShSKc",
    authDomain: "bookque-d1db6.firebaseapp.com",
    projectId: "bookque-d1db6",
    storageBucket: "bookque-d1db6.appspot.com",
    messagingSenderId: "88840177717",
    appId: "1:88840177717:web:271cf91c28b0c1424b497c"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;