import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { Mandala3D } from '../canvas/Mandala3D';
import { Diya3D } from '../canvas/Diya3D';
import { GoldParticles3D } from '../canvas/GoldParticles3D';
import { RosePetals3D } from '../canvas/RosePetals3D';
import { sound } from '../utils/soundEffects';

export function HeroSection() {
  const containerRef = useRef(null);

  const handleScrollToMessage = () => {
    sound.playSparkle();
    const messageEl = document.querySelector('#message');
    if (messageEl) {
      messageEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 px-4"
    >
      {/* 3D Immersive Hero Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 6, 5]} intensity={1.8} color="#FFF8E9" />
          <directionalLight position={[-4, -3, 2]} intensity={0.7} color="#D4AF65" />

          {/* Central Rotating Golden Indian Mandala */}
          <Mandala3D scale={1.25} rotationSpeed={0.3} />

          {/* Two Beautifully Animated 3D Diyas on either side */}
          <Diya3D position={[-2.8, -1.3, 0.4]} scale={0.75} rotation={[0.45, 0.4, 0]} />
          <Diya3D position={[2.8, -1.3, 0.4]} scale={0.75} rotation={[0.45, -0.4, 0]} />

          {/* Golden Glowing Dust Particles */}
          <GoldParticles3D count={320} spread={11} />

          {/* Soft Fluttering Rose Petals */}
          <RosePetals3D count={28} />
        </Canvas>
      </div>

      {/* Atmospheric Glow & Layering */}
      <div className="absolute inset-0 pointer-events-none radial-glow-gold opacity-60" />
      <div className="absolute inset-0 pointer-events-none vignette-overlay" />

      {/* Hero Typography & Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center pointer-events-auto">
        {/* Sacred Sanskrit / Festive Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full glass-royal border border-gold-400/30 mb-6 shadow-gold-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-bright animate-spin-very-slow" />
          <span className="text-xs tracking-[0.25em] uppercase text-gold-light font-medium">
            शुभ भाई दूज • Bhai Dooj Celebrations
          </span>
          <Sparkles className="w-3.5 h-3.5 text-gold-bright animate-spin-very-slow" />
        </motion.div>

        {/* Hero Heading: "To My Dearest Sister, Vedangi" */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
        >
          <span className="block text-ivory/90 text-2xl sm:text-3xl md:text-4xl font-light mb-2">
            To My Dearest Sister,
          </span>
          <span className="text-gold-gradient font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-[0_4px_35px_rgba(212,175,101,0.5)]">
            Vedangi
          </span>
        </motion.h1>

        {/* Hero Subheading: "Some bonds are not just special. They are forever." */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-base sm:text-xl md:text-2xl text-gold-100/90 font-serif italic max-w-2xl px-4 font-light leading-relaxed mb-6"
        >
          &ldquo;Some bonds are not just special. They are forever.&rdquo;
        </motion.p>

        {/* Glowing Golden Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex items-center gap-3 w-48 sm:w-72 my-4"
        >
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-gold-bright" />
          <div className="w-2.5 h-2.5 rotate-45 border border-gold-300 bg-gold-bright/60 shadow-[0_0_8px_#D4AF65]" />
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-gold-400 to-gold-bright" />
        </motion.div>

        {/* Emotional sub-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-xs sm:text-sm text-ivory/70 max-w-lg mb-8 leading-relaxed font-light"
        >
          A festival celebrating unconditional love, countless childhood smiles,
          and a lifelong brother-sister bond that time only makes stronger.
        </motion.p>

        {/* Interactive Scroll Down Indicator */}
        <motion.button
          onClick={handleScrollToMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="group flex flex-col items-center gap-2 mt-4 text-gold-300/80 hover:text-gold-bright transition-colors cursor-pointer"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase font-light">
            Read Your Special Message
          </span>
          <div className="w-8 h-8 rounded-full border border-gold-400/40 flex items-center justify-center group-hover:border-gold-bright group-hover:scale-110 transition-all shadow-gold-sm">
            <ChevronDown className="w-4 h-4 animate-bounce text-gold-bright" />
          </div>
        </motion.button>
      </div>
    </section>
  );
}

