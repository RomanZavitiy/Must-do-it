(function () {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            var db = firebase.firestore();
            // console.log(db);
            // db.collection("users").add({
            //     first: "Ada",
            //     last: "Lovelace",
            //     born: 1815
            // })
            
            let tasks = {
                    current: [],
                    done: [],
                    get allTasks() {
                        return this.current.length + this.done.length;
                    },
                    get doneTasks() {
                        return this.done.length;
                    }
                },
                tasksList = document.getElementById("app__list"),
                allTasks = document.getElementById("js-all-tasks"),
                doneTasks = document.getElementById("js-done-tasks"),
                addNewTaskField = document.getElementById("app__task-new"),
                add_tsk = document.getElementById('add_tsk'),
                userUID = firebase.auth().currentUser.uid,
                time_tsk = document.getElementById('time');
        
                function INIT() {
                    for (const item of tasks.current) {
                        createItem(item);
                    }
                    for (const item of tasks.done) {
                        createItem(item);
                    }
                    allTasks.innerHTML = tasks.allTasks;
                    doneTasks.innerHTML = tasks.doneTasks;

                    let userUID = firebase.auth().currentUser.uid;
                    // var sfDocRef = db.collection(userUID);
                    // console.log(db.collection(userUID).get());
                    let fb_tasks = [];
                    firebase.firestore().collection(userUID).get()
                      .then(querySnapshot => {
                        querySnapshot.docs.forEach(doc => {
                        fb_tasks.push(doc.data());
                        createItem(doc.data());
                      });
                    });

                    // let item = {}
                    // console.log(fb_tasks);
                    
                   
                }
            
               
            function createItem(el) {
                let item = document.createElement('li'),
                    remove = document.createElement('div'),
                    time = document.createElement('span'),
                    text = document.createElement('span');
                remove.classList.add('app__list-remove');
                remove.addEventListener('click', function () {
                    removeTask(this);
                });
                text.classList.add('app__list-text');
                text.addEventListener('click', function () {
                    doneTask(this);
                });
                switch (el.taskState) {
                    case 'done':
                        item.classList.add('app__list-item', 'app__list-item--done');
                        break;
                    default:
                        item.classList.add('app__list-item');
                }
                item.id = el.taskId;
                text.innerHTML = el.taskContent;
                time.textContent = el.taskTime;
                item.appendChild(text);
                if(time.textContent != '') {
                   item.appendChild(time);
                }
                item.appendChild(remove);
                tasksList.appendChild(item);
            }
        
            function doneTask(el) {
                let elem = el.parentNode,
                    elemId = elem.id,
                    elemState = elem.classList.contains('app__list-item--done');
                    // console.log(el.textContent);
        
                const [itemsRemove, itemsAdd] = elemState ? [tasks.done, tasks.current] : [tasks.current, tasks.done];
                elem.classList.toggle('app__list-item--done');
                for (const [index, item] of itemsRemove.entries()) {
                    if (item.taskId !== elemId) continue;
                    itemsAdd.push(item);
                    itemsRemove.splice(index, 1);
                }
                doneTasks.innerHTML = tasks.doneTasks;
            }
        
            function removeTask(el) {
                let removeEl = el.parentNode,
                    removeElId = removeEl.id,
                    removeElState = removeEl.classList.contains('app__list-item--done');
        
                removeEl.remove();
                const items = removeElState ? tasks.done : tasks.current;
                for (const [index, item] of items.entries()) {
                    if (item.taskId !== removeElId) continue;
                    items.splice(index, 1);
                }
                allTasks.innerHTML = tasks.allTasks;
                doneTasks.innerHTML = tasks.doneTasks;
                let userUID = firebase.auth().currentUser.uid;
                db.collection(userUID).doc(removeElId).delete();
            }
        
            function addTasks(str) {
                let elem = {
                    taskId: doId(),
                    taskContent: str,
                    taskState: "current",
                    taskTime: time_tsk.value
                };
                tasks.current.push(elem);
                createItem(elem);
                allTasks.innerHTML = tasks.allTasks;
               
                // let num = localStorage.length;
                // localStorage.setItem(num++, str);
                // console.log(elem.taskId);
                let tsktime = elem.taskTime;
                let tskId = elem.taskId;
                // console.log(firebase.auth().currentUser.uid);
                let userUID = firebase.auth().currentUser.uid;
        
                // if ()
                    db.collection(userUID).doc(elem.taskId).set({
                        "taskContent": str,
                        "taskTime": tsktime,
                        "taskId":tskId
            });
             
            }
        
        
            function doId() {
                return Math.random().toString(36).substr(2, 16);
            }
            
            INIT();
            
            
        
            add_tsk.addEventListener('click',function (e) {
                // if(e.keyCode === 13) {
                //     addTasks(this.value);
                //     this.value = "";
                // }
                if (addNewTaskField.value != '') 
        
                    addTasks(addNewTaskField.value);
                    addNewTaskField.value = "";
                    time_tsk.value = '';
         
            })
            let image_td = document.getElementById('big_img');
            function load_photo () {
                var storageRef = firebase.storage().ref('imgtodo/' + userUID + '.jpeg');
        // console.log(storageRef);
        // var gsReference = storage.refFromURL('gs://must-do-it.appspot.com/img/photo.jpg');
        storageRef.getDownloadURL().then(function(url) {
          // console.log(url);
         image_td.href = url;
    
        }).catch(function(error) {
          // Handle any errors
          console.log(error);
        });
            }
            load_photo();
            
            const btnCamera = document.getElementById('btnCamera');
            btnCamera.addEventListener('click', e => {
                navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
                  destinationType: Camera.DestinationType.DATA_URL });
              
              function onSuccess(imageURL) {
                  var image = document.getElementById('big_img');
                  let img_url = "data:image/jpeg;base64," + imageURL;
                  // console.log(imageURL);
                //   userLoadPhoto++;
                image.href = img_url;
    
                var storageRef = firebase.storage().ref('imgtodo/' + userUID + '.jpeg');
            
                storageRef.putString(img_url, 'data_url').then(function(snapshot) {
                  console.log('Uploaded a data_url string!');
                });
                
              }
              
              function onFail(message) {
                  alert('Failed because: ' + message);
              }

            //   load_photo();
              });
              
              


        } else {
          console.log('not logged in');
        }
      });
   
})();
