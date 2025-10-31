document.addEventListener('DOMContentLoaded', () => {
  // ----------------- Variables -----------------
  const envelope = document.getElementById('envelope');
  const floatingLove = document.querySelector('.floating-love');
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  const typingText = document.getElementById('typingText');
  let isPlaying = false;

  // 🌸 Mobile Performance Mode
const isMobile = window.innerWidth < 768;

if (isMobile) {
  console.log("Mobile detected: Performance mode ON");

  // Reduce sparkle and heart frequency
  window.sparkleSpawnRate = 1200;  // slower sparkle creation
  window.heartSpawnRate = 700;     // fewer hearts per second

  // Disable or reduce background particle effects if you have any heavy ones
  document.body.classList.add("low-performance");
} else {
  window.sparkleSpawnRate = 500;   // normal sparkle frequency
  window.heartSpawnRate = 350;
}


  // ----------------- Typing Animation -----------------
  const text = "Once upon a time, in a pink little world... two hearts began to beat together 💕";
  let i = 0;
  function type() {
    if (i < text.length) {
      typingText.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 70);
    }
  }
  type();

  //--------------fade floating-love-------------------
  function fadeFloatingLove(show = true, duration = 1500) {
  floatingLove.style.transition = `opacity ${duration}ms ease-in-out`;

  if (show) {
    floatingLove.style.opacity = 1;
    floatingLove.style.animationPlayState = 'running'; // resume floating
  } else {
    floatingLove.style.opacity = 0;
    floatingLove.style.animationPlayState = 'paused'; // pause floating
  }
}

  // ----------------- Envelope Click -----------------
  envelope.addEventListener('click', () => {
  envelope.classList.toggle('open');
  document.body.style.background = "linear-gradient(135deg, #ffc1cc, #ffdde1)";
  createFloatingHearts(20);
  createSparkles(15);
  
  // Toggle floating text visibility
  if (envelope.classList.contains('open')) {
    fadeFloatingLove(false); // fade out magically
  } else {
    fadeFloatingLove(true);  // fade back in magically
  }


  if (!isPlaying) {
    fadeInMusic(bgMusic, 0.3, 3000); // fade to 20% over 4 seconds
    musicToggle.textContent = "Pause Music";
    isPlaying = true;
  }
});

  // Smooth fade in function
function fadeInMusic(audio, targetVolume = 0.2, duration = 3000) {
  audio.volume = 0;
  audio.play().catch(err => console.log("Music autoplay blocked:", err));

  const stepTime = 50; // ms per step
  const steps = duration / stepTime;
  const volumeStep = targetVolume / steps;
  let currentStep = 0;

  const fadeInterval = setInterval(() => {
    currentStep++;
    audio.volume = Math.min(targetVolume, audio.volume + volumeStep);
    if (currentStep >= steps) clearInterval(fadeInterval);
  }, stepTime);
}

// Smooth fade out function
function fadeOutMusic(audio, duration = 3000) {
  const stepTime = 50;
  const steps = duration / stepTime;
  const volumeStep = audio.volume / steps;
  let currentStep = 0;

  const fadeInterval = setInterval(() => {
    currentStep++;
    audio.volume = Math.max(0, audio.volume - volumeStep);
    if (currentStep >= steps) {
      audio.pause();
      clearInterval(fadeInterval);
    }
  }, stepTime);
}

// Updated music toggle
musicToggle.addEventListener('click', () => {
  if (!isPlaying) {
    fadeInMusic(bgMusic, 0.2, 4000); // fade in to 20% volume
    musicToggle.textContent = "Pause Music";
  } else {
    fadeOutMusic(bgMusic, 2000); // fade out over 2 seconds
    musicToggle.textContent = "Play Music";
  }
  isPlaying = !isPlaying;
});


  // ----------------- Optimized Floating Hearts -----------------
  const MAX_HEARTS = 30;
  const heartPool = [];

  function createFloatingHearts(num) {
    for (let j = 0; j < num; j++) {
      if (heartPool.length >= MAX_HEARTS) break;
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.textContent = '💖';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = (4 + Math.random() * 3) + 's';
      document.body.appendChild(heart);
      heartPool.push(heart);
      setTimeout(() => {
        heart.remove();
        heartPool.shift();
      }, 7000);
    }
  }

  // ----------------- Optimized Sparkles -----------------
  const MAX_SPARKLES = 40;
  const sparklePool = [];

  function createSparkles(num) {
    for (let j = 0; j < num; j++) {
      if (sparklePool.length >= MAX_SPARKLES) break;
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + 'vw';
      sparkle.style.top = Math.random() * 100 + 'vh';
      sparkle.style.animationDuration = (2 + Math.random() * 1) + 's';
      document.body.appendChild(sparkle);
      sparklePool.push(sparkle);
      setTimeout(() => {
        sparkle.remove();
        sparklePool.shift();
      }, 3000);
    }
  }

  // ----------------- Continuous Magical Sparkles -----------------
  const sparkleContainer = document.querySelector('.soft-sparkles');
  setInterval(() => {
    if (sparklePool.length >= MAX_SPARKLES) return;
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    const size = 4 + Math.random() * 8;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    sparkle.style.animationDuration = (4 + Math.random() * 4) + 's';
    sparkleContainer.appendChild(sparkle);
    sparklePool.push(sparkle);
    setTimeout(() => {
      sparkle.remove();
      sparklePool.shift();
    }, parseFloat(sparkle.style.animationDuration) * 1000);
  }, 200);

  // ----------------- Cursor Heart Trail (throttled) -----------------
  let lastMouse = 0;
  document.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - lastMouse < 50) return; // 20fps
    lastMouse = now;

    const heart = document.createElement('div');
    heart.className = 'cursor-heart';
    heart.style.left = e.pageX + 'px';
    heart.style.top = e.pageY + 'px';
    heart.textContent = '💖';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  });

  // ----------------- Hopping Cat Companion -----------------
  const cat = document.getElementById('catCompanion');
  cat.classList.add('hopping');
  let catX = Math.random() * (window.innerWidth - cat.offsetWidth);
  let catY = Math.random() * (window.innerHeight - cat.offsetHeight);
  let catSpeedX = 2 + Math.random() * 3;
  let catSpeedY = 1 + Math.random() * 2;
  let catPaused = false;

  function moveCat() {
    if (!catPaused) {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      catX += catSpeedX;
      catY += catSpeedY;

      if (catX + cat.offsetWidth > screenWidth || catX < 0) catSpeedX *= -1;
      if (catY + cat.offsetHeight > screenHeight || catY < 0) catSpeedY *= -1;

      cat.style.left = catX + 'px';
      cat.style.top = catY + 'px';

      // Occasionally create sparkle below cat
      if (Math.random() < 0.03) createCatSparkle(catX + cat.offsetWidth/2, catY + cat.offsetHeight);
    }
    requestAnimationFrame(moveCat);
  }

  function createCatSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'cat-sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }

  moveCat();

  // ----------------- Butterflies -----------------
  function spawnButterflies(num) {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? Math.floor(num/2) : num;
    for (let i = 0; i < count; i++) {
      const butterfly = document.createElement('div');
      butterfly.className = 'butterfly';
      butterfly.style.left = Math.random() * window.innerWidth + 'px';
      butterfly.style.top = Math.random() * window.innerHeight + 'px';
      document.body.appendChild(butterfly);

      setInterval(() => {
        butterfly.style.left = Math.random() * window.innerWidth + 'px';
        butterfly.style.top = Math.random() * window.innerHeight + 'px';
        butterfly.style.transform = `rotate(${Math.random()*60-30}deg)`;
      }, 4000 + Math.random()*3000);
    }
  }
  spawnButterflies(5);

  // ----------------- Drifting Petals -----------------
  function spawnPetals(num) {
    const container = document.querySelector('.petals');
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? Math.floor(num/2) : num;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * window.innerWidth + 'px';
      petal.style.top = Math.random() * -50 + 'px';
      petal.style.animationDuration = (8 + Math.random() * 6) + 's';
      container.appendChild(petal);

      setInterval(() => {
        petal.style.left = Math.random() * window.innerWidth + 'px';
        petal.style.top = -20 + 'px';
        petal.style.animationDuration = (8 + Math.random() * 6) + 's';
      }, (8 + Math.random() * 6) * 1000);
    }
  }
  spawnPetals(20);

  // ----------------- Twinkling Stars -----------------
  function spawnStars(num) {
    const container = document.querySelector('.stars');
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? Math.floor(num/2) : num;
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * window.innerWidth + 'px';
      star.style.top = Math.random() * window.innerHeight + 'px';
      star.style.animationDuration = (2 + Math.random() * 3) + 's';
      container.appendChild(star);
    }
  }
  spawnStars(30);
});

