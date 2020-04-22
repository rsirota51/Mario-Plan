import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC7ao7BVFuAF0y5BKbVR7AGQyHua5ozUkQ",
    authDomain: "robert-sirota-marioplan.firebaseapp.com",
    databaseURL: "https://robert-sirota-marioplan.firebaseio.com",
    projectId: "robert-sirota-marioplan",
    storageBucket: "robert-sirota-marioplan.appspot.com",
    messagingSenderId: "1059890817293",
    appId: "1:1059890817293:web:1dacf8ee1d263dfe0fe844",
    measurementId: "G-3JM45VVYSH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true})
//firebase.analytics();

export default firebase; 
