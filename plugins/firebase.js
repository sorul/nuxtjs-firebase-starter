import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyAffT-YHE1AvCby9ikOH6-YAPeOoQWutB4",
authDomain: "debate-ccbb9.firebaseapp.com",
databaseURL: "https://debate-ccbb9.firebaseio.com",
projectId: "debate-ccbb9",
storageBucket: "debate-ccbb9.appspot.com",
messagingSenderId: "342808151129",
appId: "1:342808151129:web:5fcc75dbcd8809a9939d48"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
