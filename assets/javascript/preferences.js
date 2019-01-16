
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


// Create a variable to reference the database
var database = firebase.database();
var userName = localStorage.getItem("mpUserName");
var prefRef = database.ref("/"+userName+"/pref");

var preferenceKey = "";

//Functions

function getDetails(){
  var form = document.getElementById('myform');
  var chks = form.querySelectorAll('input[type="checkbox"]');
  var checked = [];
  for(var i = 0; i < chks.length; i++){
      if(chks[i].checked){
          checked.push(chks[i].id);
        }
  }
  console.log(checked);
  return checked;
}

function getAllDetails(){
  var form = document.getElementById('myform');
  var chks = form.querySelectorAll('input[type="checkbox"]');
  var allCb = {};
    
  for(var i = 0; i < chks.length; i++){
      if(chks[i].checked){
          allCb[chks[i].id] = true;
        }else{
          allCb[chks[i].id] = false;
        }
    }
  console.log(allCb);
  return allCb;
}

function setPreferences(prefObj){
  for(var key in prefObj){
    if(prefObj[key]===true){
      $("#"+key).attr("checked",true);
    }
  }
}

// Event Handlers

//Save or Update Preferences
$("#pref").on("click", function(){
  var prefData = getAllDetails();
  if(preferenceKey === ""){
    prefRef.push(prefData);
  }else{
    database.ref("/"+userName+"/pref/" + preferenceKey).update(prefData);
  }
});

// Listeners
prefRef.on("child_added",function (prefSnapshot) {
  //Set the key, as global var for update
  preferenceKey = prefSnapshot.key;
  
  setPreferences(prefSnapshot.val());
  
});