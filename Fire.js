import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBbZFphAaM5KFzOgBbgvfqsaALuJH2hl6U",
    authDomain: "location-messaging-cd119.firebaseapp.com",
    projectId: "location-messaging-cd119",
    storageBucket: "location-messaging-cd119.appspot.com",
    messagingSenderId: "465441196600",
    appId: "1:465441196600:web:fe5af6c23ffd868ac5f4cd",
    measurementId: "G-W4SBGL7R4R"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };