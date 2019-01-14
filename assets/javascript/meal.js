// Initialise Variables
var loggedIn = false;

//Intialise DB & Auth
var config = {
  apiKey: "AIzaSyDu6OahnJpzNLQbl3aFDi_WssS6-uFPXGw",
  authDomain: "mealprep-6dc6e.firebaseapp.com",
  databaseURL: "https://mealprep-6dc6e.firebaseio.com",
  projectId: "mealprep-6dc6e",
  storageBucket: "mealprep-6dc6e.appspot.com",
  messagingSenderId: "1028879243201"
};
firebase.initializeApp(config);

var database = firebase.database();

//Functions

function checkValidUser(userName,password){
  if(userName === "a" && password === "b"){
    loggedIn = true;
  }else{
    loggedIn = false;
  }
  return loggedIn;
}



$("#login-btn").on("click",function(){
  // Authentication code in here
  var userName = $("#userName").val().trim();
  var password = $("#password").val().trim();

  loggedIn = checkValidUser(userName,password);  

  if(loggedIn){
    location.replace("preferences.html");
  }else{
    $("#message").text("Invalid");
  }
  
});


