import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAzWPrNUQX-LMMPst0_7750O5fLTXu8oxw",
    authDomain: "e-home-pharmacy.firebaseapp.com",
    projectId: "e-home-pharmacy",
    storageBucket: "e-home-pharmacy.appspot.com",
    messagingSenderId: "78290607341",
    appId: "1:78290607341:web:ded495d40c843b1ffe40e4"
};

firebase.initializeApp(firebaseConfig);

export default firebase;