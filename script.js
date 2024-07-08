$(document).ready(function() {
    var players = {}; // To store YouTube players

    // Load YouTube IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Function to initialize YouTube players
    window.onYouTubeIframeAPIReady = function() {
        console.log('YouTube API ready');

        // Assign unique IDs to iframes and initialize players
        $('.carousel-item iframe').each(function(index) {
            var iframeID = 'video' + (index + 1);
            $(this).attr('id', iframeID);
            console.log('Initializing player for iframe ID:', iframeID);
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
    };

    // Function called when each player is ready
    function onPlayerReady(event) {
        console.log('Player ready:', event.target.getIframe().id);
    }

    // Handle slide event to pause previous video
    $('#videoCarousel').on('slide.bs.carousel', function(event) {
        console.log('Slide event triggered');
        var activeSlide = $('.carousel-item.active iframe')[0];
        if (activeSlide) {
            var activeIframeID = activeSlide.id;
            if (players[activeIframeID] && typeof players[activeIframeID].pauseVideo === 'function') {
                console.log('Pausing video:', activeIframeID);
                players[activeIframeID].pauseVideo();
            }
        }
    });

    // Handle slid event to play the current video
    $('#videoCarousel').on('slid.bs.carousel', function(event) {
        console.log('Slid event triggered');
        var currentSlide = $('.carousel-item.active');
        var iframe = currentSlide.find('iframe')[0];
        if (iframe) {
            var iframeID = iframe.id;
            if (players[iframeID] && typeof players[iframeID].playVideo === 'function') {
                console.log('Playing video:', iframeID);
                players[iframeID].playVideo();
            }
        }
    });

    // Button click events to manually control carousel slides
    $('#btnPrev').click(function() {
        console.log('Prev button clicked');
        $('#videoCarousel').carousel('prev');
    });

    $('#btnNext').click(function() {
        console.log('Next button clicked');
        $('#videoCarousel').carousel('next');
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