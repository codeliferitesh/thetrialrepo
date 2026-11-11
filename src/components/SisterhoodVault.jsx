import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import {
  Shield,
  Heart,
  Smile,
  Compass,
  Trophy,
  Sparkles,
  Flame,
  Sun,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { Diya3D } from '../canvas/Diya3D';
import { GoldParticles3D } from '../canvas/GoldParticles3D';
import { sound } from '../utils/soundEffects';
import { triggerGoldenCelebration, triggerParticleExplosion } from '../utils/confetti';

const PROMISES = [
  {
    id: 1,
    title: 'The Unbreakable Shield',
    sanskrit: 'रक्षा बन्धनम्',
    icon: Shield,
    short: 'Your safe space in every storm',
    vow: 'No matter how big you grow, how far you travel, or what challenges life puts in your way, you will never have to face them alone. I promise to always stand as your protector, your safe harbor, and your quiet strength.',
    color: 'from-amber-500/20 to-maroon-900/60',
    accent: '#D4AF65',
  },
  {
    id: 2,
    title: 'Your Fiercest Cheerleader',
    sanskrit: 'विजयी भव',
    icon: Trophy,
    short: 'Celebrating your wings & dreams',
    vow: 'When the world doubts you, remember your brother believes in you 100%. I promise to celebrate every victory of yours—big or small—louder than anyone else, and pick you right back up if you ever stumble.',
    color: 'from-rose-500/20 to-maroon-900/60',
    accent: '#E297A6',
  },
  {
    id: 3,
    title: 'The Partner in Crime',
    sanskrit: 'सखा सदैव',
    icon: Smile,
    short: 'Countless laughs & silly moments',
    vow: 'I promise to never stop teasing you, never stop stealing the last piece of chocolate (okay, maybe half!), and always keep our goofy childhood jokes alive. You will always be my favorite mischief partner.',
    color: 'from-gold-500/20 to-maroon-900/60',
    accent: '#FFDF73',
  },
  {
    id: 4,
    title: 'The Midnight Confidante',
    sanskrit: 'हृदय संवाद',
    icon: Compass,
    short: 'A listener with zero judgment',
    vow: 'Whenever your heart is heavy, or you just need to vent without being judged, my phone and my ears are always open for you 24/7. No problem is too small, and no secret is ever unsafe with me.',
    color: 'from-purple-500/20 to-maroon-900/60',
    accent: '#D99BA8',
  },
  {
    id: 5,
    title: 'Forever Best Friends',
    sanskrit: 'शाश्वत स्नेह',
    icon: Heart,
    short: 'An eternal brother-sister bond',
    vow: 'Boyfriends, jobs, cities, and seasons of life will come and go, but the bond we share is written in stone. I promise to love you, respect you, and cherish you as my sister until the end of time.',
    color: 'from-red-500/20 to-maroon-900/60',
    accent: '#FFF6D8',
  },
];

const REASONS = [
  {
    title: 'Your Radiant Smile',
    text: 'You have a rare ability to bring warm sunshine and laughter into the room even on the gloomy days.',
  },
  {
    title: 'Your Pure, Empathetic Heart',
    text: 'The genuine kindness you show to everyone around you inspires me to be a better brother every day.',
  },
  {
    title: 'The Way You Understand Me',
    text: 'We don’t even need full sentences—just one look across the dinner table and we already know what we’re thinking.',
  },
  {
    title: 'Your Resilience & Courage',
    text: 'Watching you chase what you love and stand strong makes me incredibly proud to be your brother.',
  },
];

export function SisterhoodVault() {
  const [activePromise, setActivePromise] = useState(1);
  const [isDiyaLit, setIsDiyaLit] = useState(false);
  const [activeTab, setActiveTab] = useState('promises'); // 'promises' | 'diya' | 'reasons'

  const handlePromiseClick = (id) => {
    sound.playSparkle();
    setActivePromise(id);
  };

  const handleLightDiya = (e) => {
    if (!isDiyaLit) {
      sound.playCelebration();
      const rect = e?.currentTarget?.getBoundingClientRect();
      if (rect) {
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        triggerParticleExplosion(x, y);
      }
      setTimeout(() => {
        triggerGoldenCelebration();
      }, 300);
      setIsDiyaLit(true);
    } else {
      sound.playSparkle();
      triggerParticleExplosion(0.5, 0.5);
    }
  };

  return (
    <section id="vault" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 w-[600px] h-[600px] bg-rose-deep/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold-300 font-medium mb-3 glass-royal px-5 py-1.5 rounded-full border border-gold-400/30"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-bright animate-spin-very-slow" />
          <span>The Sisterhood Vault • Sister Love</span>
          <Sparkles className="w-3.5 h-3.5 text-gold-bright animate-spin-very-slow" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-gold-gradient mb-4"
        >
          Promises From Your Brother
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-ivory/80 font-light max-w-2xl mx-auto italic"
        >
          &ldquo;Because being your brother is not just a role, Vedangi... it is my greatest blessing and lifelong privilege.&rdquo;
        </motion.p>

        {/* Category Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8 flex-wrap">
          <button
            onClick={() => {
              sound.playSparkle();
              setActiveTab('promises');
            }}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wider transition-all duration-300 ${
              activeTab === 'promises'
                ? 'bg-gradient-to-r from-gold-300 to-gold-500 text-maroon-950 font-semibold shadow-gold-sm scale-105'
                : 'glass-royal text-ivory/80 hover:text-gold-light border border-gold-400/20'
            }`}
          >
            ✦ 5 Sacred Vows
          </button>

          <button
            onClick={() => {
              sound.playSparkle();
              setActiveTab('diya');
            }}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
              activeTab === 'diya'
                ? 'bg-gradient-to-r from-gold-300 to-gold-500 text-maroon-950 font-semibold shadow-gold-sm scale-105'
                : 'glass-royal text-ivory/80 hover:text-gold-light border border-gold-400/20'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-gold-bright" />
            <span>Light Your Blessing Diya</span>
          </button>

          <button
            onClick={() => {
              sound.playSparkle();
              setActiveTab('reasons');
            }}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wider transition-all duration-300 ${
              activeTab === 'reasons'
                ? 'bg-gradient-to-r from-gold-300 to-gold-500 text-maroon-950 font-semibold shadow-gold-sm scale-105'
                : 'glass-royal text-ivory/80 hover:text-gold-light border border-gold-400/20'
            }`}
          >
            ✦ Why You’re The Best
          </button>
        </div>
      </div>

      {/* TAB 1: 5 SACRED VOWS */}
      {activeTab === 'promises' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Promise Badges */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {PROMISES.map((p, idx) => {
              const Icon = p.icon;
              const isSelected = activePromise === p.id;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => handlePromiseClick(p.id)}
                  className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-400 flex items-center justify-between border ${
                    isSelected
                      ? 'glass-royal-card border-gold-300 shadow-gold-glow translate-x-2'
                      : 'bg-maroon-900/30 hover:bg-maroon-900/60 border-gold-400/15 hover:border-gold-400/40'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-br from-gold-300 to-amber-600 text-maroon-950 shadow-gold-sm scale-110'
                          : 'bg-gold-400/10 text-gold-300 border border-gold-400/20'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4
                          className={`font-serif text-base sm:text-lg font-semibold ${
                            isSelected ? 'text-gold-bright' : 'text-ivory/90'
                          }`}
                        >
                          {p.title}
                        </h4>
                        <span className="text-[10px] text-gold-300/70 uppercase tracking-widest font-mono">
                          {p.sanskrit}
                        </span>
                      </div>
                      <p className="text-xs text-ivory/65 font-light mt-0.5">
                        {p.short}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-gold-bright animate-pulse flex-shrink-0" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Royal Parchment Letter Displaying Selected Vow */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {(() => {
                const selected = PROMISES.find((p) => p.id === activePromise) || PROMISES[0];
                const Icon = selected.icon;
                return (
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-3xl p-1 bg-gradient-to-br from-gold-300 via-gold-600 to-maroon-900 shadow-2xl shadow-maroon-950/80 animate-float-slow"
                  >
                    <div className="relative rounded-[22px] bg-gradient-to-b from-[#4A0F21] via-[#350B18] to-[#25050F] p-8 sm:p-12 overflow-hidden border border-gold-300/30">
                      {/* Antique corner accents */}
                      <span className="absolute top-4 left-4 text-gold-300/60 font-serif text-lg">✦</span>
                      <span className="absolute top-4 right-4 text-gold-300/60 font-serif text-lg">✦</span>
                      <span className="absolute bottom-4 left-4 text-gold-300/60 font-serif text-lg">✦</span>
                      <span className="absolute bottom-4 right-4 text-gold-300/60 font-serif text-lg">✦</span>

                      {/* Header Badge */}
                      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gold-400/20">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-300 to-amber-600 p-[1px] shadow-gold-glow flex items-center justify-center">
                            <div className="w-full h-full rounded-2xl bg-maroon-950 flex items-center justify-center">
                              <Icon className="w-7 h-7 text-gold-bright" />
                            </div>
                          </div>
                          <div>
                            <span className="text-[11px] tracking-[0.25em] uppercase text-rose-soft font-medium">
                              Brother’s Vow #{selected.id}
                            </span>
                            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gold-gradient">
                              {selected.title}
                            </h3>
                          </div>
                        </div>

                        <div className="hidden sm:flex flex-col text-right">
                          <span className="text-xs text-gold-300/80 font-mono tracking-widest uppercase">
                            {selected.sanskrit}
                          </span>
                          <span className="text-[10px] text-ivory/50">To Vedangi</span>
                        </div>
                      </div>

                      {/* The Emotional Vow Text */}
                      <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-ivory/95 leading-relaxed mb-8">
                        &ldquo;{selected.vow}&rdquo;
                      </p>

                      {/* Footer Stamp */}
                      <div className="pt-6 border-t border-gold-400/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-gold-bright animate-ping" />
                          <span className="text-xs tracking-wider uppercase text-gold-light font-medium">
                            Sealed with Love by Ritesh
                          </span>
                        </div>

                        <span className="text-xs font-serif italic text-rose-soft">
                          Bhai Dooj 2026
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE DIYA LIGHTING CEREMONY */}
      {activeTab === 'diya' && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-3xl mx-auto rounded-3xl glass-royal-card p-8 sm:p-14 border border-gold-400/40 text-center overflow-hidden"
        >
          {/* Amber glow if lit */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
              isDiyaLit
                ? 'bg-[radial-gradient(circle_at_center,_rgba(255,165,0,0.25)_0%,_transparent_70%)]'
                : 'opacity-0'
            }`}
          />

          <div className="relative z-10 flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-300 font-medium mb-2">
              ✦ Sacred Tilak & Diya Ritual ✦
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-gold-gradient mb-3">
              Light Your Auspicious Diya
            </h3>
            <p className="text-xs sm:text-sm text-ivory/75 font-light max-w-md mb-8">
              {isDiyaLit
                ? 'Your sacred flame is glowing! May its warmth illuminate every single chapter of your life.'
                : 'Vedangi, tap the traditional handcrafted diya below to awaken its golden flame and receive brotherly blessings.'}
            </p>

            {/* 3D Diya Model Stage */}
            <div
              onClick={handleLightDiya}
              className="relative w-64 h-56 sm:w-80 sm:h-72 cursor-pointer group flex items-center justify-center my-2"
            >
              <div
                className={`absolute inset-0 rounded-full blur-2xl transition-all duration-700 pointer-events-none ${
                  isDiyaLit
                    ? 'bg-amber-500/40 scale-110 animate-pulse'
                    : 'bg-gold-400/10 scale-95 group-hover:scale-105'
                }`}
              />

              <div className="relative w-full h-full rounded-2xl overflow-hidden pointer-events-none">
                <Canvas
                  camera={{ position: [0, 0, 3.2], fov: 45 }}
                  dpr={[1, 1.5]}
                  gl={{ antialias: true, alpha: true }}
                >
                  <ambientLight intensity={isDiyaLit ? 1.0 : 0.4} />
                  <directionalLight
                    position={[3, 5, 4]}
                    intensity={isDiyaLit ? 2.0 : 0.8}
                    color="#FFF5DB"
                  />
                  <Diya3D
                    position={[0, -0.4, 0]}
                    scale={1.25}
                    rotation={[0.42, 0, 0]}
                  />
                  {isDiyaLit && <GoldParticles3D count={160} spread={6} />}
                </Canvas>
              </div>

              {!isDiyaLit && (
                <div className="absolute bottom-2 px-4 py-1.5 rounded-full glass-royal border border-gold-300/50 text-gold-bright text-xs font-medium flex items-center gap-1.5 shadow-gold-sm pointer-events-none animate-bounce">
                  <Flame className="w-3.5 h-3.5 text-gold-bright" />
                  <span>Tap to Light Diya ✨</span>
                </div>
              )}
            </div>

            {/* Ignited Blessing Note */}
            {isDiyaLit && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 sm:p-6 rounded-2xl glass-royal border border-gold-300 max-w-lg shadow-gold-glow"
              >
                <p className="font-serif italic text-base sm:text-lg text-gold-bright mb-2">
                  &ldquo;May every flickering spark of this flame shield you from worries, fill your heart with infinite courage, and grant you endless smiles.&rdquo;
                </p>
                <span className="text-xs uppercase tracking-widest text-ivory/60 font-light">
                  Lovingly blessed by your brother, Ritesh ❤️
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* TAB 3: WHY YOU ARE THE BEST SISTER */}
      {activeTab === 'reasons' && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {REASONS.map((r, idx) => (
            <div
              key={idx}
              className="glass-royal-card p-6 sm:p-8 rounded-2xl border border-gold-400/25 hover:border-gold-300 transition-all duration-400 group hover:-translate-y-1 hover:shadow-gold-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gold-400/15 flex items-center justify-center text-gold-bright group-hover:bg-gold-400/30 transition-colors">
                  <Star className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-gold-light group-hover:text-gold-bright transition-colors">
                  {r.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-light">
                {r.text}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

