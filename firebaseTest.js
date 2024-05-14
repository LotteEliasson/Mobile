// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFr6IQHjAvfwB8ZV54YcIIc3THV5tPxqM",
  authDomain: "test-ca428.firebaseapp.com",
  projectId: "test-ca428",
  storageBucket: "test-ca428.appspot.com",
  messagingSenderId: "408500783729",
  appId: "1:408500783729:web:3c8ac8cd0c011c08ffe9d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
const storage = getStorage(app)
export { app, database, storage }