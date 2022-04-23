import firebase from "firebase/app";
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBVYXZ__clxLHeN2yuv1fP5cMW4wyIYrhA",
    authDomain: "cookbook-b9b86.firebaseapp.com",
    projectId: "cookbook-b9b86",
    storageBucket: "cookbook-b9b86.appspot.com",
    messagingSenderId: "11276519586",
    appId: "1:11276519586:web:c2e68df7afce69bc13effb",
    measurementId: "G-X9BPN0WH58"
};

//  initialize firbase 
firebase.initializeApp(firebaseConfig)

// initilize services
const projectFireStore = firebase.firestore()

export { projectFireStore }