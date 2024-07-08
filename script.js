// Initialize Bootstrap carousel
$(document).ready(function() {
    $('#videoCarousel').carousel({
        interval: 10000 // Change the interval if desired
    });

    // Load YouTube IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // This function creates an <iframe> (and YouTube player) after the API code downloads.
    var players = {};
    window.onYouTubeIframeAPIReady = function() {
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

    // Stop video when the slide changes
    $('#videoCarousel').on('slide.bs.carousel', function(event) {
        var $prevSlide = $(event.relatedTarget).prev();
        var $nextSlide = $(event.relatedTarget).next();
        var $slides = $prevSlide.add($nextSlide);

        $slides.each(function() {
            var $this = $(this);
            var $iframe = $this.find('iframe');
            var iframeID = $iframe.attr('id');

            if (players[iframeID]) {
                players[iframeID].stopVideo();
            }
        });
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
