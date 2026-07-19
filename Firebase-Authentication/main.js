// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyCNQP5Pv0wuPhrLRCw2jFj4znMfmNrg1e8",
    authDomain: "authentication-e9130.firebaseapp.com",
    databaseURL: "https://authentication-e9130-default-rtdb.firebaseio.com",
    projectId: "authentication-e9130",
    storageBucket: "authentication-e9130.appspot.com",
    messagingSenderId: "387543108337",
    appId: "1:387543108337:web:3991d5bdf6d52e34db3750"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

document.getElementById('login').addEventListener('click', (e) => {
    e.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            set(ref(database, 'user/' + user.id), {
                username: username,
                email: email
            }

            )
            Swal.fire(
                'Good job!',
                'You have signed up ..',
                'success'
            )
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            Swal.fire(
                'Oh No!',
                errorMessage,
                'error'
            )
        });
}) 