// Initialise Variables
var loggedIn = false;

//Intialise DB & Auth

//Functions
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
  var $spTitle = $("<span>").addClass("card-title");
  var $cardInfo = $("<div>").addClass("card-content");
  var $cardAction = $("<div>").addClass("card-action");
  var $link = $("<a>");

  $img.attr("src",recipeImage);
  $img.attr("alt","Alt Text");
  $img.appendTo($cardImg);
  $cardImg.appendTo($card);

  $cardInfo.html(`By ${recipeSource}`);
  $cardInfo.appendTo($card);

  $cardAction.html(`<a href='${recipeUrl}' target='_new'>${recipeLabel}<a>`);

  $cardAction.appendTo($card);
 
  return $card;
}

function checkValidUser(userName,password){
  if(userName === "a" && password === "b"){
    loggedIn = true;
  }else{
    loggedIn = false;
  }
  return loggedIn;
}

//Event Handlers
$("#searchbyIng").on("click",function(){
  event.preventDefault();
  
  var ing = $("#ingredient").val().trim();
  console.log("Search by Ing : " + ing);
  $("#ingredient").val("");
  
  getRecipes(ing);
  

});

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


