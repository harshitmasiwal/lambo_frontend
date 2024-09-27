gsap.registerPlugin(ScrollTrigger);

// Fade-in animation for sections
gsap.utils.toArray('.gsap-fade').forEach(element => {
  gsap.from(element, {
    opacity: 0.1,
    y: 50,
    duration: 0.4,
    scrollTrigger: {
      trigger: element,
      start: "top 90%",
      toggleActions: "play none none reverse",
    }
  });
});

// Select the video and mute/unmute button
const heroVideo = document.querySelector('.background-video');
const muteToggleButton = document.getElementById('mute-toggle-btn');

// Function to toggle mute/unmute
muteToggleButton.addEventListener('click', () => {
  if (heroVideo.muted) {
    heroVideo.muted = false; // Unmute the video
    muteToggleButton.textContent = 'Mute'; // Change button text
  } else {
    heroVideo.muted = true; // Mute the video
    muteToggleButton.textContent = 'Unmute'; // Change button text
  }
});

heroVideo.muted = true;

// Function to handle video pause/play when it's in/out of the viewport
function handleVideoVisibility(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // When the video is in the viewport, play it
      heroVideo.play().catch(error => {
        console.log('Autoplay error:', error);
      });
    } else {
      // When the video is out of the viewport, pause it
      heroVideo.pause();
    }
  });
}

const observer = new IntersectionObserver(handleVideoVisibility, {
  threshold: 0.5 // Trigger when 50% of the video is visible
});

observer.observe(heroVideo);


const mediaQuery = window.matchMedia("(max-width: 700px)");

// Function to adjust layout for small screens
function handleMobileView(e) {
  if (e.matches) {
    // Width is less than 700px, adjust the video layout for smaller screens
    heroVideo.style.width = "100%"; // Make sure the video fits the screen width
    heroVideo.style.height = "auto"; // Maintain aspect ratio
    heroVideo.style.objectFit = "cover"; // Cover the screen
    heroVideo.muted = true; // Keep muted for mobile devices due to autoplay restrictions

    // You can hide the mute button on mobile if autoplay restrictions are in place
    muteToggleButton.style.display = 'none'; 
  } else {
    // Reset for screens larger than 700px
    heroVideo.style.width = "auto";
    heroVideo.style.height = "100vh"; // Keep full height for larger screens
    heroVideo.style.objectFit = "unset"; // Normal video behavior
    muteToggleButton.style.display = 'block'; // Show the mute button again
  }
}

// Listen for media query changes
mediaQuery.addEventListener("change", handleMobileView);

// Call the function initially to check the screen size
handleMobileView(mediaQuery);

