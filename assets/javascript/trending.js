//Function


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
      //console.log(queryURL);

      //console.log(response);
      // storing the data from the AJAX request in the results variable
      var recipeData = response.hits;
      //console.log("No of Recipes : " + recipeData.length);

      setTrendingRecipe("eggs");
      
    });
}



function setTrendingRecipe(){
  $("#trendingRecipe").empty();

  var recipe = getTrendingDataFromApi("Eggs");
  var $card = getRecipeCard(recipe);
  $("#trendingRecipe").html($card);
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
  
  $cardInfo.html(`By ${recipeSource}`);
  $cardInfo.appendTo($card);

  $cardAction.append(`<a href='${recipeUrl}' target='_new'>${recipeLabel}</a>`);
 

  $cardAction.appendTo($card);
 
  return $card;
}


//Event Handler
$(document).ready(function(){
  setTrendingRecipe();
});