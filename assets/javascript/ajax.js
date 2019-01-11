// Hello group below is the credentials and the bare bones ajax call for our data. It looks like they send 10 results back as a default.

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

          // Looping through each result item
          for (var i = 0; i < recipeData.length; i++) {
            console.log("Inside Recipes : " + recipeData[i].recipe.label);
            
          }
        });


