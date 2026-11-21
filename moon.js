/* =========================================================
   1. AUTOMATIC AUDIO ON OPEN + FIRST INTERACTION FALLBACK
   ========================================================= */
const bgMusic = document.getElementById('bg-music');
const musicPill = document.getElementById('music-pill');
const equalizer = document.getElementById('equalizer');
const musicLabel = document.getElementById('music-label');
let userPausedManually = false;

function setPlayingUI(playing) {
    if (playing) {
        equalizer.classList.add('playing');
        musicLabel.textContent = 'Playing Song';
    } else {
        equalizer.classList.remove('playing');
        musicLabel.textContent = 'Tap for Music';
    }
}

function tryAutoPlay() {
    if (userPausedManually) return;
    bgMusic.volume = 0.85;
    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            setPlayingUI(true);
            removeInteractionListeners();
        }).catch(() => {
            setPlayingUI(false);
        });
    }
}

function removeInteractionListeners() {
    ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
        window.removeEventListener(evt, tryAutoPlay);
    });
}

window.addEventListener('DOMContentLoaded', tryAutoPlay);
window.addEventListener('load', tryAutoPlay);

['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
    window.addEventListener(evt, tryAutoPlay, { once: true });
});

musicPill.addEventListener('click', (e) => {
    e.stopPropagation();
    if (bgMusic.paused) {
        userPausedManually = false;
        bgMusic.play();
        setPlayingUI(true);
    } else {
        userPausedManually = true;
        bgMusic.pause();
        setPlayingUI(false);
    }
});

/* =========================================================
   2. TYPEWRITER EFFECT FOR HERO HEADING
   ========================================================= */
const titleText = "Rohithi Leni Nenu... Oka Incomplete Story";
const titleEl = document.getElementById('typewriter-title');
let charIndex = 0;

function typeTitle() {
    if (charIndex < titleText.length) {
        titleEl.textContent += titleText.charAt(charIndex);
        charIndex++;
        setTimeout(typeTitle, 60);
    }
}
window.addEventListener('load', typeTitle);

/* =========================================================
   3. GENERATE 20 COUPLE PHOTOS (couple1.jpg - couple20.jpg)
   ========================================================= */
const coupleCaptions = [
    "Couple #01 — Mana modati parichayam",
    "Couple #02 — Kalisi nadichina rojulu",
    "Couple #03 — Naa favorite memory with Rohithi",
    "Couple #04 — Pure happiness together",
    "Couple #05 — Mana sweet selfies",
    "Couple #06 — Unforgettable day",
    "Couple #07 — Nuvvu pakkana unte chalu",
    "Couple #08 — Mana chinna godavalu & navvulu",
    "Couple #09 — Best time of my life",
    "Couple #10 — Special evening together",
    "Couple #11 — Naa prapancham nuvve",
    "Couple #12 — Crazy & cute moments",
    "Couple #13 — Golden memory",
    "Couple #14 — Always in my heart",
    "Couple #15 — Sweetest time",
    "Couple #16 — Manam okate",
    "Couple #17 — Magic moments",
    "Couple #18 — Kalisi navvina kshanalu",
    "Couple #19 — Missing those days",
    "Couple #20 — Forever & Always ❤️"
];

const coupleGrid = document.getElementById('couple-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('open');
}

for (let i = 1; i <= 20; i++) {
    const card = document.createElement('div');
    card.className = 'photo-card reveal';
    const imgSrc = `couple${i}.jpg`;
    const capText = coupleCaptions[i - 1];

    card.innerHTML = `
        <div class="photo-box">
            <img src="${imgSrc}" alt="Couple Memory ${i}" onerror="this.style.display='none'">
            <span class="placeholder-text">Add Couple Photo ${i}<br>(${imgSrc})</span>
        </div>
        <p class="caption">${capText}</p>
    `;

    card.addEventListener('click', () => {
        const img = card.querySelector('img');
        if (img.style.display !== 'none') openLightbox(imgSrc, capText);
    });

    coupleGrid.appendChild(card);
}

/* =========================================================
   4. GENERATE 15 HER SINGLE PHOTOS (her1.jpg - her15.jpg)
   ========================================================= */
