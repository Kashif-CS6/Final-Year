import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDk5y9GP2X_5i2jmnfby8gX16mCqMSgOLM",
  authDomain: "campaign-4e02d.firebaseapp.com",
  projectId: "campaign-4e02d",
  storageBucket: "campaign-4e02d.appspot.com",
  messagingSenderId: "560384538060",
  appId: "1:560384538060:web:f4699af78c9c03995ed969"
};


const app = initializeApp(firebaseConfig);
const apist=getStorage(app)
export default apist