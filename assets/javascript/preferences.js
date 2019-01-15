
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
var userRef = database.ref("/"+userName+"/pref");

var userName = "";
var favoriteIngredients = [];
var allergy = [];
var diet = [];

//Function

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

function getUserNameFromEmail(email){
  var ind = email.indexOf("@");
  var uName = email.substr(0,ind);
  return uName;
}

$("#pref").on("click", function getChcked(){
  var prefDetails = getDetails();
  
  var prefData = {prefDetails};
  console.log(prefData);
  
  userRef.push(prefData);
//  document.getElementById("myForm").reset();

})


//   function writeUserData(userId, name, email, imageUrl) {
//     firebase.database().ref('users/' + userId).set({
//       username: name,
//       email: email,
//       profile_picture : imageUrl
//     });
//   }

 
// }

  // // Initial Values
  // var name = "";
  // var email = "";
  // var age = 0;
  // var comment = "";

  // // Capture Button Click
  // $("#add-user").on("click", function (event) {
  //   // Don't refresh the page!
  //   event.preventDefault();

  //   // YOUR TASK!!!
  //   // Code in the logic for storing and retrieving the most recent user.
  //   // Don't forget to provide initial data to your Firebase database.
  //   name = $("#name-input").val().trim();
  //   email = $("#email-input").val().trim();
  //   age = $("#age-input").val().trim();
  //   comment = $("#comment-input").val().trim();

  //   database.ref().set({
  //     name: name,
  //     email: email,
  //     age: age,
  //     comment: comment
  //   });

  // });

  //     // Firebase watcher + initial loader HINT: .on("value")
  //     database.ref().on("value", function(snapshot) {

  //       // Log everything that's coming out of snapshot
  //       console.log(snapshot.val());
  //       console.log(snapshot.val().name);
  //       console.log(snapshot.val().email);
  //       console.log(snapshot.val().age);
  //       console.log(snapshot.val().comment);
  
  //       // Change the HTML to reflect
  //       $("#name-display").text(snapshot.val().name);
  //       $("#email-display").text(snapshot.val().email);
  //       $("#age-display").text(snapshot.val().age);
  //       $("#comment-display").text(snapshot.val().comment);
  
  //       // Handle the errors
  //     }, function(errorObject) {
  //       console.log("Errors handled: " + errorObject.code);
  //     });
