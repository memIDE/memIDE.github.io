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
   var title = "first_title";
   var body = "first_body";
   var userId = firebase.auth().currentUser.uid;
   writeNewFunc(userId, "Anonymus", title, body);

}

function getFunc(startString, callback){
    var title = "first_title";

    var userId = firebase.auth().currentUser.uid;
    var ref =  firebase.database().ref('/user-functions/' + userId);
    var jsonArray = [];
    ref.orderByChild("title").startAt(startString).on("child_added", function(snapshot) {
      jsonArray.push(snapshot.val());
    });
    //console.log(jsonArray);
    console.log("in db");
         console.log(jsonArray);

          

    callback(jsonArray);
}

function importFunc(){
    
}