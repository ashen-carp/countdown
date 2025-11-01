// Countdown logic
const targetDate = new Date('November 14, 2025 16:00:00 GMT-0600').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;
  const countdownEl = document.getElementById('countdown');

  if (distance <= 0) {
    countdownEl.innerHTML = "<h2 class='done-text'>It Begins.</h2>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* --- Ember Animation --- */
const emberLayer = document.querySelector('.ember-layer');
const EMBER_COUNT = 35;

for (let i = 0; i < EMBER_COUNT; i++) {
  const ember = document.createElement('div');
  ember.classList.add('ember');
  ember.style.left = Math.random() * 100 + 'vw';
  ember.style.top = (100 + Math.random() * 30) + 'vh';
  ember.style.width = (2 + Math.random() * 4) + 'px';
  ember.style.height = ember.style.width;
  ember.style.animationDuration = (10 + Math.random() * 10) + 's';
  ember.style.animationDelay = (Math.random() * 10) + 's';
  ember.style.opacity = (0.2 + Math.random() * 0.5).toFixed(2);
  emberLayer.appendChild(ember);
}

/* --- Audio autoplay fix --- */
window.addEventListener('click', () => {
  const bgm = document.getElementById('bgm');
  if (bgm.paused) {
    bgm.play().catch(() => {});
  }
}, { once: true });
