import firebase from "firebase";
//import "firebase/auth";
//import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCjtmcYFjRgETVOii3_J_QedSHwExERYI",
  authDomain: "whatsapp-clone-c34ca.firebaseapp.com",
  projectId: "whatsapp-clone-c34ca",
  storageBucket: "whatsapp-clone-c34ca.appspot.com",
  messagingSenderId: "682079412396",
  appId: "1:682079412396:web:7525aa8727f839b0be3f09",
  measurementId: "G-P2J92TJY2V"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;