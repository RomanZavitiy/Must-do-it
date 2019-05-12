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
const txtEmail = document.getElementById('txtEmail');
const txtPass = document.getElementById('txtPass');
const btnLogin = document.getElementById('btnLogin');
// const btnSignup = document.getElementById('btnSignup');

//add login event
btnLogin.addEventListener('click', e => {
    // get email and pass
    const email = txtEmail.value;
    const pass = txtPass.value;

    const auth = firebase.auth();

    // sing in
    const promis = auth.signInWithEmailAndPassword(email, pass);
    promis.catch(e => console.log(e.message));  


    if ( txtEmail.value == "") {
        $('#txtEmail').parent().addClass('alert-validate');
    } else { 
      if ($("#txtEmail").val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        $('#txtEmail').parent().attr('data-validate', 'Invalid format').addClass('alert-validate');
      }
    }
   
    if ( txtPass.value == "" ) {
      $('#txtPass').parent().addClass('alert-validate');
  } 
});

// //add sign up event
// btnSignup.addEventListener('click', e => {
//   // get email and pass
//   const email = txtUserEmail.value;
//   const pass = txtUserPass.value;

//   const auth = firebase.auth();

//   // sing in
//   const promis = auth.createUserWithEmailAndPassword(email, pass);
//   promis.catch(e => console.log(e.message));  
  
// });

//add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
  } else {
    console.log('not logged in');
  }
});

  }());