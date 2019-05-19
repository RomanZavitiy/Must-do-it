
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
const txtUserPhoto = document.getElementById('txtUserPhoto');

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

  // next
if (complite == 3)  { const promis = auth.createUserWithEmailAndPassword(email, pass);
  promis.catch(function (e) {
    
    console.log(e.message);
    if (e.message == "The email address is already in use by another account.") {
      $('#txtUserEmail').parent().attr('data-validate', 'Email is taken').addClass('alert-validate');
    }
    // document.getElementById('limiter').classList.add('ds_none');
    // document.getElementById('limiter2').classList.remove('ds_none');
  }); 
}
complite++;
if(complite == 4) {
  console.log(complite);
  $('#limiter').addClass('ds_none');
  $('#limiter2').removeClass('ds_none');
}
});



  const usName = txtUserName;
  // const usPhoto = txtUserPhoto;
  const btnCamera = document.getElementById('btnCamera');

  const btnRegDone = document.getElementById('btnRegDone');


let userLoadPhoto = 0; 
// zrobić zdjęcia
  btnCamera.addEventListener('click', e => {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
      destinationType: Camera.DestinationType.DATA_URL });
  
  function onSuccess(imageURL) {
      var image = document.getElementById('myImg');
      image.src = "data:image/jpeg;base64," + imageURL;
      // console.log(imageURL);
      userLoadPhoto++;

  }
  
  function onFail(message) {
      alert('Failed because: ' + message);
  }
  });

// PHOTOS
const btnPhotos = document.getElementById('btnPhoto');

btnPhotos.addEventListener('click', cameraGetPicture);

function cameraGetPicture() {
  navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
     destinationType: Camera.DestinationType.DATA_URL,
     sourceType: Camera.PictureSourceType.PHOTOLIBRARY
  });

  function onSuccess(imageURL) {
     var image = document.getElementById('myImg');
     image.src = "data:image/jpeg;base64," + imageURL;
    // console.log(image.src);
    userLoadPhoto++;
  }

  function onFail(message) {
     alert('Failed because: ' + message);
  }

}
// akceptacja rejestracji
  btnRegDone.addEventListener('click', e => {
    user = firebase.auth().currentUser;

    let complit = 0;
    //  console.log(user);
    if ( usName.value == "") {
      $('#txtUserName').parent().addClass('alert-validate');
    } else {
      complit++;
    }

    // uload img to firebase
   if ( userLoadPhoto == 1) { var photoUrl = document.getElementById('myImg').src;

    
    var storageRef = firebase.storage().ref('img/' + usName.value + '.jpeg');

    storageRef.putString(photoUrl, 'data_url').then(function(snapshot) {
      console.log('Uploaded a data_url string!');
    });}
   
    
    // UPDATE PROFILE///////////////////////////////////////////////
    if (complit == 1) {
      user.updateProfile({
        displayName: usName.value
      }).then(function() {
        // Update successful
        console.log('suc');
        window.location.href="app.html";
      }).catch(function(error) {
        // An error happened. 
      });
      
    } 



  });

//add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
   
      firebaseUser.sendEmailVerification().then(function() {
        // Email sent.
        console.log('Email sent');
      }).catch(function(error) {
        // An error happened.
      });
    
 
  } else {
    console.log('not logged in');
  }
});

  }());
