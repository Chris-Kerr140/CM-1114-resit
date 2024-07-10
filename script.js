$(document).ready(function() {
    const videos = []; // Array to store video players

    // Load YouTube IFrame Player API asynchronously
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Function to create YouTube player instances
    function createPlayer(playerInfo) {
        return new YT.Player(playerInfo.id, {
            videoId: playerInfo.videoId,
            playerVars: {
                showinfo: 0, // Hide video information
                autoplay: 0, // Do not autoplay
                rel: 0, // Do not show related videos at the end
                controls: 1, // Show player controls
                modestbranding: 1 // Minimal branding
            },
        });
    }

    // YouTube API callback function
    window.onYouTubeIframeAPIReady = function() {
        // Initialize YouTube players for each iframe
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

    // Handle slide event to pause previous video and play current video
    $('#videoCarousel').on('slide.bs.carousel', function(event) {
        const slideTo = $(event.relatedTarget).index();
        pauseAllVideos();
        if (videos[slideTo] && videos[slideTo].player && typeof videos[slideTo].player.playVideo === 'function') {
            videos[slideTo].player.playVideo();
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

// Registration formL
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    if (validateEmail(email) && validatePassword(password)) {
      // Form data is valid, proceed with submission
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      
      fetch('https://your-serverless-function-endpoint', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        alert("Registration Successful!");
        // Optionally, redirect or perform additional actions upon successful registration
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Registration failed. Please try again later.");
        // Handle error, e.g., show error message to user
      });
      
    } else {
      // Form data is invalid, show error message
      alert("Please fill in all fields correctly");
    }
  });
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validatePassword(password) {
    return password.length >= 6;
  }
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