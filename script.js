$(document).ready(function() {
    const videos = [];
    let carouselPaused = false;

    // Load YouTube player
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Function to create YouTube player
    function createPlayer(playerInfo) {
        return new YT.Player(playerInfo.id, {
            videoId: playerInfo.videoId,
            playerVars: {
                showinfo: 0,
                rel: 0,
                controls: 1,
                modestbranding: 1,
                enablejsapi: 1
            },
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }

    window.onYouTubeIframeAPIReady = function() {
        $('.carousel-item').each(function(index) {
            const video = $(this).find('iframe');
            if (video.length > 0) {
                const player = createPlayer({
                    id: video.attr('id'),
                    videoId: video.data('video-id')
                });
                videos.push({ player: player, index: index });
            }
        });
    };

    // Pause all videos in the carousel
    function pauseAllVideos() {
        videos.forEach(video => {
            if (video.player && typeof video.player.pauseVideo === 'function') {
                video.player.pauseVideo();
            }
        });
    }


    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING && !carouselPaused) {
            $('#videoCarousel').carousel('pause');
            carouselPaused = true;
        } else if (carouselPaused && (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED)) {
            $('#videoCarousel').carousel('cycle');
            carouselPaused = false;
        }
    }

    $('#videoCarousel').on('slide.bs.carousel', function(event) {
        pauseAllVideos();
        const slideTo = $(event.relatedTarget).index();
        if (carouselPaused) {
            $('#videoCarousel').carousel('pause');
        }
        if (videos[slideTo] && videos[slideTo].player && typeof videos[slideTo].player.playVideo === 'function') {
            videos[slideTo].player.playVideo();
        }
    });

    // Buttonevents to change carousel
    $('#btnPrev').click(function() {
        $('#videoCarousel').carousel('prev');
    });

    $('#btnNext').click(function() {
        $('#videoCarousel').carousel('next');
    });
});


// Registration form

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

document.getElementById("registrationForm").addEventListener("submit", function(event) {
    console.log("form submission attempted");
    event.preventDefault();
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (validateEmail(email) && validatePassword(password)) {
        alert("Thank you for registering!, to unregister please enter your details again and click unregister");
    } else {
        alert("Please fill in all fields correctly");
    }
});

document.getElementById("unregisterButton").addEventListener("click", function() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email !== "" && password !== "") {
        alert("You have been unregistered.");
    } else {
        alert("Please enter your email and password to unregister.");
    }
});

// Product gallery click event
let products = document.getElementsByClassName("product");
for (let product of products) {
    product.addEventListener("click", function() {
        alert("Product selected: " + this.alt);
    });
}
function showAlert(productName) {
    alert('Product selected: ' + productName);
}