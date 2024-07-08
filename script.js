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
            var iframeID = $(this).attr('id');
            players[iframeID] = new YT.Player(iframeID);
        });

        // Stop video when the slide changes
        $('#videoCarousel').on('slide.bs.carousel', function(event) {
            var $prevSlide = $(event.from);
            var prevId = $prevSlide.find('iframe').attr('id');
            if (players[prevId]) {
                players[prevId].stopVideo();
            }
        });
    };
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
