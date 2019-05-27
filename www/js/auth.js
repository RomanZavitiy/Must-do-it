  (function () {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAy9U-DI5_Auunvv6FpJBk0ap6-HMj7t7Q",
      authDomain: "must-do-it-app.firebaseapp.com",
      databaseURL: "https://must-do-it-app.firebaseio.com",
      projectId: "must-do-it-app",
      storageBucket: "must-do-it-app.appspot.com",
      messagingSenderId: "1044850677916",
      appId: "1:1044850677916:web:fca90e2c2ad5a636"
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

    const span_error = document.getElementById('allert_error');
    // sing in
    const promis = auth.signInWithEmailAndPassword(email, pass);
    promis.catch(e => {console.log(e.message)
      
      if(e.message == 'There is no user record corresponding to this identifier. The user may have been deleted.') 
      {span_error.textContent = e.message;}
      if (e.message == 'The password is invalid or the user does not have a password.') {
        span_error.textContent = e.message;
      }
    });  


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

  // GOOGLE SIGN UP -----------------------------------------------------------------------------------

  const google_btn = document.getElementById('google_btn');
  

  google_btn.addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider).then(function() {
      return firebase.auth().getRedirectResult();
    }).then(function(result) {
      // This gives you a Google Access Token.
      // You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      console.log(error.message);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    
    // firebase.auth().signInWithPopup(provider).then(function(result) {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   // ...
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });
  

  });
 
  // sign up with facebook
  const facebook_btn = document.getElementById('facebook_btn');

  facebook_btn.addEventListener('click', function() {

    var provider = new firebase.auth.FacebookAuthProvider();

    // firebase.auth().signInWithPopup(provider).then(function(result) {
    //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //   var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   // ...
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });

    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  });

    // FORGOT PASS LINK
    document.getElementById('forgotPass').addEventListener('click', function() {
      const auth = firebase.auth();
      let emailAddress = txtEmail.value;
  
  
      if( emailAddress == "" ) {
        $('#txtEmail').parent().attr('data-validate', 'Email is required').addClass('alert-validate');
      } else {
        auth.sendPasswordResetEmail(emailAddress).then(function() {
          // Email sent.
          console.log('sent');
          }).catch(function(error) {
          // An error happened.
          });
      }
  
    });

//add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    window.location.href="app.html";
  } else {
    console.log('not logged in');
  }
});

  }());