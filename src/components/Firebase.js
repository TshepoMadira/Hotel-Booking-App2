
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";





const firebaseConfig = {
  apiKey: "AIzaSyDx6iyqjlftUat-CcGAADRLy-SeCvjFEJ8",
  authDomain: "hotel-booking-app2.firebaseapp.com",
  projectId: "hotel-booking-app2",
  storageBucket: "hotel-booking-app2.appspot.com",
  messagingSenderId: "35359080783",
  appId: "1:35359080783:web:17f524038fa0f5d9e6453a",
  measurementId: "G-Z6T2S4Y5VR"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage();

export {app, auth, db, storage};
