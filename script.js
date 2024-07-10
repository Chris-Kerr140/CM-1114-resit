$(document).ready(function() {
    const videos = [];
    let carouselPaused = false;

    // Load YouTube player
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Function to create YouTube player instances
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

    // Handle YouTube player state changes
    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING && !carouselPaused) {
            $('#videoCarousel').carousel('pause');
            carouselPaused = true;
        } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
            if (carouselPaused) {
                $('#videoCarousel').carousel('cycle');
                carouselPaused = false;
            }
        }
    }

    // Pause videos when carousel slide changes
    $('#videoCarousel').on('slide.bs.carousel', function(event) {
        const slideTo = $(event.relatedTarget).index();
        pauseAllVideos();
        if (videos[slideTo] && videos[slideTo].player && typeof videos[slideTo].player.playVideo === 'function') {
            videos[slideTo].player.playVideo();
        }
    });

    // Button events to control carousel slides
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
      alert("Thank you for registering!");
       
    } else {
      alert("Please fill in all fields correctly");
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