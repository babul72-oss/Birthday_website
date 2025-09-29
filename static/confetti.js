// Get the canvas and context
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

// Set canvas full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to hold confetti particles
let confettiParticles = [];

// Create 150 confetti particles
for (let i = 0; i < 150; i++) {
    confettiParticles.push({
        x: Math.random() * canvas.width,             // x-position
        y: Math.random() * canvas.height,            // y-position
        radius: Math.random() * 6 + 4,               // radius of particle
        density: Math.random() * 150 + 1,            // density for movement
        color: hsl(${Math.random() * 360}, 100%, 50%),  // random color
        tilt: Math.random() * 10 - 10,              // tilt of particle
        tiltAngleIncrement: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
    });
}

// Draw the confetti particles
function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach(particle => {
        ctx.beginPath();
        ctx.lineWidth = particle.radius / 2;
        ctx.strokeStyle = particle.color;
        ctx.moveTo(particle.x + particle.tilt + particle.radius / 4, particle.y);
        ctx.lineTo(particle.x + particle.tilt, particle.y + particle.tilt + particle.radius / 4);
        ctx.stroke();
    });
    updateConfetti();
}

// Update the position of confetti particles
function updateConfetti() {
    confettiParticles.forEach((particle, index) => {
        particle.tiltAngle += particle.tiltAngleIncrement;
        particle.y += (Math.cos(particle.density) + 3 + particle.radius / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle) * 15;

        // Reset particle when it goes off-screen
        if (particle.y > canvas.height) {
            confettiParticles[index] = {
                x: Math.random() * canvas.width,
                y: -10,
                radius: particle.radius,
                density: particle.density,
                color: particle.color,
                tilt: Math.random() * 10 - 10,
                tiltAngleIncrement: particle.tiltAngleIncrement,
                tiltAngle: particle.tiltAngle
            };
        }
    });
}

// Animate confetti
setInterval(drawConfetti, 20);

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});