
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
  
  var item1 = {
    chicken:true
  };
  var item2 = {
    eggs:false
  };
  //{chicken:true,eggs:false};
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
$("#pref").on("click", function(){
  
  var prefData = getAllDetails();
  prefRef.push(prefData);

})

// Listeners
prefRef.on("child_added",function (prefSnapshot) {
  setPreferences(prefSnapshot.val());
  preferenceKey = prefSnapshot.val().key;
  console.log("preferenceKey :" + preferenceKey);
});