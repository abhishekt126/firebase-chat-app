import firebase from 'firebase/app';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAx27noNNjdKeTqJNkKkr65eYnE75w5qqM",
    authDomain: "chat-app-3cf49.firebaseapp.com",
    databaseURL: "https://chat-app-3cf49.firebaseio.com",
    projectId: "chat-app-3cf49",
    storageBucket: "chat-app-3cf49.appspot.com",
    messagingSenderId: "275377129949",
    appId: "1:275377129949:web:3b0a048678900e0ae80e34",
    measurementId: "G-EQQ9XV5YYH"
  };
  // Initialize Firebase
const appFirebase = firebase.initializeApp(firebaseConfig);

export default appFirebase;
