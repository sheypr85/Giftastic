$(document).ready(function() {

    var shows = ["Family Guy", "American Horror Story", "Broad City", "Shameless", "Rick and Morty", "Friends", "Game of Thrones", "Homeland", "Big Bang Theory",
                "American Dad", "Breaking Bad"]

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
    
        $("#add-show").on("click", function(event) {
            event.preventDefault();
            var show = $("#show-input").val().trim();
            shows.push(show);
            renderButtons();
        });

        renderButtons();
});