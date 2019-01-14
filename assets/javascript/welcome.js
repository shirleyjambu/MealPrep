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

//var database = firebase.database();
//var trainRef = database.ref("/favs");

// Functions

function getRecipes(food){
  // Constructing a queryURL using the food name
  var queryURL = "https://api.edamam.com/search?q=" +
  food + "&app_id=669cdf00"+ "&app_key=ddf1ac17ccf1eb1b54bf9cb20d749a65" ;
  
  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var recipeData = response.hits;
      console.log("No of Recipes : " + recipeData.length);

      displayRecipes(recipeData);
      
    });
}

function displayRecipes(recipeData){
  $("#recipes").empty();
  // Looping through each result item
  for (var i = 0; i < recipeData.length; i++) {
    console.log("Inside Display : " + recipeData[i].recipe.label);
    var $card = getRecipeCard(recipeData[i]);
    var $cardDiv = $("<div>").addClass("col s12 m4").append($card);
    $("#recipes").append($cardDiv);
  }
}

function getRecipeCard(recipe){
  
  var recipeLabel = recipe.recipe.label;
  var recipeImage = recipe.recipe.image;
  var recipeSource = recipe.recipe.source;
  var recipeUrl = recipe.recipe.url;

 /* console.log("Inside RecipeCard : " + recipeLabel);
  console.log("Recipeimage : " + recipeImage);
  console.log("Recipesource : " + recipeSource);
  console.log("Recipe url : " + recipeUrl);*/

  var $card = $("<div>").addClass("card small");
  var $cardImg = $("<div>").addClass("card-image");
  var $img = $("<img>");
  //var $spTitle = $("<span>").addClass("card-title");
  var $cardInfo = $("<div>").addClass("card-content");
  var $cardAction = $("<div>").addClass("card-action");
  
  $img.attr("src",recipeImage);
  $img.attr("alt","Alt Text");
  $img.appendTo($cardImg);
  $cardImg.appendTo($card);

  //$spTitle.text("Title").appendTo($card);

  $cardInfo.html(`By ${recipeSource}`);
  $cardInfo.appendTo($card);

  $cardAction.append(`<a href='${recipeUrl}' target='_new'>${recipeLabel}</a>`);
  $cardAction.append(`<a href="#"><i class="fas fa-heart favIcon" data-url='${recipeUrl}' data-title='${recipeLabel}'></i></a>`);

  $cardAction.appendTo($card);
 
  return $card;
}


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
  // Logout
  $("#logout").on("click",function(){
    firebase.auth().signOut();
  })

    //Search Recipes
  $("#searchbyIng").on("click",function(){
    event.preventDefault();
    
    var ing = $("#ingredient").val().trim();
    console.log("Search by Ing : " + ing);
    $("#ingredient").val("");
    
    getRecipes(ing);
   
  });

  // Add to Favorites
  $(document).on("click",".favIcon",function(){
    console.log("Add to Favorites");
    var recipeUrl = $(this).attr("data-url");
    var recipeTitle = $(this).attr("data-title");

    console.log("url & title : " + recipeUrl + " "+ recipeTitle);
  });
});