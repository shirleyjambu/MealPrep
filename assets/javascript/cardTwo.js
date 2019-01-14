(function($) {

$(function() {



$('.button-collapse').sideNav();

$('select').material_select();

$('.dropdown-button').dropdown();



}); // end of document ready

})(jQuery); // end of jQuery name space


  function menu_click(obj)

  {

    $('#title').html($(obj).html());

    var food = $(obj).html();

    var app_id = '669cdf00';

    var app_key = 'ddf1ac17ccf1eb1b54bf9cb20d749a65';

    var queryURL = "https://api.edamam.com/search?q=" +

      food + "&app_id=" + app_id + "&app_key=" + app_key;



    // Performing an AJAX request with the queryURL

    $.ajax({

        url: queryURL,

        method: "GET"

      })

      // After data comes back from the request

      .then(function (response) {

        console.log(queryURL);



        console.log(response);

        // storing the data from the AJAX request in the results variable

        var recipeData = response.hits;

        console.log("No of Recipes : " + recipeData.length);



        // Looping through each result item

        $('#appendDiv').empty();



        var html = '';

        for (var i = 0; i < recipeData.length; i++) {

          console.log("Inside Recipes : " + recipeData[i].recipe.image);



          html += '<div class="col s3 m3">';

          html += '<div class="card blue-grey darken-1">';

          html += '<div class="card-content white-text">';

          html += '<div class="card-image">';

          html += '<img class="content-image" src="' + recipeData[i].recipe.image + '">';

          html += '<div class="content-overlay">';

          html += '</div>';

          html += '</div>';

          html += '<span class="card-title">Ingredientline</span>';

          html += '<p style="height:225px;">' + recipeData[i].recipe.ingredientLines + '</p>';

          html += '</div>';

          html += '</div>';

          html += '</div>';







        }

        $('#appendDiv').append(html);



      });









  }