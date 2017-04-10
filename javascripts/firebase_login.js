firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	window.location = "./index.html";
  } else {
  	
  }
});