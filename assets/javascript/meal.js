// Initialise Variables
var loggedIn = false;

//Intialise DB & Auth

//Functions
function checkValidUser(userName,password){
  if(userName === "a" && password === "b"){
    loggedIn = true;
  }else{
    loggedIn = false;
  }
  return loggedIn;
}

//Event Handlers
$("#login-btn").on("click",function(){
  // Authentication code in here
  var userName = $("#userName").val().trim();
  var password = $("#password").val().trim();

  loggedIn = checkValidUser(userName,password);  

  if(loggedIn){
    location.replace("preferences.html")
  }else{
    $("#message").text("Invalid");
  }
  
})