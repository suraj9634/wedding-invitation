// 1. Open Button Click, Music & Video Trigger
document.getElementById('openBtn').addEventListener('click', function() {
  const introScreen = document.getElementById('intro-screen');
  const mainContent = document.getElementById('main-content');
  const bgMusic = document.getElementById('wedding-music');
  const bgVideo = document.getElementById('bgVideo');

  if (bgMusic) { bgMusic.play().catch(e => console.log("Audio waiting")); }
  if (bgVideo) { bgVideo.play().catch(e => console.log("Video waiting")); }

  if (introScreen) {
    introScreen.style.opacity = '0';
    setTimeout(() => { introScreen.style.display = 'none'; }, 800); 
  }
  
  if (mainContent) {
    mainContent.classList.remove('hidden');
    mainContent.style.display = 'block';
  }
  
  window.scrollTo({ top: 0, behavior: 'auto' });
});

// 2. Functional Scroll Button Click
document.getElementById('scrollBtn').addEventListener('click', function() {
  const nextSection = document.querySelector('.card-container .card');
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  }
});

// 3. Observer for Slide-In-Left Staggered Animations
document.addEventListener("DOMContentLoaded", function() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-section').forEach(section => {
    observer.observe(section);
  });
});

// 4. Photo Galaxy Lightbox Logic (REAL SLIDING)
document.addEventListener("DOMContentLoaded", function() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return; 
  
  const lightboxTrack = document.getElementById('lightbox-track');
  // Get all images from the horizontal scrolling track
  const galleryImages = document.querySelectorAll('.gallery-grid .gallery-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  
  let currentIndex = 0;
  let imgArray = [];
  let touchstartX = 0;
  let touchendX = 0;

  // Populate the sliding track with ALL images (visible and hidden)
  galleryImages.forEach((img, index) => {
    imgArray.push(img.src);
    
    // Build image tag for sliding track
    const slideImg = document.createElement('img');
    slideImg.src = img.src;
    lightboxTrack.appendChild(slideImg);

    // Click listener on grid
    img.addEventListener('click', () => {
      currentIndex = index;
      openLightbox();
    });
  });

  function updateSlidePosition() {
    lightboxTrack.style.transform = `translateX(-${currentIndex * 100}vw)`;
  }

  function openLightbox() {
    lightbox.classList.remove('hidden');
    setTimeout(() => { lightbox.classList.add('active'); }, 10);
    document.body.style.overflow = 'hidden'; // Stop background scrolling
    updateSlidePosition();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => { lightbox.classList.add('hidden'); }, 400);
    document.body.style.overflow = 'auto'; 
  }

  function showNext() {
    if (currentIndex < imgArray.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back to start
    }
    updateSlidePosition();
  }

  function showPrev() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = imgArray.length - 1; // Loop to end
    }
    updateSlidePosition();
  }

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Touch Swipe Listeners for Mobile
  lightbox.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
  }, {passive: true});

  lightbox.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchstartX - touchendX > 50) showNext(); // Swiped Left
    if (touchendX - touchstartX > 50) showPrev(); // Swiped Right
  }
});

// 5. Falling Small Flowers Shower Animation
function triggerFlowerShower() {
  const colors = ['#ff4d4d', '#ff9933', '#ff66b2', '#cc66ff', '#33ccff', '#ffeb33', '#ffffff'];
  const totalFlowers = 120;

  for (let i = 0; i < totalFlowers; i++) {
    const flower = document.createElement('div');
    flower.classList.add('falling-flower');

    flower.style.left = Math.random() * 100 + 'vw';
    const color = colors[Math.floor(Math.random() * colors.length)];
    flower.style.color = color;

    const scale = Math.random() * 0.4 + 0.4;
    flower.style.transform = `scale(${scale})`;

    const duration = Math.random() * 3 + 2.5;
    flower.style.animationDuration = duration + 's';
    flower.style.animationDelay = Math.random() * 2 + 's';

    document.body.appendChild(flower);

    setTimeout(() => {
      flower.remove();
    }, (duration + 2) * 1000);
  }
}

// 6. Scratch-to-Reveal Logic
const canvas = document.getElementById('scratchCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  
  canvas.width = canvas.offsetWidth || 500;
  canvas.height = canvas.offsetHeight || 120;

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#e65c00');
  gradient.addColorStop(0.3, '#ffaa00');
  gradient.addColorStop(0.5, '#fff1b0');
  gradient.addColorStop(0.7, '#ffaa00');
  gradient.addColorStop(1, '#cc3300');

  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#4a1505';
  ctx.font = '500 18px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✦  SCRATCH TO REVEAL  ✦', canvas.width / 2, canvas.height / 2);

  let isDrawing = false;
  let isRevealed = false;

  function getMousePos(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    let clientX = e.clientX;
    let clientY = e.clientY;
    
    if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function checkRevealPercentage() {
    if (isRevealed) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    const totalPixels = imageData.data.length / 4;

    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) {
        transparentPixels++;
      }
    }

    const percentage = (transparentPixels / totalPixels) * 100;
    
    if (percentage > 15) {
      isRevealed = true;
      canvas.style.transition = 'opacity 0.6s ease';
      canvas.style.opacity = '0';
      
      triggerFlowerShower();

      setTimeout(() => {
        canvas.style.display = 'none';
      }, 600);
    }
  }

  function scratch(e) {
    if (!isDrawing || isRevealed) return;
    e.preventDefault();
    const pos = getMousePos(e, canvas);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 35, 0, Math.PI * 2, false);
    ctx.fill();

    checkRevealPercentage();
  }

  canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
  canvas.addEventListener('mousemove', scratch);
  window.addEventListener('mouseup', () => { isDrawing = false; });

  canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, {passive: false});
  canvas.addEventListener('touchmove', scratch, {passive: false});
  window.addEventListener('touchend', () => { isDrawing = false; });
}

// 7. Countdown Timer
const countdownContainer = document.getElementById('countdown');
if (countdownContainer) {
  const weddingDate = new Date('November 21, 2026 18:00:00').getTime();
  setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;
    if (diff > 0) {
      document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
      document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      document.getElementById('seconds').innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }
  }, 1000);
}

// 8. WhatsApp RSVP Submission Logic
const rsvpForm = document.getElementById('rsvpForm');
if (rsvpForm) {
  rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const name = document.getElementById('guestName').value;
    const attendance = document.getElementById('relation').value;
    const message = document.getElementById('guestMessage').value;
    
    // --- REPLACE WITH YOUR NUMBER ---
    const phoneNumber = "7302159008"; 
    
    const whatsappMessage = `*WISHES for Wedding!* 💍%0A%0A*Name:* ${name}%0A*Status:* ${attendance}%0A*Message:* ${message}`;
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
    window.open(whatsappURL, '_blank');
  });
}
