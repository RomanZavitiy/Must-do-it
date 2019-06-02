document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log(navigator.contacts);
}
var app = {
    sendSms: function() {
        var number = document.getElementById('numberTxt').value.toString(); /* iOS: ensure number is actually a string */
        var message = document.getElementById('messageTxt').value;
        console.log("number=" + number + ", message= " + message);

        //CONFIGURATION
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without opening any other app
            }
        };

        var success = function () { return 0; };
        var error = function (e) { alert('Message Failed:' + e); };
        sms.send(number, message, options, success, error);
    }
};
function selectContact() {
   var input = document.getElementById("contactTxt").value;
   var options = new ContactFindOptions();
   options.filter = input;
   options.multiple = true;
   options.hasPhoneNumber = true; //for Android only
   fields = ["displayName", "phoneNumbers"];
   navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);
   
   function contactfindSuccess(contacts) {
       $("option").remove();
       for (var i = 0; i < contacts.length; i++) {
           var contact = $("<option></option>").text(contacts[i].displayName);
           $("#contactsList").append(contact);
           if(contacts[i].displayName===input && contacts[i].phoneNumbers) {
                $('#numberTxt').val(contacts[i].phoneNumbers[0].value);
                break;
           }
       }
   }
	
   function contactfindError(message) {
      alert('Failed: ' + message);
   }	
};

(function () {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
        var db = firebase.firestore();
        let templates = {current: []},
        templatesList = document.getElementById("fast_sms__list"),
        addNewTemplateField = document.getElementById("fast_sms__template-new");
        add_template = document.getElementById('add_template');
        
    function INIT() {

        let userUID = firebase.auth().currentUser.uid + 'sms';
        let fb_templates = [];
        firebase.firestore().collection(userUID).get()
                .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                fb_templates.push(doc.data());
                createItem(doc.data());
                });
            });
    }
    let userUID = firebase.auth().currentUser.uid;
    db.collection(userUID + 'smsstart').doc('start_temp').get().then(function(doc) {
    if (doc.exists) {
        // console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        // console.log("No such document!");
        
            let start_temps = [{templateId: doId(),
                templateContent: "Nie moge teraz rozmawiac"},
                {templateId: doId(),
                templateContent: "Nie ma mnie w domu"},
                {templateId: doId(),
                templateContent: "Jestem w pracy"}]
            for ( start_temp of start_temps) {
                createItem(start_temp);
                let tmplId = start_temp.templateId;
                let userUID = firebase.auth().currentUser.uid + 'sms';
                let str = start_temp.templateContent;
                db.collection(userUID).doc(start_temp.templateId).set({
                "templateContent": str,
                "templateId": tmplId
                
            });
        
            
            db.collection(userUID + 'start').doc('start_temp').set({
                "starttemp": "done"
            });
        }
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


    function createItem(el) {
        let item = document.createElement('li'),
            remove = document.createElement('div'),
            text = document.createElement('span');
        remove.classList.add('app__list-remove');
        remove.addEventListener('click', function () {
            removeTemplate(this);
        });
        text.classList.add('app__list-text');
        text.addEventListener('click', function () {
            useTemplate(this);
        });
        switch (el.templateState) {
            
            default:
                item.classList.add('app__list-item');
        }
        item.id = el.templateId;
        text.innerHTML = el.templateContent;
        item.appendChild(text);
        item.appendChild(remove);
        templatesList.appendChild(item);
    }

    function useTemplate(el) {
        let elem = el.parentNode,
            elemId = elem.id,
            elemState = elem;
            $('#messageTxt').val(el.textContent);
    }

    function removeTemplate(el) {
        let removeEl = el.parentNode,
            removeElId = removeEl.id,
            removeElState = removeEl.classList;
            removeEl.remove();
            let userUID = firebase.auth().currentUser.uid + 'sms';
            db.collection(userUID).doc(removeElId).delete();

    }

    function addTemplates(str) {
        let elem = {
            templateId: doId(),
            templateContent: str,
            templateState: "current"
        };
        templates.current.push(elem);
        createItem(elem);
        let tmplId = elem.templateId;
        let userUID = firebase.auth().currentUser.uid + 'sms';
        db.collection(userUID).doc(elem.templateId).set({
            "templateContent": str,
            "templateId": tmplId
            
        });
        
    }

    function doId() {
        return Math.random().toString(36).substr(2, 16);
    }

    INIT();
    add_template.addEventListener('click',function (e) {
            addTemplates(addNewTemplateField.value);
            addNewTemplateField.value = "";
     });
     } else {
        console.log('not logged in');
     }
   });
})();


