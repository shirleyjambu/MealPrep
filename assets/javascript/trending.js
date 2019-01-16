//Functions
function getRecipes(event) {
  event.preventDefault();
  var ing = $("#ingredient").val().trim();
  if (ing === "") {
    $("#errorMsg").text("Please enter an ingredient");
    return false;
  }
  window.location.href = ("./recipes.html?ing=" + ing);
}


function setTrendingDataFromApi(food) {
  // Constructing a queryURL using the food name
  var queryURL = "https://api.edamam.com/search?q=" +
    food + "&app_id=c44e7b73" + "&app_key=bdae3c56829cb3bd8fa7ff4ec1ecec55";

  // Performing an AJAX request with the queryURL
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .then(function (response) {
      //console.log(queryURL);
      //console.log(response);
      // storing the data from the AJAX request in the results variable

      var $card = getRecipeCard(response.hits[0]);
      $("#trendingRecipe").append($card);

    });
}

function getRandomIngredient() {
  var ingArr = ['eggs', 'chicken', 'lamb', 'pomegranate', 'oatmeal', 'tuna', 'soup', 'beets', 'carrots', 'turnip', 'broccoli', 'cauliflower'];
  var ind = Math.floor(Math.random() * ingArr.length);
  var ing = ingArr[ind];
  return ing;
}

function setTrendingRecipe() {
  $("#trendingRecipe").empty();
  var ing = getRandomIngredient();
  setTrendingDataFromApi(ing);
}

function getRecipeCard(recipe) {

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

  var $cardInfo = $("<div>").addClass("card-content");
  var $cardAction = $("<div>").addClass("card-action");

  $img.attr("src", recipeImage);
  $img.attr("alt", "Alt Text");
  $img.appendTo($cardImg);
  $cardImg.appendTo($card);

  $cardInfo.html(`By ${recipeSource}`);
  $cardInfo.appendTo($card);

  $cardAction.append(`<a href='${recipeUrl}' target='_new'>${recipeLabel}</a>`);

  $cardAction.appendTo($card);

  return $card;
}


//Event Handler
$(document).ready(function () {
  setTrendingRecipe();
  $("#searchbyIng").on("click", getRecipes);
});