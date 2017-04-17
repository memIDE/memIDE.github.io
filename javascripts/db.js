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

   firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        writeNewFunc(user.uid, "Anonymus", title, body);
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });

   
}