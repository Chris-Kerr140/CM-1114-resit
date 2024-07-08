$(document).ready(function() {
    // Load YouTube IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var players = {}; // To store YouTube players

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
            interval: 10000, // Change the interval if desired
            wrap: false // Prevent carousel from wrapping
        });
    };

    function onPlayerReady(event) {
        // Optional: Play first video when player is ready
        // event.target.playVideo();
    }

    // Pause all videos when the slide changes
    $('#videoCarousel').on('slide.bs.carousel', function(event) {
        var $prevSlide = $(event.relatedTarget).prev();
        var $nextSlide = $(event.relatedTarget).next();
        var $slides = $prevSlide.add($nextSlide);

        $slides.each(function() {
            var $this = $(this);
            var $iframe = $this.find('iframe');
            var iframeID = $iframe.attr('id');

            if (players[iframeID]) {
                players[iframeID].pauseVideo();
            }
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
