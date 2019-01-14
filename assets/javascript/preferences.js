
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

var userName = "";
var favoriteIngredients = [];
var allergy = [];
var diet = [];

$("#pref").on("click", function getChcked(){
  var form = document.getElementById('myform');
  var chks = form.querySelectorAll('input[type="checkbox"]');
  var checked = [];
  for(var i = 0; i < chks.length; i++){
      if(chks[i].checked){
          checked.push(chks[i].id);
          console.log(checked);
      }
  }
  console.log(checked.id);
  return checked;
  

})

database.ref().set (checked)
//   function writeUserData(userId, name, email, imageUrl) {
//     firebase.database().ref('users/' + userId).set({
//       username: name,
//       email: email,
//       profile_picture : imageUrl
//     });
//   }

 
// }
