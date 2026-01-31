const giftBox = document.getElementById('gift-box');
const introScreen = document.getElementById('intro');
const surpriseScreen = document.getElementById('surprise');
const typewriterText = document.getElementById('typewriter-text');
const gallery = document.getElementById('gallery');
const restartBtn = document.getElementById('restart-btn');
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
const dragInstruction = document.getElementById('drag-instruction');
const jsConfetti = new JSConfetti();

const message = "Hey sis! 💖 Just wanted to take a moment to appreciate how awesome you are. You bring so much joy/ and laughter into our lives. Here are some happy vibes for you! ✨";
let isRevealed = false;
let isMusicPlaying = false;

// Gift Box Click Event
giftBox.addEventListener('click', () => {
    if (isRevealed) return;
    isRevealed = true;

    // 1. Play Music
    playMusic();

    // 2. Open Box Animation
    giftBox.classList.add('open');

    // 3. Confetti Explosion
    jsConfetti.addConfetti({
        emojis: ['🎉', '🎁', '✨'],
        confettiNumber: 100,
    });

    // 4. Transition to Surprise Screen
    setTimeout(() => {
        introScreen.classList.remove('active');
        introScreen.classList.add('hidden');

        setTimeout(() => {
            introScreen.style.display = 'none';
            surpriseScreen.classList.remove('hidden');
            surpriseScreen.classList.add('active');

            // 5. Start Typewriter Effect
            typeWriter(message, 0);

            // 6. Start Floating Elements
            startFloatingElements();
        }, 800);
    }, 1000);
});

// Music Control
musicBtn.addEventListener('click', () => {
    toggleMusic();
});

function playMusic() {
    bgMusic.volume = 0.4;
    bgMusic.play().then(() => {
        isMusicPlaying = true;
        musicBtn.classList.remove('hidden');
        musicBtn.innerText = "🔊 Music: On";
    }).catch(e => {
        console.log("Auto-play blocked, showing button anyway");
        musicBtn.classList.remove('hidden');
        musicBtn.innerText = "🔇 Music: Off";
        isMusicPlaying = false;
    });
}

function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicBtn.innerText = "🔇 Music: Off";
    } else {
        bgMusic.play();
        musicBtn.innerText = "🔊 Music: On";
    }
    isMusicPlaying = !isMusicPlaying;
}

// Typewriter Logic
function typeWriter(text, i) {
    if (i < text.length) {
        if (text.charAt(i) === '/') {
            typewriterText.innerHTML += '<br>';
            setTimeout(() => typeWriter(text, i + 1), 400);
        } else {
            typewriterText.innerHTML += text.charAt(i);
            setTimeout(() => typeWriter(text, i + 1), 40);
        }
    } else {
        // Show Gallery after typing
        setTimeout(() => {
            gallery.classList.remove('hidden-gallery');
            gallery.classList.add('visible');
            dragInstruction.classList.add('visible');
            jsConfetti.addConfetti();

            // Initialize random positions better
            scatterPhotos();
        }, 500);
    }
}

// Draggable Gallery Logic (Vanilla JS)
function scatterPhotos() {
    const items = document.querySelectorAll('.gallery-item');
    const container = document.querySelector('.gallery');
    const containerRect = container.getBoundingClientRect();

    items.forEach(item => {
        // Randomize position within container limits roughly
        const x = Math.random() * (containerRect.width - 150);
        const y = Math.random() * (containerRect.height - 180);
        const rot = (Math.random() - 0.5) * 40; // -20 to 20 deg

        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        item.style.transform = `rotate(${rot}deg)`;

        makeDraggable(item);
    });
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    element.onmousedown = dragMouseDown;
    element.ontouchstart = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        // Get mouse cursor position at startup
        pos3 = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        pos4 = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;

        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDrag;

        // Bring to front
        element.style.zIndex = 100;
        element.style.transform = `scale(1.1) rotate(0deg)`;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

        // Calculate new cursor position
        pos1 = pos3 - clientX;
        pos2 = pos4 - clientY;
        pos3 = clientX;
        pos4 = clientY;

        // Set element's new position
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // Stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;

        element.style.zIndex = 10;
        const rot = (Math.random() - 0.5) * 20;
        element.style.transform = `scale(1) rotate(${rot}deg)`;
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
    el.style.left = Math.random() * 90 + 'vw';
    el.style.animationDuration = (Math.random() * 5 + 5) + 's';

    el.addEventListener('click', () => {
        el.style.transform = 'scale(1.5)';
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 200);
        jsConfetti.addConfetti({ emojis: [el.innerText], confettiNumber: 10, confettiRadius: 3 });
    });

    el.addEventListener('animationend', () => el.remove());
    container.appendChild(el);
}

restartBtn.addEventListener('click', () => location.reload());
