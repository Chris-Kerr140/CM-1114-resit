$(document).ready(function() {
    // Load YouTube IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var players = {}; // To store YouTube players

    window.onYouTubeIframeAPIReady = function() {
        // Initialize Bootstrap carousel
        $('#videoCarousel').carousel({
            interval: 10000 // Change the interval if desired
        });

        // Initialize YouTube players for each iframe
        $('.carousel-item iframe').each(function() {
            var iframeID = this.id;
            players[iframeID] = new YT.Player(iframeID, {
                events: {
                    'onReady': onPlayerReady
                }
            });
        });
    };

    function onPlayerReady(event) {
        // Optional: Play first video when player is ready
        // event.target.playVideo();
    }

    // Pause all videos when the slide changes
    $('#videoCarousel').on('slide.bs.carousel', function(event) {
        for (var player in players) {
            if (players.hasOwnProperty(player)) {
                players[player].pauseVideo();
            }
        }
    });
});


// Registration form validation
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (email && password) {
        alert("Registration Successful!");
    } else {
        alert("Please fill in all fields");
    }
});

// Product gallery click event
let products = document.getElementsByClassName("product");
for (let product of products) {
    product.addEventListener("click", function() {
        alert("Product selected: " + this.alt);
    });
}
