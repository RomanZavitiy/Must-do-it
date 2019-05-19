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

const profImg = document.getElementById('profileImg');

    //add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      
        var storageRef = firebase.storage().ref('img/' + firebaseUser.displayName + '.jpeg');
        // console.log(storageRef);
        // var gsReference = storage.refFromURL('gs://must-do-it.appspot.com/img/photo.jpg');
        storageRef.getDownloadURL().then(function(url) {
          // console.log(url);
         profImg.src = url;
    
        }).catch(function(error) {
          // Handle any errors
          console.log(error);
        });
    
    } else {
      console.log('not logged in');
    }
  });
  
  document.getElementById('logOut').addEventListener('click', e => firebase.auth().signOut() );

      }());