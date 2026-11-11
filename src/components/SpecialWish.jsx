import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart, Gift, X } from 'lucide-react';
import { sound } from '../utils/soundEffects';
import { triggerParticleExplosion, triggerGoldenCelebration } from '../utils/confetti';

export function SpecialWish() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = (e) => {
    sound.playEnvelopeOpen();
    const rect = e?.currentTarget?.getBoundingClientRect();
    if (rect) {
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      triggerParticleExplosion(x, y);
    } else {
      triggerGoldenCelebration();
    }
    setIsOpen(true);
  };

  const handleCloseEnvelope = () => {
    sound.playSparkle();
    setIsOpen(false);
  };

  return (
    <section id="wishes" className="relative py-28 px-4 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute inset-0 radial-glow-maroon opacity-70 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-300 font-medium mb-3"
        >
          <Gift className="w-3.5 h-3.5 text-gold-bright" />
          <span>A Little Wish For You</span>
          <Gift className="w-3.5 h-3.5 text-gold-bright" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gold-gradient mb-4"
        >
          One Wish, A Thousand Smiles
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base text-ivory/80 font-light max-w-md mx-auto mb-12"
        >
          A golden sealed surprise sent straight from my heart to yours. Tap below to unveil your envelope.
        </motion.p>

        {/* Envelope Container */}
        <div className="flex flex-col items-center justify-center">
          {!isOpen ? (
            /* Closed Royal Envelope Representation */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div
                onClick={handleOpenEnvelope}
                className="relative w-80 sm:w-96 h-52 sm:h-60 rounded-2xl bg-gradient-to-br from-[#591428] via-[#3E0C1C] to-[#25050F] p-1 border-2 border-gold-400/40 shadow-2xl shadow-maroon-950/90 cursor-pointer group hover:border-gold-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-gold-glow animate-float-medium"
              >
                {/* Envelope Flap Lines */}
                <div className="w-full h-full rounded-xl bg-gradient-to-b from-[#491122] to-[#2D0713] relative overflow-hidden flex items-center justify-center">
                  {/* Decorative diagonal envelope folds */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-400/10 via-transparent to-transparent" />

                  {/* SVG Envelope Flap Overlay */}
                  <svg
                    className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity"
                    viewBox="0 0 384 240"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 0 0 L 192 130 L 384 0"
                      stroke="#D4AF65"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 0 240 L 145 110"
                      stroke="#D4AF65"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M 384 240 L 239 110"
                      stroke="#D4AF65"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  </svg>

                  {/* Golden Wax Seal with Heart in Center */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gold-200 via-gold-500 to-amber-700 p-1 shadow-gold-glow group-hover:scale-110 transition-transform duration-300">
                      <div className="w-full h-full rounded-full bg-[#641B2B] flex items-center justify-center border border-gold-300/60 shadow-inner">
                        <Heart className="w-8 h-8 text-gold-bright fill-gold-bright/30 animate-pulse" />
                      </div>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-gold-300 font-serif mt-3 font-medium">
                      For Vedangi
                    </span>
                  </div>

                  {/* Corner Flourishes */}
                  <span className="absolute top-3 left-3 text-gold-400/50 text-xs">✦</span>
                  <span className="absolute top-3 right-3 text-gold-400/50 text-xs">✦</span>
                  <span className="absolute bottom-3 left-3 text-gold-400/50 text-xs">✦</span>
                  <span className="absolute bottom-3 right-3 text-gold-400/50 text-xs">✦</span>
                </div>
              </div>

              {/* Action Button: "Open Your Special Wish 💌" */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenEnvelope}
                className="mt-8 px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold tracking-wider text-maroon-950 bg-gradient-to-r from-gold-200 via-gold-bright to-gold-400 shadow-gold-glow hover:shadow-gold-intense transition-all duration-300 flex items-center gap-2 border border-white/40"
              >
                <Mail className="w-4 h-4" />
                <span>Open Your Special Wish 💌</span>
              </motion.button>
            </motion.div>
          ) : (
            /* Opened Letter Presentation */
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-br from-gold-300 via-gold-500 to-maroon-800 p-1 shadow-2xl shadow-maroon-950/90"
              >
                <div className="relative rounded-[22px] bg-gradient-to-b from-[#FFFDF8] via-[#FFF8E9] to-[#F7ECD2] text-maroon-950 p-8 sm:p-12 md:p-14 overflow-hidden border border-gold-400/60 shadow-inner">
                  {/* Close button */}
                  <button
                    onClick={handleCloseEnvelope}
                    className="absolute top-5 right-5 p-2 rounded-full text-maroon-900/60 hover:text-maroon-950 hover:bg-gold-400/20 transition-all"
                    title="Close Letter"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Watermark mandala in the background */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-5 pointer-events-none">
                    <div className="w-full h-full rounded-full border-4 border-dashed border-maroon-950" />
                  </div>

                  {/* Inner Border */}
                  <div className="border border-gold-500/40 rounded-xl p-6 sm:p-8 relative">
                    <div className="flex items-center justify-center gap-2 text-gold-700 text-xs tracking-widest uppercase mb-4 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                      <span>Special Blessing Letter</span>
                      <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-900 mb-6">
                      Dear Vedangi,
                    </h3>

                    <div className="space-y-4 font-serif text-base sm:text-lg leading-relaxed text-maroon-900/90 text-left">
                      <p className="italic">
                        May every new day bring you something to smile about.
                      </p>

                      <p className="italic">
                        May all your dreams find their way to reality.
                      </p>

                      <p className="italic">
                        May you always have the courage to chase what makes you happy.
                      </p>

                      <p className="italic">
                        And may happiness follow you wherever life takes you.
                      </p>

                      <p className="font-sans text-sm sm:text-base font-normal text-maroon-800 pt-2">
                        You deserve all the wonderful things this world has to offer.
                      </p>

                      <p className="font-sans text-sm sm:text-base font-semibold text-maroon-900">
                        Stay blessed, always.
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gold-400/30 flex items-center justify-between">
                      <div className="font-serif text-xl sm:text-2xl font-bold text-gold-700 flex items-center gap-2">
                        <span>Happy Bhai Dooj!</span>
                        <Heart className="w-5 h-5 text-rose-deep fill-rose-deep inline" />
                      </div>

                      <button
                        onClick={handleCloseEnvelope}
                        className="text-xs uppercase tracking-wider text-maroon-800/80 hover:text-maroon-950 font-medium px-3 py-1.5 rounded-full border border-gold-400/40 hover:bg-gold-200/40 transition-colors"
                      >
                        Fold Letter
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}

