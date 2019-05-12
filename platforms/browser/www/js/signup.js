
(function () {
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBuFYodHPQNjoV6XcsxL2LX10xJG17D1ZQ",
    authDomain: "must-do-it.firebaseapp.com",
    databaseURL: "https://must-do-it.firebaseio.com",
    projectId: "must-do-it",
    storageBucket: "must-do-it.appspot.com",
    messagingSenderId: "392509090934"
  };
  firebase.initializeApp(config);

// get elements
const txtUserName = document.getElementById('txtUserName');
const txtUserEmail = document.getElementById('txtUserEmail');
const txtUserPass = document.getElementById('txtUserPass');
const txtUserPass2 = document.getElementById('txtUserPass2');

const btnSignup = document.getElementById('btnSignup');


//add sign up event
btnSignup.addEventListener('click', e => {
    
    validate();
  // get email and pass
  const email = txtUserEmail.value;
  const pass = txtUserPass.value;
  const usName = txtUserName;

  const auth = firebase.auth();

  // sing up
  const promis = auth.createUserWithEmailAndPassword(email, pass);
  promis.catch(e => console.log(e.message));  

});

//add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
  } else {
    console.log('not logged in');
  }
});

  }());