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
          if(error) {
            profImg.src = firebaseUser.photoURL;
          }
        });

        $('#userName').text(firebaseUser.displayName);
    
    } else {
      console.log('not logged in');
    }
  });
  
  document.getElementById('logOut').addEventListener('click', e => {
    firebase.auth().signOut();
    window.location.href="index.html";
  });

      }());