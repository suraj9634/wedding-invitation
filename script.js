// 1. Open Button Click, Music & Video Trigger
const openBtn = document.getElementById('openBtn');

if (openBtn) {
  openBtn.addEventListener('click', function() {
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('wedding-music');
    const bgVideo = document.getElementById('bgVideo');

    // Start music safely
    if (bgMusic) {
      const playPromise = bgMusic.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => console.log("Audio waiting..."));
      }
    }
    
    // Start video safely (if it exists)
    if (bgVideo) {
      const vidPromise = bgVideo.play();
      if (vidPromise !== undefined) {
        vidPromise.catch(error => console.log("Video missing or waiting..."));
      }
    }

    // Hide intro screen
    if (introScreen) {
      introScreen.style.opacity = '0';
      setTimeout(() => {
        introScreen.classList.add('hidden');
      }, 1000); 
    }
    
    // Show main content
    if (mainContent) {
      mainContent.classList.remove('hidden');
    }
    
    window.scrollTo({ top: 0, behavior: 'auto' });
  });
}

// 2. Scratch-to-Reveal Logic
const canvas = document.getElementById('scratchCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  // Paint gold foil covering
  ctx.fillStyle = '#C0A062';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px Montserrat';
  ctx.fillText('Scratch here', 90, 65);

  let isDrawing = false;
  function scratch(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2, false);
    ctx.fill();
  }

  canvas.addEventListener('mousedown', () => isDrawing = true);
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mousemove', scratch);
  canvas.addEventListener('touchstart', () => isDrawing = true);
  canvas.addEventListener('touchend', () => isDrawing = false);
  canvas.addEventListener('touchmove', scratch);
}

// 3. Countdown Timer (Target: Nov 21, 2026 18:00:00)
const countdownContainer = document.getElementById('countdown');
if (countdownContainer) {
  const weddingDate = new Date('November 21, 2026 18:00:00').getTime();

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff < 0) {
      clearInterval(timer);
      return;
    }

    document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById('seconds').innerText = Math.floor((diff % (1000 * 60)) / 1000);
  }, 1000);
}
