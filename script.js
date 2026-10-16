// 1. Envelope Tap-to-Open Action
document.getElementById('waxSeal').addEventListener('click', () => {
  document.getElementById('envelope-screen').classList.add('hidden');
  document.getElementById('main-content').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 2. Scratch-to-Reveal Logic
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');

// Paint gold foil covering
ctx.fillStyle = '#C0A062';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = '#ffffff';
ctx.font = '16px Montserrat';
ctx.fillText('Scratch here with finger', 38, 65);

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

// 3. Countdown Timer (Target: Nov 21, 2026 18:00:00)
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
