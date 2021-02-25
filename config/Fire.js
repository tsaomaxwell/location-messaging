import firebase from 'firebase';

let firebaseConfig = {
  apiKey: "AIzaSyBbZFphAaM5KFzOgBbgvfqsaALuJH2hl6U",
  authDomain: "location-messaging-cd119.firebaseapp.com",
  projectId: "location-messaging-cd119",
  storageBucket: "location-messaging-cd119.appspot.com",
  messagingSenderId: "465441196600",
  appId: "1:465441196600:web:fe5af6c23ffd868ac5f4cd",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export db to access firestore
export const db = firebase.firestore();
