// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASSOqGrPqfJ31XZqAcuaing2jFgtcyikA",
  authDomain: "phototag-46dd1.firebaseapp.com",
  projectId: "phototag-46dd1",
  storageBucket: "phototag-46dd1.appspot.com",
  messagingSenderId: "327417567382",
  appId: "1:327417567382:web:32c8dd7c5106ecacfe4ab7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();

export default storage;