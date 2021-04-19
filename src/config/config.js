import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyADAvMX4QiSabwBO_HlZK9h_D-Ccf8b4-o",
    authDomain: "chatapp-1948f.firebaseapp.com",
    projectId: "chatapp-1948f",
    storageBucket: "chatapp-1948f.appspot.com",
    messagingSenderId: "634000638225",
    appId: "1:634000638225:web:61b8f337ba89cde9c78cb0",
    measurementId: "G-1YW08WZZ81"
};

firebase.initializeApp(firebaseConfig);

export default firebase;