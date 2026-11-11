import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { triggerGoldenCelebration } from '../utils/confetti';
import { sound } from '../utils/soundEffects';

export function Footer() {
  const handleHeartClick = () => {
    sound.playSparkle();
    triggerGoldenCelebration();
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#2A0713] via-[#1A030B] to-[#100106] pt-20 pb-14 px-4 overflow-hidden border-t border-gold-400/20">
      {/* Decorative top gold ornament line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
        <span className="w-24 sm:w-40 h-[1px] bg-gradient-to-r from-transparent to-gold-400/60" />
        <div className="w-3 h-3 rotate-45 border border-gold-300 bg-gold-400/40" />
        <span className="w-24 sm:w-40 h-[1px] bg-gradient-to-l from-transparent to-gold-400/60" />
      </div>

      {/* Ambient background particles and glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto text-center flex flex-col items-center">
        {/* Animated Golden Heart Icon */}
        <button
          onClick={handleHeartClick}
          className="group p-3 rounded-full bg-gradient-to-br from-gold-400/20 to-maroon-900/60 border border-gold-400/30 hover:border-gold-300 shadow-gold-sm hover:shadow-gold-glow transition-all duration-300 hover:scale-110 mb-6 cursor-pointer"
          title="Click for a heart blessing"
        >
          <Heart className="w-6 h-6 text-gold-bright fill-gold-bright/40 group-hover:fill-gold-bright animate-pulse" />
        </button>

        {/* "Made with ❤️ by Ritesh" */}
        <p className="font-serif text-lg sm:text-xl text-ivory/90 mb-2">
          Made with{' '}
          <span className="text-rose-soft inline-block animate-pulse">❤️</span> by{' '}
          <span className="font-display font-bold text-xl sm:text-2xl text-gold-gradient tracking-wide">
            Ritesh
          </span>
        </p>

        {/* "Especially for Vedangi ✨" */}
        <p className="text-sm sm:text-base font-serif italic text-gold-200/90 tracking-wide mb-3 flex items-center justify-center gap-1.5">
          <span>Especially for Vedangi</span>
          <Sparkles className="w-4 h-4 text-gold-bright inline" />
        </p>

        {/* "Happy Bhai Dooj 2026" */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-xs uppercase tracking-[0.25em] text-gold-300 mt-2">
          <span>Happy Bhai Dooj 2026</span>
        </div>

        {/* Final Brotherly Whisper */}
        <p className="text-xs text-ivory/40 font-light mt-8 tracking-wider">
          A timeless digital keepsake of our cherished sibling bond.
        </p>
      </div>
    </footer>
  );
}

