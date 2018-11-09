$(document).ready(function() {

    var shows = ["Family Guy", "American Horror Story", "Broad City", "Shameless", "Rick and Morty", "Friends", "Game of Thrones", "Homeland", "Big Bang Theory",
                "American Dad", "Breaking Bad",""]

        //grab shows and make button from array
        function renderButtons() {
            $("#buttondiv").empty();
            for (var i = 0; i < shows.length; i++) {
                var showbutton = $("<button>");
                showbutton.html(shows[i]);
                showbutton.addClass("show-button btn btn-light");
                showbutton.attr("data-name", shows[i]);
                $("#buttondiv").append(showbutton);
            }
        }
        // add user's additional show
        $("#add-show").on("click", function(event) {
            event.preventDefault();
            var show = $("#show-input").val().trim();
            //prevents button to be created without an input
            if(show != ("")){
            shows.push(show);
            renderButtons();
            }
        });

        //get gif from Giphy Api
        $("#buttondiv").on("click", ".show-button", function() {
            $("#gifdiv").empty();

            var tvshow = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvshow + "&limit=15&api_key=b1Nn9S5pn3lgtex55XvTgzcDJLLgu4oF";

            $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var showgifDiv = $("<div>");

                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("clickimg");
                    showgifDiv.prepend(p);
                    showgifDiv.prepend(gifImage);
                    $("#gifdiv").prepend(showgifDiv);
                }
            })
        
        })

        //animate gif or make still
        $("#gifdiv").on("click", ".clickimg", function() {

            var state = $(this).attr("data-state");
        
            if(state === "still") {
                var animate = $(this).attr("data-animate");
                $(this).attr("src", animate);
                $(this).attr("data-state", "animate");

            } else {
                var still = $(this).attr("data-still");
                $(this).attr("src", still);
                $(this).attr("data-state", "still");
            }
        
        })
        

        renderButtons();
});