const singleCaptions = [
    "Rohithi #01 — Naa Vennela 🌙",
    "Rohithi #02 — Aa navvu chusthe chalu",
    "Rohithi #03 — Devatha la unnav ✨",
    "Rohithi #04 — Nee kallalo entho andam undi",
    "Rohithi #05 — Simply gorgeous ❤️",
    "Rohithi #06 — Naa favorite picture",
    "Rohithi #07 — Chala mudduga unnav",
    "Rohithi #08 — Angel on earth",
    "Rohithi #09 — Nee smile ki nenu fida",
    "Rohithi #10 — Pure beauty & grace",
    "Rohithi #11 — Ninnu chusthu undipovali",
    "Rohithi #12 — Most beautiful girl",
    "Rohithi #13 — Naa bangaram ✨",
    "Rohithi #14 — Brighter than the moon",
    "Rohithi #15 — Always my queen 👑"
];

const singleGrid = document.getElementById('single-grid');

for (let i = 1; i <= 15; i++) {
    const card = document.createElement('div');
    card.className = 'photo-card single-card reveal';
    const imgSrc = `her${i}.jpg`;
    const capText = singleCaptions[i - 1];

    card.innerHTML = `
        <div class="photo-box">
            <img src="${imgSrc}" alt="Rohithi Photo ${i}" onerror="this.style.display='none'">
            <span class="placeholder-text">Add Rohithi's Photo ${i}<br>(${imgSrc})</span>
        </div>
        <p class="caption">${capText}</p>
    `;

    card.addEventListener('click', () => {
        const img = card.querySelector('img');
        if (img.style.display !== 'none') openLightbox(imgSrc, capText);
    });

    singleGrid.appendChild(card);
}

lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('open');
});

/* =========================================================
   5. GENERATE 4 VIDEOS AT ENDING (video1.mp4 - video4.mp4)
   ========================================================= */
const videoCaptions = [
    "Video #01 — Mana sweet moment 🎥",
    "Video #02 — Rohithi navvuthunna video ❤️",
    "Video #03 — Unforgettable memory ✨",
    "Video #04 — Always my favorite clip 🌙"
];

const videoGrid = document.getElementById('video-grid');

for (let i = 1; i <= 4; i++) {
    const vCard = document.createElement('div');
    vCard.className = 'video-card reveal';
    const vidSrc = `video${i}.mp4`;

    vCard.innerHTML = `
        <div class="video-box">
            <video controls playsinline preload="metadata">
                <source src="${vidSrc}" type="video/mp4">
            </video>
            <span class="placeholder-text">Add Video ${i}<br>(${vidSrc})</span>
        </div>
        <p class="caption">${videoCaptions[i - 1]}</p>
    `;

    const videoEl = vCard.querySelector('video');
    videoEl.addEventListener('play', () => {
        if (!bgMusic.paused) {
            bgMusic.pause();
            setPlayingUI(false);
        }
    });

    videoGrid.appendChild(vCard);
}

/* =========================================================
   6. SCROLL REVEAL ANIMATION
   ========================================================= */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* =========================================================
   7. ANIMATED NIGHT SKY (STARS, HEARTS & SHOOTING STARS)
   ========================================================= */
const canvas = document.getElementById('sky-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
let shootingStars = [];

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 95; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.5,
        speedY: Math.random() * 0.35 + 0.1,
        alpha: Math.random(),
        isHeart: i % 11 === 0
    });
}

function spawnShootingStar() {
    shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.4,
        len: Math.random() * 90 + 50,
        speed: Math.random() * 8 + 6,
        alpha: 1
    });
}
setInterval(spawnShootingStar, 3600);

function drawHeart(x, y, size, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha * 0.65;
    ctx.fillStyle = '#ffb8d1';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size, y - size, x - size * 1.6, y + size * 0.6, x, y + size * 1.6);
    ctx.bezierCurveTo(x + size * 1.6, y + size * 0.6, x + size, y - size, x, y);
    ctx.fill();
    ctx.restore();
}

function animateSky() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
        p.y -= p.speedY;
        if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
        }
        p.alpha += (Math.random() - 0.5) * 0.04;
        p.alpha = Math.max(0.2, Math.min(1, p.alpha));

        if (p.isHeart) {
            drawHeart(p.x, p.y, 4.2, p.alpha);
        } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 250, 220, ${p.alpha})`;
            ctx.fill();
        }
    });

    shootingStars.forEach((s, idx) => {
        s.x += s.speed;
        s.y += s.speed * 0.55;
        s.alpha -= 0.018;

        ctx.save();
        ctx.strokeStyle = `rgba(246, 229, 141, ${s.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.len, s.y - s.len * 0.55);
        ctx.stroke();
        ctx.restore();

        if (s.alpha <= 0) shootingStars.splice(idx, 1);
    });

    requestAnimationFrame(animateSky);
}
animateSky();