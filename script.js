// Countdown Timer
const targetTime = new Date("2025-11-15T00:00:00").getTime();
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = Date.now();
  const diff = targetTime - now;
  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0");
  const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
  const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
  const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Particles - enhanced interaction
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let W = window.innerWidth;
let H = window.innerHeight;

function resize() {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
}
window.addEventListener("resize", resize);
resize();

const particles = [];
const NUM = 85; // slightly more
const mouse = { x: null, y: null };

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.size = Math.random() * 2 + 0.8;
    this.speedY = Math.random() * 0.25 + 0.05;
    this.angle = Math.random() * Math.PI * 2;
    this.vx = 0;
    this.vy = 0;
  }
  update() {
    this.y -= this.speedY;
    this.x += Math.sin(this.angle) * 0.2;

    // Respawn at bottom if off top
    if (this.y < 0) this.y = H;

    // Mouse interaction - smooth swirl/repel
    if (mouse.x !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        const angle = Math.atan2(dy, dx);
        const swirl = 0.5 * Math.sin(dist / 10); // adds orbit-like swirl
        this.vx += Math.cos(angle + swirl) * force * 0.35;
        this.vy += Math.sin(angle + swirl) * force * 0.35;
      }
    }

    this.x += this.vx;
    this.y += this.vy - this.speedY * 0.3;

    this.vx *= 0.92;
    this.vy *= 0.92;

    if (this.x < 0) this.x = W;
    if (this.x > W) this.x = 0;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.shadowBlur = 4;
    ctx.shadowColor = "rgba(255,255,255,0.4)";
    ctx.fill();
  }
}

function initParticles() {
  particles.length = 0;
  for (let i = 0; i < NUM; i++) {
    particles.push(new Particle());
  }
}
initParticles();

function animate() {
  ctx.clearRect(0, 0, W, H);
  for (let p of particles) {
    p.update();
    p.draw();
  }
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});
