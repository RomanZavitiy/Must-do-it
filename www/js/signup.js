
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

  // get email and pass
  const email = txtUserEmail.value;
  const pass = txtUserPass.value;
  const confPass = txtUserPass2.value;


  const auth = firebase.auth();
  let complite = 0;

  // validate -------------------------------------

  if ( txtUserEmail.value == "") {
    $('#txtUserEmail').parent().attr('data-validate', 'Email is required').addClass('alert-validate');
} else {
  if ($("#txtUserEmail").val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
    $('#txtUserEmail').parent().attr('data-validate', 'Invalid format').addClass('alert-validate');
  } else { complite++; } 
} 
if ( txtUserPass.value == "" ) {
  $('#txtUserPass').parent().addClass('alert-validate');
} else {
  if ( txtUserPass.value.length < 6 ) {
    $('#txtUserPass').parent().attr('data-validate', 'Min 6 characters').addClass('alert-validate');
  } else { complite++; }
}
if ( txtUserPass2.value == "" ) {
  $('#txtUserPass2').parent().addClass('alert-validate');
} else { if (txtUserPass.value === txtUserPass2.value) {
    complite++;
  } else {
    $('#txtUserPass2').parent().attr('data-validate', 'Not match').addClass('alert-validate');
  } 
}
// console.log(complite);

  // sing up
if (complite == 3)  { const promis = auth.createUserWithEmailAndPassword(email, pass);
  promis.catch(function (e) {
    
    if (e.message == "The email address is already in use by another account.") {
      $('#txtUserEmail').parent().attr('data-validate', 'Email is taken').addClass('alert-validate');
    }
    console.log(e.message);
  });
  $('.limiter').addClass('ds_none');
  $('.limiter2').removeClass('ds_none');
}
});

  const usName = txtUserName;
  const btnRegDone = document.getElementById('btnRegDone');
  

  btnRegDone.addEventListener('click', e => {
    user = firebase.auth().currentUser;

    //  console.log(user);
    if ( usName.value == "") {
      $('#txtUserName').parent().addClass('alert-validate');
    } 
    user.updateProfile({
      displayName: usName.value,
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
      // Update successful
      console.log('suc');
    }).catch(function(error) {
      // An error happened. 
    });
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