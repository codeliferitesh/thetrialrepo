import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { Mandala3D } from '../canvas/Mandala3D';
import { Diya3D } from '../canvas/Diya3D';
import { GoldParticles3D } from '../canvas/GoldParticles3D';
import { RosePetals3D } from '../canvas/RosePetals3D';
import { sound } from '../utils/soundEffects';
import { triggerGoldenCelebration } from '../utils/confetti';

export function GrandCelebration() {
  const containerRef = useRef(null);

  const handleCelebrate = () => {
    sound.playCelebration();
    triggerGoldenCelebration();
  };

  return (
    <section
      id="celebration"
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 px-4"
    >
      {/* 3D Golden Mandala & Diya Scene */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 4.8], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 5, 4]} intensity={1.6} color="#FFF8E9" />
          <directionalLight position={[-4, -3, 2]} intensity={0.8} color="#D4AF65" />

          {/* 3D Golden Mandala */}
          <Mandala3D scale={1.2} rotationSpeed={0.35} />

          {/* Twin 3D Diyas */}
          <Diya3D position={[-2.7, -1.2, 0.2]} scale={0.7} rotation={[0.4, 0.3, 0]} />
          <Diya3D position={[2.7, -1.2, 0.2]} scale={0.7} rotation={[0.4, -0.3, 0]} />

          {/* Floating Gold Particles */}
          <GoldParticles3D count={300} spread={10} />

          {/* Floating Rose Petals */}
          <RosePetals3D count={30} />
        </Canvas>
      </div>

      {/* Atmospheric Radial Light */}
      <div className="absolute inset-0 radial-glow-gold opacity-50 pointer-events-none" />
      <div className="absolute inset-0 vignette-overlay pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Sanskrit blessing tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold-300 font-medium mb-4 glass-royal px-5 py-1.5 rounded-full"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-bright animate-spin-very-slow" />
          <span>सदा सुहागन रहो • An Eternal Wish</span>
          <Sparkles className="w-3.5 h-3.5 text-gold-bright animate-spin-very-slow" />
        </motion.div>

        {/* Main Heading: "Happy Bhai Dooj, Vedangi!" */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
        >
          <span className="block text-ivory/90 text-2xl sm:text-3xl font-light mb-1">
            Happy Bhai Dooj,
          </span>
          <span className="text-gold-gradient font-display text-4xl sm:text-6xl md:text-7xl drop-shadow-[0_4px_30px_rgba(212,175,101,0.5)]">
            Vedangi!
          </span>
        </motion.h2>

        {/* Subheading: "Forever grateful to have you as my sister." */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-serif text-lg sm:text-2xl text-gold-100 italic font-light max-w-xl mb-6"
        >
          &ldquo;Forever grateful to have you as my sister.&rdquo;
        </motion.p>

        {/* Golden line divider */}
        <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent my-4" />

        {/* Final text: "Distance, time, arguments, and everything else may change, but the bond we share will always remain special." */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg text-ivory/85 font-light leading-relaxed max-w-2xl px-4 mb-8"
        >
          &ldquo;Distance, time, arguments, and everything else may change, but the
          bond we share will always remain special.&rdquo;
        </motion.p>

        {/* Display: "Lots of Love ❤️ Ritesh" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-royal px-8 py-4 rounded-2xl border border-gold-400/30 mb-10 flex flex-col items-center"
        >
          <div className="text-xs uppercase tracking-widest text-gold-300 font-light flex items-center gap-1.5 mb-1">
            <span>Lots of Love</span>
            <Heart className="w-4 h-4 text-rose-soft fill-rose-soft animate-pulse inline" />
          </div>
          <span className="font-display text-2xl sm:text-3xl font-bold text-gold-gradient tracking-wider">
            Ritesh
          </span>
        </motion.div>

        {/* Glowing Golden Button: "Celebrate Our Bond ✨" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <button
            onClick={handleCelebrate}
            className="group relative px-9 sm:px-12 py-4 rounded-full text-base sm:text-lg font-semibold tracking-wider text-maroon-950 bg-gradient-to-r from-[#FFF6D8] via-[#E8B923] to-[#D4AF65] shadow-gold-glow hover:shadow-gold-intense transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden border border-white/50"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <Sparkles className="w-5 h-5 text-maroon-950 animate-spin-very-slow" />
            <span>Celebrate Our Bond ✨</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

