import confetti from 'canvas-confetti';

export const triggerGoldenCelebration = () => {
  // Center high blast
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#D4AF65', '#FFF6D8', '#E8B923', '#F5E6C8', '#D99BA8', '#641B2B'],
    shapes: ['circle', 'square'],
    scalar: 1.2,
  });

  // Left cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.7 },
      colors: ['#D4AF65', '#FFF8E9', '#FFDF73', '#E297A6'],
      scalar: 1.1,
    });
  }, 200);

  // Right cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.7 },
      colors: ['#D4AF65', '#FFF8E9', '#FFDF73', '#E297A6'],
      scalar: 1.1,
    });
  }, 400);

  // Gentle petal shower
  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 120,
      origin: { y: 0.2 },
      gravity: 0.6,
      ticks: 300,
      colors: ['#D99BA8', '#E297A6', '#D4AF65', '#FFF8E9'],
      scalar: 1.4,
    });
  }, 600);
};

export const triggerParticleExplosion = (x = 0.5, y = 0.5) => {
  confetti({
    particleCount: 65,
    spread: 360,
    startVelocity: 30,
    origin: { x, y },
    colors: ['#FFF6D8', '#E8B923', '#D4AF65', '#F5E6C8', '#FFF8E9'],
    ticks: 180,
    gravity: 0.7,
    scalar: 0.9,
  });
};

