// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPFnKYs-HvpwhrA2sqS5j2MDGW-ICkEvY",
  authDomain: "antd-dashboard.firebaseapp.com",
  projectId: "antd-dashboard",
  storageBucket: "antd-dashboard.appspot.com",
  messagingSenderId: "587056405420",
  appId: "1:587056405420:web:b0e8b722068616e38ab809"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)