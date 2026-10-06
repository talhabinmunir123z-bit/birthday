
const particles = document.getElementById("particles");

// Floating glowing particles
for (let i = 0; i < 55; i++) {
  const p = document.createElement("span");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "%";
  p.style.animationDuration = 8 + Math.random() * 14 + "s";
  p.style.animationDelay = Math.random() * 15 + "s";
  p.style.width = p.style.height = 2 + Math.random() * 4 + "px";
  particles.appendChild(p);
}

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("show");
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("show"));
});

// Highlight active navigation link
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === "#" + entry.target.id
        );
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));

// Reveal the personal birthday letter
const openLetter = document.getElementById("openLetter");
const letterMessage = document.getElementById("letterMessage");

openLetter.addEventListener("click", () => {
  letterMessage.hidden = false;
  openLetter.textContent = "Your letter is open ❤️";
  openLetter.disabled = true;
  letterMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Confetti effect
function celebrate() {
  const colors = ["#ed42bc", "#ffd18a", "#ffffff", "#c084fc"];

  for (let i = 0; i < 90; i++) {
    const piece = document.createElement("span");
    piece.style.cssText = `
      position: fixed;
      z-index: 100;
      top: -15px;
      left: ${Math.random() * 100}vw;
      width: ${5 + Math.random() * 7}px;
      height: ${7 + Math.random() * 9}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 2px;
      pointer-events: none;
      animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
    `;

    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

const confettiStyle = document.createElement("style");
confettiStyle.textContent = `
  @keyframes confetti-fall {
    to {
      transform: translate(${Math.random() * 150 - 75}px, 110vh)
                 rotate(${Math.random() * 1000}deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(confettiStyle);

// Birthday wish button
const wishButton = document.getElementById("wishButton");
const wishResult = document.getElementById("wishResult");

wishButton.addEventListener("click", () => {
  wishResult.textContent =
    "May all your beautiful dreams come true. You deserve all the happiness in the world! ❤️✨";

  celebrate();
  wishButton.textContent = "A Wish Sent with Love ♥";
});

// Music button: play romantic birthday song on/off
const musicButton = document.getElementById("musicButton");
const birthdaySong = document.getElementById("birthdaySong");
let audioContext;
let oscillator;
let volume;

musicButton.addEventListener("click", async () => {
  if (!birthdaySong.paused) {
    birthdaySong.pause();
    birthdaySong.currentTime = 0;
    musicButton.style.background = "#300d24d9";
    if (oscillator) {
      oscillator.stop();
      oscillator = null;
    }
    return;
  }

  try {
    birthdaySong.volume = 0.8;
    await birthdaySong.play();
    musicButton.style.background = "#ed42bc";
  } catch (error) {
    console.warn("Autoplay blocked, trying ambient fallback:", error);
  }

  if (!oscillator) {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    await audioContext.resume();

    oscillator = audioContext.createOscillator();
    volume = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 174;
    volume.gain.value = 0.012;

    oscillator.connect(volume);
    volume.connect(audioContext.destination);
    oscillator.start();
  }
});