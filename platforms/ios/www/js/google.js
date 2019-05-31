// document.addEventListener("deviceready", onDeviceReady(), false);

// function onDeviceReady() {
//   console.log('ready!');
//   (function () {
//     // Initialize Firebase
//     var config = {
//       apiKey: "AIzaSyAy9U-DI5_Auunvv6FpJBk0ap6-HMj7t7Q",
//       authDomain: "must-do-it-app.firebaseapp.com",
//       databaseURL: "https://must-do-it-app.firebaseio.com",
//       projectId: "must-do-it-app",
//       storageBucket: "must-do-it-app.appspot.com",
//       messagingSenderId: "1044850677916",
//       appId: "1:1044850677916:web:fca90e2c2ad5a636"
//     };
//   firebase.initializeApp(config);
// // GOOGLE SIGN UP -----------------------------------------------------------------------------------

//   const google_btn = document.getElementById('google_btn');

//   google_btn.addEventListener('click', callGoogle());
  
//   var googleapi = {
//     authorize: function(options) {
//         var deferred = $.Deferred();
//          //Build the OAuth consent page URL
//         var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + $.param({
//             client_id: options.client_id,
//             redirect_uri: options.redirect_uri,
//             response_type: 'code',
//             scope: options.scope
//         });

//         //Open the OAuth consent page in the InAppBrowser
//         var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');

//         //The recommendation is to use the redirect_uri "urn:ietf:wg:oauth:2.0:oob"
//         //which sets the authorization code in the browser's title. However, we can't
//         //access the title of the InAppBrowser.
//         //
//         //Instead, we pass a bogus redirect_uri of "http://localhost", which means the
//         //authorization code will get set in the url. We can access the url in the
//         //loadstart and loadstop events. So if we bind the loadstart event, we can
//         //find the authorization code and close the InAppBrowser after the user
//         //has granted us access to their data.
//         $(authWindow).on('loadstart', function(e) {
//             var url = e.originalEvent.url;
//             var code = /\?code=(.+)$/.exec(url);
//             var error = /\?error=(.+)$/.exec(url);

//             if (code || error) {
//                 //Always close the browser when match is found
//                 authWindow.close();
//             }

//             if (code) {
//                 //Exchange the authorization code for an access token
//                 $.post('https://accounts.google.com/o/oauth2/token', {
//                     code: code[1],
//                     client_id: options.client_id,
//                     client_secret: options.client_secret,
//                     redirect_uri: options.redirect_uri,
//                     grant_type: 'authorization_code'
//                 }).done(function(data) {
//                     deferred.resolve(data);

//                     $("#loginStatus").html('Name: ' + data.given_name);
//                 }).fail(function(response) {
//                     deferred.reject(response.responseJSON);
//                 });
//             } else if (error) {
//                 //The user denied access to the app
//                 deferred.reject({
//                     error: error[1]
//                 });
//             }
//         });

//         return deferred.promise();
//     }
// };
// var accessToken;
// var UserData = null;

// function callGoogle() {
//     console.log('google');
//     //  alert('starting');
//     googleapi.authorize({
//         client_id: '1044850677916-cvk1qgad9lgu4j2jcitn02olmfagj7nr.apps.googleusercontent.com',
//         client_secret: 'AIzaSyAy9U-DI5_Auunvv6FpJBk0ap6-HMj7t7Q',
//         redirect_uri: 'http://localhost',
//         scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'
//     }).done(function(data) {
//         accessToken = data.access_token;
//         // alert(accessToken);
//         // $loginStatus.html('Access Token: ' + data.access_token);
//         console.log(data.access_token);
//         console.log(JSON.stringify(data));
//         getDataProfile();

//     });

// }

// // This function gets data of user.
// function getDataProfile() {
//     var term = null;
//     //  alert("getting user data="+accessToken);
//     $.ajax({
//         url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + accessToken,
//         type: 'GET',
//         data: term,
//         dataType: 'json',
//         error: function(jqXHR, text_status, strError) {},
//         success: function(data) {
//             var item;

//             console.log(JSON.stringify(data));
//             // Save the userprofile data in your localStorage.
//             localStorage.gmailLogin = "true";
//             localStorage.gmailID = data.id;
//             localStorage.gmailEmail = data.email;
//             localStorage.gmailFirstName = data.given_name;
//             localStorage.gmailLastName = data.family_name;
//             localStorage.gmailProfilePicture = data.picture;
//             localStorage.gmailGender = data.gender;
//         }
//     });
//     disconnectUser();
// }

// function disconnectUser() {
//     var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + accessToken;

//     // Perform an asynchronous GET request.
//     $.ajax({
//         type: 'GET',
//         url: revokeUrl,
//         async: false,
//         contentType: "application/json",
//         dataType: 'jsonp',
//         success: function(nullResponse) {
//             // Do something now that user is disconnected
//             // The response is always undefined.
//             accessToken = null;
//             console.log(JSON.stringify(nullResponse));
//             console.log("-----signed out..!!----" + accessToken);
//         },
//         error: function(e) {
//             // Handle the error
//             // console.log(e);
//             // You could point users to manually disconnect if unsuccessful
//             // https://plus.google.com/apps
//         }
//     });
// }})};
