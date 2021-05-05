import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import 'firebase/storage'
const config = {
  apiKey: "AIzaSyDLt1GyT9KyK9QyhKlJXm7mWVMMq0UgKU8",
  authDomain: "stweb-store.firebaseapp.com",
  databaseURL: "https://stweb-store-default-rtdb.firebaseio.com",
  projectId: "stweb-store",
  storageBucket: "stweb-store.appspot.com",
  messagingSenderId: "886237396179",
  appId: "1:886237396179:web:aa0a4bcb3e51fdd2c12826",
  measurementId: "G-LXQFVS3TMG",
};

const firebaseConfig = firebase.initializeApp(config);

export const database = firebaseConfig.database();
export const auth = firebaseConfig.auth();
export const storage = firebaseConfig.storage();

