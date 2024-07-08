// Initialize Bootstrap carousel
$(document).ready(function() {
    $('#videoCarousel').carousel({
        interval: 10000 // Change the interval if desired
    });
});

// YouTube API script to stop videos when sliding
function onYouTubeIframeAPIReady() {
    var players = [];
    $('.carousel-item').each(function() {
        var $this = $(this);
        var id = $this.find('iframe').attr('id');
        players[id] = new YT.Player(id);
    });

    $('#videoCarousel').on('slide.bs.carousel', function(event) {
        var $currentSlide = $(event.relatedTarget);
        var $prevSlide = $(event.from);
        var prevId = $prevSlide.find('iframe').attr('id');
        if (players[prevId]) {
            players[prevId].stopVideo();
        }
    });
}

// Load YouTube API script
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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
