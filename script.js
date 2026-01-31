const giftBox = document.getElementById('gift-box');
const introScreen = document.getElementById('intro');
const surpriseScreen = document.getElementById('surprise');
const typewriterText = document.getElementById('typewriter-text');
const gallery = document.getElementById('gallery');
const restartBtn = document.getElementById('restart-btn');
const jsConfetti = new JSConfetti();

const message = "Hey sis! 💖 Just wanted to take a moment to appreciate how awesome you are. You bring so much joy/ and laughter into our lives. Here are some happy vibes for you! ✨";
let isRevealed = false;

// Gift Box Click Event
giftBox.addEventListener('click', () => {
    if (isRevealed) return;
    isRevealed = true;

    // 1. Open Box Animation
    giftBox.classList.add('open');

    // 2. Confetti Explosion
    jsConfetti.addConfetti({
        emojis: ['🎉', '🎁', '✨'],
        confettiNumber: 100,
    });

    // 3. Transition to Surprise Screen after short delay
    setTimeout(() => {
        introScreen.classList.remove('active');
        introScreen.classList.add('hidden');

        setTimeout(() => {
            introScreen.style.display = 'none';
            surpriseScreen.classList.remove('hidden');
            surpriseScreen.classList.add('active');

            // 4. Start Typewriter Effect
            typeWriter(message, 0);

            // 5. Start Floating Elements
            startFloatingElements();
        }, 800);
    }, 1000);
});

// Typewriter Logic
function typeWriter(text, i) {
    if (i < text.length) {
        // Handle custom pause character '/'
        if (text.charAt(i) === '/') {
            typewriterText.innerHTML += '<br>';
            setTimeout(() => typeWriter(text, i + 1), 400);
        } else {
            typewriterText.innerHTML += text.charAt(i);
            setTimeout(() => typeWriter(text, i + 1), 40); // Typing speed
        }
    } else {
        // 6. Show Gallery after typing finishes
        setTimeout(() => {
            gallery.classList.remove('hidden-gallery');
            gallery.classList.add('visible');
            jsConfetti.addConfetti();
        }, 500);
    }
}

// Interactive Floating Elements
function startFloatingElements() {
    setInterval(createFloatingElement, 1500);
}

function createFloatingElement() {
    const container = document.getElementById('floating-container');
    const el = document.createElement('div');
    el.classList.add('floating-item');
    el.innerText = ['🎈', '💖', '🌸', '✨', '🦋'][Math.floor(Math.random() * 5)];

    // Random Position
    el.style.left = Math.random() * 90 + 'vw';
    el.style.animationDuration = (Math.random() * 5 + 5) + 's'; // 5-10s duration

    // Pop on click
    el.addEventListener('click', () => {
        el.style.transform = 'scale(1.5)';
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 200);
        jsConfetti.addConfetti({
            emojis: [el.innerText],
            confettiNumber: 10,
            confettiRadius: 3
        });
    });

    // Remove after animation
    el.addEventListener('animationend', () => {
        el.remove();
    });

    container.appendChild(el);
}

// Restart
restartBtn.addEventListener('click', () => {
    location.reload();
});
