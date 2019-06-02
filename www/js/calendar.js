(function () {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
        var db = firebase.firestore();
         var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + '.' + mm + '.' + yyyy;
      const event_btn = document.getElementById('event_btn');
      const div_events = document.getElementById('events');

      let today_sp = document.getElementById('today');
      today_sp.innerText = today;
            $(function(){
            
            $('#datepicker').datepicker({

            dateFormat: 'dd.mm.yy', 
            
            onSelect: function(dateText, inst) {
            $("input[name='something']").val(dateText);
            
            }
        });

        });
        function events () {
            let userUID = firebase.auth().currentUser.uid;

            db.collection(userUID + 'events').doc(today).get().then(function(doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    // console.log(div_events);
                    div_events.innerHTML = "<span>" + doc.data().event +  "</span><br> "
                } else {
                    // doc.data() will be undefined in this case
                    // console.log("No such document!");
                    
                     
            }}).catch(function(error) {
                console.log("Error getting document:", error);
            });

        }
        events();

        event_btn.addEventListener('click', function (){
            let event = document.getElementById('eventName').value;
            //    console.log(event.value);
            let ev_date = document.getElementById('datepicker').value;
            // console.log(ev_date);
            let userUID = firebase.auth().currentUser.uid;
            
            // if ()
                db.collection(userUID + 'events').doc(ev_date).set({
                    "event" : event
        });

        document.getElementById('eventName').value = "";
        document.getElementById('datepicker').value = "";

        events();
            });
            
            
       

        
      
     } else {
        console.log('not logged in');
     }
   });
})();