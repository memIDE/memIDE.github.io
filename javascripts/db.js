var database = firebase.database();

function writeNewFunc(uid, username, title, body) {
  // A post entry.
  var funcData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
  };

  // Get a key for a new Post.
  var newFuncKey = firebase.database().ref().child('functions').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/functions/' + newFuncKey] = funcData;
  updates['/user-functions/' + uid + '/' + newFuncKey] = funcData;

  return firebase.database().ref().update(updates);
}

function addFunc(){
   var title = document.getElementById("popup_title").value;
   var body = document.getElementById("popup_body").value;
   var userId = firebase.auth().currentUser.uid;
   writeNewFunc(userId, "Anonymus", title, body);

}

function loadFuncs(){
   var userId = firebase.auth().currentUser.uid;
   var ref =  firebase.database().ref('/user-functions/' + userId);
   

    // firebase.database().ref('/user-functions/' + userId).once('value').then(function(snapshot) {
    //   var username = snapshot.val().username;
    //   // ...
    // });
   var funcList = document.getElementById("submenu");


    ref.orderByChild("title").startAt("").on("child_added", function(snapshot) {
         var ul = document.getElementById("submenu");
        var a = document.createElement("a");
        a.href = "#";
        a.appendChild(document.createTextNode(snapshot.val().title ));
        var li = document.createElement("li");
        li.appendChild(a);
        ul.appendChild(li);
    });
   // ref.once('value', function(snapshot) {
   //    snapshot.forEach(function(childSnapshot) {

   //      var ul = document.getElementById("submenu");
   //      var a = document.createElement("a");
   //      a.href = "#";
   //      a.appendChild(document.createTextNode( snapshot.val().title ));
   //      var li = document.createElement("li");
   //      li.appendChild(a);
   //      ul.appendChild(li);
   //       console.log(childSnapshot);
   //      // ...
   //    });
   //  });
}

function getFunc(startString, callback){
    var title = "first_title";

    var userId = firebase.auth().currentUser.uid;
    var ref =  firebase.database().ref('/user-functions/' + userId);
   

    // firebase.database().ref('/user-functions/' + userId).once('value').then(function(snapshot) {
    //   var username = snapshot.val().username;
    //   // ...
    // });


    ref.orderByChild("title").startAt(startString).on("child_added", function(snapshot) {
       var jsonArray = [];
      var jsonLength = 0;
      jsonArray.push(snapshot.val());
      jsonLength = jsonLength + 1;
      callback(jsonArray, jsonLength);
    });
    //console.log(jsonArray);
    console.log("in db");
   console.log(jsonArray);
   console.log(jsonLength);

          

    
}

function onloadMethod(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    loadFuncs()
  } else {
    // No user is signed in.
  }
});
}


