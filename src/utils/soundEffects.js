// Audio Engine for Festive Indian Atmosphere & Interaction Sounds
// Plays "Tenu Sang Rakhna" + Web Audio procedural chimes & celebration sounds

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;
    this.bgAudio = null;
    this.isBgPlaying = false;
    this.trackTitle = 'Tenu Sang Rakhna - Anumita Nadesan & Arijit Singh';
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.bgAudio) {
      this.bgAudio = new Audio('/audio/song.mp3');
      this.bgAudio.loop = true;
      this.bgAudio.volume = 0.6;
    }
  }

  startAmbientMusic() {
    this.init();
    if (!this.bgAudio) return;

    this.bgAudio.muted = this.isMuted;
    this.bgAudio
      .play()
      .then(() => {
        this.isBgPlaying = true;
      })
      .catch((err) => {
        console.warn('Autoplay waiting for user gesture:', err);
      });
  }

  stopAmbientMusic() {
    if (this.bgAudio) {
      this.bgAudio.pause();
      this.isBgPlaying = false;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.init();

    if (this.bgAudio) {
      this.bgAudio.muted = this.isMuted;
      if (!this.isMuted && this.bgAudio.paused) {
        this.bgAudio.play().catch(() => {});
        this.isBgPlaying = true;
      }
    }

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.5, this.ctx.currentTime);
    }

    return this.isMuted;
  }

  // Soft Indian Sitar string pluck sound
  playSitarPluck(freq = 415.3, volume = 0.08) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);

    osc.frequency.exponentialRampToValueAtTime(freq * 1.015, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(freq, now + 0.35);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.8, now);
    filter.Q.setValueAtTime(4, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.85);
  }

  // Delicate temple bell chime
  playTempleBell(freq = 880) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    const overtone = this.ctx.createOscillator();
    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 2.76, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    const overGain = this.ctx.createGain();
    overGain.gain.setValueAtTime(0.04, now);
    overGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    overtone.connect(overGain);
    gain.connect(this.masterGain);
    overGain.connect(this.masterGain);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + 2.3);
    overtone.stop(now + 1.3);
  }

  // Magical golden sparkle sound
  playSparkle() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const frequencies = [1046.5, 1318.5, 1567.98, 2093.0];
    frequencies.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + i * 0.06);

      gain.gain.setValueAtTime(0.0001, now + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.05, now + i * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.45);
    });
  }

  // Envelope Opening Swish & Chime
  playEnvelopeOpen() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.35;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(2, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.06, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noise.start(now);

    setTimeout(() => {
      this.playSparkle();
    }, 200);
  }

  // Grand celebration burst sound
  playCelebration() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const bells = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    bells.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTempleBell(freq);
      }, idx * 120);
    });
    setTimeout(() => {
      this.playSparkle();
    }, 600);
  }
}

export const sound = new SoundEngine();
