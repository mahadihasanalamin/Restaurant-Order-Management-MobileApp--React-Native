// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhnFU7eXk5rawDy07op-xZcTufqh4xRvA",
  authDomain: "restaurantpickup-6d5ee.firebaseapp.com",
  projectId: "restaurantpickup-6d5ee",
  storageBucket: "restaurantpickup-6d5ee.appspot.com",
  messagingSenderId: "657975530065",
  appId: "1:657975530065:web:60f79aa07a4f89caaf5e70"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});
export const setdb = getFirestore(app);
export const storage = getStorage(app);