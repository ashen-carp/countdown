// Countdown for Nov 14, 2025, 4:00 PM UTC-6
const targetDate = new Date('November 14, 2025 16:00:00 GMT-0600').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    document.getElementById('countdown').innerHTML = "<h2 class='done-text'>It's Time.</h2>";
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

// Add subtle background shimmer particles
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 30; i++) {
    const dot = document.createElement('div');
    dot.classList.add('particle');
    dot.style.left = Math.random() * 100 + '%';
    dot.style.top = Math.random() * 100 + '%';
    dot.style.animationDelay = (Math.random() * 5) + 's';
    container.appendChild(dot);
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();
createParticles();