// Hide preloader once page is loaded
// Hide preloader after a delay
// Preloader fade and sparkles
// Preloader fade and butterflies fly away
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const butterflies = document.querySelectorAll('.preloader-butterfly');
  const sparklesContainer = document.querySelector('.preloader-sparkles');

  // Spawn sparkles continuously
  function spawnSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top  = Math.random() * window.innerHeight + 'px';
    sparklesContainer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }
  const sparkleInterval = setInterval(spawnSparkle, window.sparkleSpawnRate);

  // Keep preloader for 4 seconds, then fade out
  setTimeout(() => {
    // Trigger butterflies to fly away
    butterflies.forEach(butterfly => butterfly.classList.add('fly-away'));

    // Fade out preloader
    preloader.classList.add('hidden');

    // Stop spawning sparkles after 2s
    setTimeout(() => clearInterval(sparkleInterval), 2000);

  }, 4000);
});

// ----- Preloader Butterflies Animation -----
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const butterflies = preloader.querySelectorAll('.preloader-butterfly');
  const sparklesContainer = document.querySelector('.preloader-sparkles');

  // Spawn sparkles continuously
  function spawnSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top  = Math.random() * window.innerHeight + 'px';
    sparklesContainer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }
  const sparkleInterval = setInterval(spawnSparkle, window.sparkleSpawnRate);

  // Initialize butterfly positions and radius
  butterflies.forEach(b => {
    // Random initial position
    b.style.left = Math.random() * (window.innerWidth - 40) + 'px';
    b.style.top  = Math.random() * (window.innerHeight - 40) + 'px';

    // Random speed and direction
    b.dataset.vx = (Math.random() * 1.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1);
    b.dataset.vy = (Math.random() * 1.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1);
  });

  function moveButterflies() {
    butterflies.forEach(b => {
      let x = parseFloat(b.style.left);
      let y = parseFloat(b.style.top);
      let vx = parseFloat(b.dataset.vx);
      let vy = parseFloat(b.dataset.vy);

      x += vx;
      y += vy;

      // Bounce off edges
      if (x < 0 || x > window.innerWidth - 40) b.dataset.vx = -vx;
      if (y < 0 || y > window.innerHeight - 40) b.dataset.vy = -vy;

      b.style.left = x + 'px';
      b.style.top  = y + 'px';

      // Fluttering effect
      b.style.transform = `rotate(${Math.sin(Date.now()/200) * 15}deg) scaleY(${0.8 + 0.2 * Math.sin(Date.now()/100)})`;
      b.style.opacity = 0.6 + 0.2 * Math.sin(Date.now()/300 + x + y);
    });

    requestAnimationFrame(moveButterflies);
  }

  moveButterflies();

  // ------------------ Preloader Fade Out ------------------
  setTimeout(() => {
    butterflies.forEach(butterfly => butterfly.classList.add('fly-away'));
    preloader.classList.add('hidden');
    setTimeout(() => clearInterval(sparkleInterval), 2000);
  }, 4000);
});

// ---- Letter Text Animation ----
function revealLetterText() {
  const lines = document.querySelectorAll('.letter-content p, .letter-content h2');
  lines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add('visible');
    }, index * 1500); // 1 second delay between each line
  });
}

// Trigger when envelope opens
const envelope = document.getElementById('envelope');
envelope.addEventListener('click', () => {
  setTimeout(revealLetterText, 1200); // slight delay after opening animation
});





