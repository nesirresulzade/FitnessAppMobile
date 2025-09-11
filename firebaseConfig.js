// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    getReactNativePersistence
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUQRDRqrUgHRoNnm11KQwMNq-M5PMwjTI",
    authDomain: "fitnessapp-344fd.firebaseapp.com",
    projectId: "fitnessapp-344fd",
    storageBucket: "fitnessapp-344fd.appspot.com",
    messagingSenderId: "898489332216",
    appId: "1:898489332216:web:1c7009a8605d706312660d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth servisini AsyncStorage persistence ilə initialize et
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;