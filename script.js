const giftBox = document.getElementById('gift-box');
const introScreen = document.getElementById('intro');
const surpriseScreen = document.getElementById('surprise');
const typewriterText = document.getElementById('typewriter-text');
const triviaSection = document.getElementById('trivia-section');
const envelopesSection = document.getElementById('envelopes-section');
const restartBtn = document.getElementById('restart-btn');
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close-modal');
const jsConfetti = new JSConfetti();

const message = "Oye Heroine! 💖 Bas yaad dilana tha ki tu best sister hai. /Hamesha aise hi hasti rehna, bohot achi lagti hai. Ye dekh, tere liye chota sa surprise plan kiya hai! ✨";
let isRevealed = false;
let isMusicPlaying = false;

// Gift Box Click Event
giftBox.addEventListener('click', () => {
    if (isRevealed) return;
    isRevealed = true;

    playMusic();
    giftBox.classList.add('open');
    jsConfetti.addConfetti({ emojis: ['🎉', '🎁', '✨'], confettiNumber: 100 });

    setTimeout(() => {
        introScreen.classList.remove('active');
        introScreen.classList.add('hidden');

        setTimeout(() => {
            introScreen.style.display = 'none';
            surpriseScreen.classList.remove('hidden');
            surpriseScreen.classList.add('active');

            typeWriter(message, 0);
            startFloatingElements();
        }, 800);
    }, 1000);
});

// Music
musicBtn.addEventListener('click', toggleMusic);

function playMusic() {
    bgMusic.volume = 0.4;
    bgMusic.play().then(() => {
        isMusicPlaying = true;
        musicBtn.classList.remove('hidden');
        musicBtn.innerText = "🔊 Music: On";
    }).catch(e => {
        musicBtn.classList.remove('hidden');
        musicBtn.innerText = "🔇 Music: Off";
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

// Typewriter
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
        // Show Trivia after typing
        setTimeout(() => {
            triviaSection.classList.remove('hidden-section');
            setTimeout(() => triviaSection.classList.add('visible'), 50);
        }, 500);
    }
}

// Trivia Logic
document.querySelectorAll('.trivia-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (e.target.classList.contains('correct')) {
            e.target.classList.add('success');
            e.target.innerText = "Sahi Jawab! Pura nautanki hai tu! 😂";
            jsConfetti.addConfetti();

            // Hide Trivia, Show Crystal Ball & Envelopes
            setTimeout(() => {
                triviaSection.classList.remove('visible');
                setTimeout(() => {
                    triviaSection.style.display = 'none';
                    crystalBallSection.classList.remove('hidden-section');
                    envelopesSection.classList.remove('hidden-section');

                    setTimeout(() => {
                        crystalBallSection.classList.add('visible');
                        envelopesSection.classList.add('visible');
                    }, 50);
                }, 500);
            }, 1000);
        } else {
            e.target.classList.add('error');
            e.target.innerText = "Jhooth mat bol! 🤥";
            setTimeout(() => {
                e.target.innerText = "Sach bol de... 🔫";
                e.target.classList.remove('error');
            }, 2000);
        }
    });
});

// Crystal Ball
const crystalBallSection = document.getElementById('crystal-ball-section');
const crystalBall = document.getElementById('crystal-ball');
const predictionText = document.getElementById('prediction-text');

const predictions = [
    "Tu kal bartan dhoyegi! 🍽️",
    "Teri shaadi kisi cartoon se hogi! 🤡",
    "Tujhe bohot sara paisa milega (aur tu mujhe degi)! 💰",
    "Tu agle saal world tour pe jayegi! ✈️",
    "Tera crush tujhe message karega! 💬",
    "Tujhe raaste pe 500 ka note milega! 💵",
    "Tu hamesha meri favorite rahegi! ❤️"
];

crystalBall.addEventListener('click', () => {
    const ballInner = document.querySelector('.ball-inner');
    ballInner.classList.add('shake');
    predictionText.style.opacity = 0;

    setTimeout(() => {
        const randomPred = predictions[Math.floor(Math.random() * predictions.length)];
        predictionText.innerText = randomPred;
        predictionText.style.opacity = 1;
        ballInner.classList.remove('shake');
        jsConfetti.addConfetti({ emojis: ['🔮', '✨'] });
    }, 500);
});

// Show Crystal Ball after Trivia (and hide Envelopes logic adjust)
// We'll show Crystal Ball FIRST, then Envelopes below it? Or replaces envelopes?
// Let's show BOTH.


// Envelope Logic
const envelopeContent = {
    'sad': {
        title: "Jab Sad Ho... 😢",
        text: "Tension mat le, sab theek ho jayega! Aur agar mood theek karna hai toh mujhe call kar, main pareshan karne ke liye hamesha free hu! 😉",
        emoji: "🫂🍫✨"
    },
    'happy': {
        title: "Jab Khush Ho... 😃",
        text: "Teri khushi mein hi meri khushi hai! Party kab de rahi hai? 🍕💃",
        emoji: "💃🥳🎶"
    },
    'missing': {
        title: "Jab Miss Kare... 🥺",
        text: "Aww! Main bhi tujhe miss kar raha hu. Jaldi milenge! Tab tak ye virtual hug le le! 🤗",
        emoji: "🤗❤️🏠"
    },
    'hungry': {
        title: "Jab Bhook Lagi Ho... 🍕",
        text: "Jaake fridge check kar, waha kuch nahi milega! Order kar le, bill main bhar dunga (shayad). 😜",
        emoji: "🍕🍔🍟"
    }
};

window.openEnvelope = function (type) {
    const data = envelopeContent[type];
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-body').innerHTML = `
        <p>${data.text}</p>
        <div style="font-size: 5rem; margin-top: 20px; animation: bounce 1s infinite alternate;">${data.emoji}</div>
    `;
    modal.classList.add('active');
    jsConfetti.addConfetti({ emojis: ['💌', '💝'] });
};

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

window.onclick = function (event) {
    if (event.target == modal) {
        modal.classList.remove('active');
    }
}

// Floating Elements
function startFloatingElements() {
    setInterval(createFloatingElement, 1500);
}

function createFloatingElement() {
    const container = document.getElementById('floating-container');
    const el = document.createElement('div');
    el.classList.add('floating-item');
    el.innerText = ['🪔', '🏵️', '✨', '🦚', '💃'][Math.floor(Math.random() * 5)];
    el.style.left = Math.random() * 90 + 'vw';
    el.style.animationDuration = (Math.random() * 5 + 5) + 's';

    el.addEventListener('click', () => {
        el.style.transform = 'scale(1.5)';
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 200);
        jsConfetti.addConfetti({ emojis: [el.innerText, '🌸', '✨'], confettiNumber: 10, confettiRadius: 3 });
    });

    el.addEventListener('animationend', () => el.remove());
    container.appendChild(el);
}

restartBtn.addEventListener('click', () => location.reload());
