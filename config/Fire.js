// 1.
import firebase from 'firebase'; 
class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }
  // 2.
  observeAuth = () =>
  firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        // 4.
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  

  init = () =>
    firebase.initializeApp({
      apiKey: "AIzaSyBbZFphAaM5KFzOgBbgvfqsaALuJH2hl6U",
      authDomain: "location-messaging-cd119.firebaseapp.com",
      projectId: "location-messaging-cd119",
      storageBucket: "location-messaging-cd119.appspot.com",
      messagingSenderId: "465441196600",
      appId: "1:465441196600:web:fe5af6c23ffd868ac5f4cd",
      measurementId: "G-W4SBGL7R4R"
    });

    get ref() {
      return firebase.database().ref('messages');
    }
  
    parse = snapshot => {
      const { timestamp: numberStamp, text, user } = snapshot.val();
      const { key: _id } = snapshot;
      // 2.
      const timestamp = new Date(numberStamp);
      // 3.
      const message = {
        _id,
        timestamp,
        text,
        user,
      };
      return message;
    };
  
    off() {
      this.ref.off();
    }
  
    on = callback => {
      this.ref
        .limitToLast(20)
        .on('child_added', snapshot => callback(this.parse(snapshot)));
    };
    
  // 1.
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  // 2.
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // 3.
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      // 4.
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };
  // 5.
  append = message => this.ref.push(message);
}

Fire.shared = new Fire();
export default Fire;

