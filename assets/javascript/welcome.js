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

var database = firebase.database();
var userName = localStorage.getItem("mpUserName");
var favsRef = database.ref("/" + userName + "/favs");
var prefRef = database.ref("/" + userName + "/pref");

var preferenceKey = "";

//Global Variables
var diet = [];
var allergies = [];

// Functions

function getRecipes(food) {
  // Constructing a queryURL using the food name
  var queryURL = "https://api.edamam.com/search?q=" +
    food + "&app_id=669cdf00" + "&app_key=ddf1ac17ccf1eb1b54bf9cb20d749a65";

  // Performing an AJAX request with the queryURL
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .then(function (response) {

      for (var i = 0; i < diet.length; i++) {
        queryURL = queryURL + "&diet=" + diet[i];
      }

      for (var i = 0; i < allergies.length; i++) {
        queryURL = queryURL + "&excluded=" + allergies[i];
      }

      //console.log(queryURL);
      //console.log(response);

      // storing the data from the AJAX request in the results variable
      var recipeData = response.hits;
      displayRecipes(recipeData);

    });
}

function displayRecipes(recipeData) {
  $("#recipes").empty();
  // Looping through each result item
  for (var i = 0; i < recipeData.length; i++) {
    var $card = getRecipeCard(recipeData[i]);
    var $cardDiv = $("<div>").addClass("col s12 m4").append($card);
    $("#recipes").append($cardDiv);
  }
}

function getRecipeCard(recipe) {

  var recipeLabel = recipe.recipe.label;
  var recipeImage = recipe.recipe.image;
  var recipeSource = recipe.recipe.source;
  var recipeUrl = recipe.recipe.url;

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
  $cardAction.append(`<a href="#"><i class="fas fa-heart favIcon" data-url='${recipeUrl}' data-title='${recipeLabel}'></i></a>`);

  $cardAction.appendTo($card);

  return $card;
}

//Parsing User Name from Email-id
function getUserNameFromEmail(email) {
  var ind = email.indexOf("@");
  var uName = email.substr(0, ind);
  return uName;
}

//Adds the favorite recipes as Chips
function addToFavorites(favRecipe) {
  var favUrl = favRecipe.val().url;
  var favTitle = favRecipe.val().title;
  var favKey = favRecipe.key;
  // Added as chips
  $("#favs").append(`<div class="chip"><a href="${favUrl}" target="new">${favTitle}</a><i class="close material-icons" data-key='${favKey}'>close</i></div>`);
}

// Checks to see if the preference is an allergy/diet 
// Used in Query and to set in page
function setPreferencesToCheck(prefObj) {
  var excludesArr = ['peanuts', 'shellfish', 'dairy', 'soy', 'gluten', 'eggs'];
  var dietArr = ['low-carb', 'balanced', 'high-protein', 'high-fiber', 'low-fat', 'low-sodium'];

  // Clear Values displayed
  $("#dietSpan").text("None");
  $("#allergiesSpan").text("None");

  for (var key in prefObj) {

    if (prefObj[key] === true) {

      if (excludesArr.includes(key)) {
        //add in global excludes array
        allergies.push(key);
        if ($("#allergiesSpan").text() === "None") {
          $("#allergiesSpan").text(camelize(key));
        } else {
          $("#allergiesSpan").append(", " + camelize(key));
        }

      } else if (dietArr.includes(key)) {
        //add in global diet array
        diet.push(key);
        if ($("#dietSpan").text() === "None") {
          $("#dietSpan").text(camelize(key));
        } else {
          $("#dietSpan").append(", " + camelize(key));
        }
      }
    }
  }
}

//Function to camelCase strings
function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toUpperCase() : match.toUpperCase();
  });
}

//Function to get all preferences from Form
function getAllDetails() {

  var chks = $('input[type="checkbox"]');
  var allCb = {};

  for (var i = 0; i < chks.length; i++) {
    if (chks[i].checked) {
      allCb[chks[i].id] = true;
    } else {
      allCb[chks[i].id] = false;
    }
  }

  return allCb;
}

// Sets the form with the preference from Db
function setPreferences(prefObj) {
  for (var key in prefObj) {
    if (prefObj[key] === true) {
      $("#" + key).attr("checked", true);
    }
  }
}

//Listeners
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var userName = getUserNameFromEmail(user.email);
    localStorage.setItem("mpUserName", userName);
    $("#loggedUser").text(camelize(userName));
  } else {
    //console.log("Not a logged in User");
    // No user is signed in.
  }
});

// Listeners

// Check for Preferences in firebase
prefRef.on("child_added", function (prefSnapshot) {
  //Set the key, as global var for update
  preferenceKey = prefSnapshot.key;

  setPreferencesToCheck(prefSnapshot.val());
  setPreferences(prefSnapshot.val());
});

// Check for Preferences Updated in firebase
prefRef.on("child_changed", function (prefSnapshot) {
  //Set the key, as global var for update
  preferenceKey = prefSnapshot.key;

  setPreferencesToCheck(prefSnapshot.val());
  setPreferences(prefSnapshot.val());
});


//Onload get Favs
favsRef.on("child_added", function (favSnapshot) {
  addToFavorites(favSnapshot);
});

//Event handlers
$(document).ready(function () {
  // Logout
  $("#logout").on("click", function () {
    firebase.auth().signOut();
  })

  //Search Recipes
  $("#searchbyIng").on("click", function () {
    event.preventDefault();
    $("#errorMsg").text("");
    var ing = $("#ingredient").val().trim();
    if (ing === "") {
      $("#errorMsg").text("Please enter an ingredient");
    } else {
      $("#ingredient").val("");
      getRecipes(ing);
    }
  });

  // Add to Favorites
  $(document).on("click", ".favIcon", function () {
    var recipeUrl = $(this).attr("data-url");
    var recipeTitle = $(this).attr("data-title");
    var favData = {
      title: recipeTitle,
      url: recipeUrl
    };
    favsRef.push(favData);
  });

  //Delete Favorites
  $(document).on("click", ".close", function () {
    var favKey = $(this).attr("data-key");
    var favItem = database.ref("/" + userName + "/favs/" + favKey);
    favItem.remove();
  });

  //Save or Update Preferences
  $("#pref").on("click", function () {
    var prefData = getAllDetails();
    if (preferenceKey === "") {
      prefRef.push(prefData);
    } else {
      database.ref("/" + userName + "/pref/" + preferenceKey).update(prefData);
    }
    $("#prefMessage").text("Preferences Saved.");
  });

  ////Clear the Saved message
  $("#pref_close").on("click", function () {
    $("#prefMessage").text("");
  });

});