firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
  	window.location = "./login.html";
  }
});