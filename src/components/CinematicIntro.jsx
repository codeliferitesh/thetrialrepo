import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { Mandala3D } from '../canvas/Mandala3D';
import { Diya3D } from '../canvas/Diya3D';
import { GoldParticles3D } from '../canvas/GoldParticles3D';
import { RosePetals3D } from '../canvas/RosePetals3D';
import { sound } from '../utils/soundEffects';
import { triggerParticleExplosion, triggerGoldenCelebration } from '../utils/confetti';

export function CinematicIntro({ onEnterExperience }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnter = (e) => {
    // Start ambient music & play welcome chime
    sound.startAmbientMusic();
    sound.playCelebration();

    // Trigger golden particle explosion at center
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerParticleExplosion(x, y);
    setTimeout(() => {
      triggerGoldenCelebration();
    }, 400);

    setIsTransitioning(true);
    setTimeout(() => {
      onEnterExperience();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isTransitioning ? 0 : 1, scale: isTransitioning ? 1.08 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#400B1B] via-[#350B18] to-[#1F040E]"
      >
        {/* 3D Cinematic Canvas in Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 4.8], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 5, 4]} intensity={1.5} color="#FFF5DB" />
            <pointLight position={[-3, -2, 2]} intensity={0.8} color="#D4AF65" />

            {/* Central Animated Golden Mandala */}
            <Mandala3D scale={1.1} rotationSpeed={0.2} />

            {/* Left Glowing Diya */}
            <Diya3D position={[-2.6, -1.2, 0]} scale={0.7} rotation={[0.4, 0.3, 0]} />

            {/* Right Glowing Diya */}
            <Diya3D position={[2.6, -1.2, 0]} scale={0.7} rotation={[0.4, -0.3, 0]} />

            {/* Floating Gold Particles */}
            <GoldParticles3D count={250} spread={9} />

            {/* Floating Soft Rose Petals */}
            <RosePetals3D count={20} />
          </Canvas>
        </div>

        {/* Ambient Radial Golden Glow Overlay */}
        <div className="absolute inset-0 z-1 pointer-events-none radial-glow-maroon opacity-75" />
        <div className="absolute inset-0 z-1 pointer-events-none vignette-overlay" />

        {/* Front Glassmorphic Content Card */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl mx-auto">
          {/* Top Decorative Sparkle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold-400" />
            <span className="text-gold-300 text-xs tracking-[0.3em] uppercase font-light">
              ✦ A Royal Bhai Dooj Blessing ✦
            </span>
            <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold-400" />
          </motion.div>

          {/* Reveal 1: "A Little Something Special For..." */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="text-ivory/85 font-serif italic text-base sm:text-lg lg:text-xl tracking-wide mb-2"
          >
            A Little Something Special For...
          </motion.p>

          {/* Reveal 2: VEDANGI ❤️ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 1.3, ease: 'easeOut' }}
            className="my-3 sm:my-4"
          >
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-gold-bright drop-shadow-[0_4px_30px_rgba(212,175,101,0.55)] flex items-center justify-center gap-3">
              VEDANGI
              <span className="text-rose-soft inline-block animate-pulse">❤️</span>
            </h1>
          </motion.div>

          {/* Reveal 3: Happy Bhai Dooj */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold-300" />
            <h2 className="font-serif text-lg sm:text-2xl text-gold-100 tracking-widest font-normal">
              Happy Bhai Dooj
            </h2>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold-300" />
          </motion.div>

          {/* Subtle personal note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 1 }}
            className="text-xs sm:text-sm text-gold-200/70 tracking-wider mb-8 max-w-sm"
          >
            Crafted with deep love and cherished memories by your brother, Ritesh.
          </motion.p>

          {/* Reveal 4: Premium Animated Button "Enter Your Surprise ✨" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.2, duration: 0.8 }}
          >
            <button
              onClick={handleEnter}
              disabled={isTransitioning}
              className="relative group px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold tracking-wider text-maroon-950 bg-gradient-to-r from-[#FFF6D8] via-[#E8B923] to-[#D4AF65] shadow-gold-glow hover:shadow-gold-intense transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5 overflow-hidden border border-white/40"
            >
              {/* Shimmer overlay */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

              <Sparkles className="w-4 h-4 text-maroon-950 animate-spin-very-slow" />
              <span>Enter Your Surprise ✨</span>
            </button>
          </motion.div>
        </div>

        {/* Bottom subtle hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 3.8, duration: 1 }}
          className="absolute bottom-6 text-[11px] tracking-widest text-gold-200/50 uppercase font-light"
        >
          🎵 Playing: Tenu Sang Rakhna • Headphones Recommended • Turn Volume Up
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}

