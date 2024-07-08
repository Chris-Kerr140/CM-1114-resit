$(document).ready(function() {
    var players = {}; // To store YouTube players

    // Load YouTube IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Function to initialize YouTube players
    window.onYouTubeIframeAPIReady = function() {
        // Initialize YouTube players for each iframe
        $('.carousel-item iframe').each(function() {
            var iframeID = this.id;
            players[iframeID] = new YT.Player(iframeID, {
                events: {
                    'onReady': onPlayerReady
                }
            });
        });

        // Initialize Bootstrap carousel after YouTube API is loaded
        $('#videoCarousel').carousel({
            interval: false, // Disable automatic cycling
            wrap: true // Allow carousel to wrap
        });
    }

    // Function called when each player is ready
    function onPlayerReady(event) {
        // Optional: Play first video when player is ready
        // event.target.playVideo();
    }

    // Handle slide event to pause previous video and play current video
    $('#videoCarousel').on('slide.bs.carousel', function(event) {
        // Pause all videos before sliding
        for (var playerID in players) {
            if (players.hasOwnProperty(playerID)) {
                var player = players[playerID];
                if (typeof player.pauseVideo === 'function') {
                    player.pauseVideo();
                }
            }
        }
    });

    $('#videoCarousel').on('slid.bs.carousel', function(event) {
        // Play video in the current slide
        var currentSlide = $(event.relatedTarget);
        var iframe = currentSlide.find('iframe')[0];
        var iframeID = iframe.id;

        if (players[iframeID] && typeof players[iframeID].playVideo === 'function') {
            players[iframeID].playVideo();
        }
    });

    // Button click events to manually control carousel slides
    $('#btnPrev').click(function() {
        $('#videoCarousel').carousel('prev');
    });

    $('#btnNext').click(function() {
        $('#videoCarousel').carousel('next');
    });
});

});
// Registration form validation (assuming this script is included after the form in HTML)
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
