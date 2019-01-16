var food = '';
if (localStorage.getItem('ingredient') != '') {
  food = localStorage.getItem('ingredient');

  var app_id = 'c44e7b73';
  var app_key = 'bdae3c56829cb3bd8fa7ff4ec1ecec55';
  var queryURL = "https://api.edamam.com/search?q=" +

    food + "&app_id=" + app_id + "&app_key=" + app_key;

  // Performing an AJAX request with the queryURL

  $.ajax({

      url: queryURL,
      method: "GET"
    })

    // After data comes back from the request

    .then(function (response) {

      // console.log(queryURL);
      // console.log(response);

      // storing the data from the AJAX request in the results variable

      var recipeData = response.hits;

      // console.log("No of Recipes : " + recipeData.length);

      // Looping through each result item

      $('#appendDiv').empty();

      var html = '';


      for (var i = 0; i < recipeData.length; i++) {

        // console.log("Inside Recipes : " + recipeData[i].recipe.image);
        html += '<div class="col s3 m3">';
        html += '<div class="card blue-grey darken-1">';
        html += '<div class="card-content white-text">';
        html += '<div class="card-image">';
        html += '<img class="content-image " src="' + recipeData[i].recipe.image + '">';
        html += '<div class="content-overlay">';
        html += '</div>';
        html += '</div>';
        html += '<span class="card-title blue-text text-darken-2"><a href="' + recipeData[i].recipe.url + '" style="color:#fff;">' +
          recipeData[i].recipe.label + '</a></span>';
        html += '<p style="height:170px;overflow-y:auto;" >' + recipeData[i].recipe.ingredientLines + '</p>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
      }
      $('#appendDiv').append(html);
      localStorage.setItem('ingredient', '');
    });



} else {

}

(function ($) {

  $(function () {

    $('.button-collapse').sideNav();
    $('select').material_select();
    $('.dropdown-button').dropdown();

  }); // end of document ready

})(jQuery); // end of jQuery name space
var foods = new Array();

function menu_click(obj) {
  food = $(obj).html();
  foods.push($(obj).html());
  var temp_html = '';
  for (var idx = 0; idx < foods.length; idx++) {
    temp_html += foods[idx];
    temp_html += "     ";
  }
  $('#title').html(temp_html);
}
$('#search_recipe').on('click', function () {



  if (food == '') {
    $("#title").html('Select Meal Type');
    return;
  }
  // console.log(foods);


  var app_id = 'c44e7b73';
  var app_key = 'bdae3c56829cb3bd8fa7ff4ec1ecec55';

  var query_string = '';


  for (var idx = 0; idx < foods.length; idx++) {
    if (idx == 0) {
      query_string += '?q=';
      query_string += foods;

    } else {
      query_string += '&q=';
      query_string += foods[idx];
    }
  }

  if (query_string == '') {
    $("#title").html("Select Meal Type")
    return;
  }

  var queryURL = "https://api.edamam.com/search" + query_string + "&app_id=" + app_id + "&app_key=" + app_key;

  // Performing an AJAX request with the queryURL

  $.ajax({

      url: queryURL,
      method: "GET"
    })

    // After data comes back from the request

    .then(function (response) {

      // console.log(queryURL);
      // console.log(response);

      // storing the data from the AJAX request in the results variable

      var recipeData = response.hits;

      // console.log("No of Recipes : " + recipeData.length);

      // Looping through each result item

      $('#appendDiv').empty();

      var html = '';

      function lineBreak() {
        var res = str.split(",").join("<br>")
        document.getElementById("demo").innerHTML = res;
      }

      for (var i = 0; i < recipeData.length; i++) {

        // console.log("Inside Recipes : " + recipeData[i].recipe.image);
        html += '<div class="col s3 m3">';
        html += '<div class="card blue-grey darken-1">';
        html += '<div class="card-content white-text">';
        html += '<div class="card-image">';
        html += '<img class="content-image " src="' + recipeData[i].recipe.image + '">';
        html += '<div class="content-overlay">';
        html += '</div>';
        html += '</div>';
        html += '<span class="card-title blue-text text-darken-2"><a href="' + recipeData[i].recipe.url + '" style="color:#fff;">' +
          recipeData[i].recipe.label + '</a></span>';
        html += '<p style="height:170px;overflow-y:auto;" id="demo">' + recipeData[i].recipe.ingredientLines + '</p>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
      }
      $('#appendDiv').append(html);
      foods = [];

    });

});