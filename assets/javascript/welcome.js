// Initialize Firebase
var config = {
  apiKey: "AIzaSyDu6OahnJpzNLQbl3aFDi_WssS6-uFPXGw",
  authDomain: "mealprep-6dc6e.firebaseapp.com",
  databaseURL: "https://mealprep-6dc6e.firebaseio.com",
  projectId: "mealprep-6dc6e",
  storageBucket: "mealprep-6dc6e.appspot.com",
  messagingSenderId: "1028879243201"
};
firebase.initializeApp(config);

//Listeners
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var userName = user.name?user.name:user.email;
    $("#loggedUser").text(userName);
  } else {
    console.log("NOT Logged USER");
    // No user is signed in.
  }
});

//Event handlers
$(document).ready(function(){
  $("#logout").on("click",function(){
    firebase.auth().signOut();
  })
});