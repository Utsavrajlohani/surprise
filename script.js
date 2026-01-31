const revealBtn = document.getElementById('reveal-btn');
const introScreen = document.getElementById('intro');
const surpriseScreen = document.getElementById('surprise');
const confettiBtn = document.getElementById('confetti-btn');
const jsConfetti = new JSConfetti();

// Sound effect (optional) - requires user interaction first
const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'); // Simple pop sound

revealBtn.addEventListener('click', () => {
    // Play sound
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio blocked', e));

    // Transition screens
    introScreen.classList.remove('active');
    introScreen.classList.add('hidden');
    
    setTimeout(() => {
        introScreen.style.display = 'none';
        surpriseScreen.classList.remove('hidden');
        surpriseScreen.classList.add('active');
        
        // Trigger massive confetti
        fireConfetti();
    }, 600);
});

confettiBtn.addEventListener('click', () => {
    fireConfetti();
});

function fireConfetti() {
    jsConfetti.addConfetti({
        emojis: ['🎉', '⚡️', '💥', '✨', '💫', '🌸'],
        confettiRadius: 6,
        confettiNumber: 100,
    });
    
    jsConfetti.addConfetti({
        confettiColors: [
            '#ff9a9e', '#fad0c4', '#ff6b6b', '#a18cd1', '#fbc2eb'
        ],
    });
}

// Initial subtle movement
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.body.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
});
