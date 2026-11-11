import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Flower2, Feather } from 'lucide-react';

export function BhaiDoojMessage() {
  return (
    <section id="message" className="relative py-28 px-4 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 radial-glow-maroon opacity-80 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section Pre-heading */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-300/90 font-medium mb-3"
          >
            <Flower2 className="w-3.5 h-3.5 text-gold-bright" />
            <span>From Brother To Sister</span>
            <Flower2 className="w-3.5 h-3.5 text-gold-bright" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gold-gradient"
          >
            A Bond Beyond Words
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4"
          />
        </div>

        {/* Animated Royal Luxury Letter / Card */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative group p-1 sm:p-1.5 rounded-3xl bg-gradient-to-br from-gold-300 via-gold-600 to-maroon-900 shadow-2xl shadow-maroon-950/80 animate-float-slow"
        >
          {/* Outer glowing border */}
          <div className="relative rounded-[22px] bg-gradient-to-b from-[#4A0F21] via-[#350B18] to-[#25050F] p-8 sm:p-12 md:p-14 overflow-hidden border border-gold-300/30">
            {/* Subtle background Indian jali floral watermark */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold-400/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-rose-petal/5 rounded-full blur-2xl pointer-events-none" />

            {/* Antique Ornamental Corners */}
            <div className="absolute top-4 left-4 text-gold-300/60 font-serif text-xl select-none">
              ✦
            </div>
            <div className="absolute top-4 right-4 text-gold-300/60 font-serif text-xl select-none">
              ✦
            </div>
            <div className="absolute bottom-4 left-4 text-gold-300/60 font-serif text-xl select-none">
              ✦
            </div>
            <div className="absolute bottom-4 right-4 text-gold-300/60 font-serif text-xl select-none">
              ✦
            </div>

            {/* Inner Gold Filigree Frame */}
            <div className="border border-gold-400/20 rounded-xl p-6 sm:p-8 relative">
              {/* Wax Seal / Royal Emblem Motif */}
              <div className="flex justify-center -mt-12 sm:-mt-14 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-amber-700 p-[2px] shadow-gold-glow">
                  <div className="w-full h-full rounded-full bg-[#521323] flex items-center justify-center border border-gold-200/40">
                    <Feather className="w-6 h-6 text-gold-bright" />
                  </div>
                </div>
              </div>

              {/* Salutation */}
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-gold-bright mb-6 tracking-wide">
                Dear Vedangi,
              </h3>

              {/* Heartfelt Letter Paragraphs */}
              <div className="space-y-4 sm:space-y-5 text-ivory/90 text-sm sm:text-base leading-relaxed font-light">
                <p>
                  On this beautiful occasion of{' '}
                  <span className="text-gold-light font-medium">Bhai Dooj</span>, I
                  just want to remind you how special you are to me.
                </p>

                <p>
                  Life becomes a little brighter, happier, and more meaningful
                  because I have a sister like you.
                </p>

                <p className="italic text-rose-soft/95">
                  No matter how much we argue, tease each other, or disagree,
                  you&apos;ll always have a special place in my heart.
                </p>

                <p>
                  Thank you for being my sister, my forever partner in all the
                  little moments, and someone I&apos;ll always wish the best for.
                </p>

                <p>
                  May your life always be filled with happiness, success, good
                  health, endless smiles, and beautiful memories.
                </p>

                <p className="text-gold-light font-medium tracking-wide">
                  Keep smiling, keep shining, and never stop being YOU.
                </p>

                <div className="pt-2 text-base sm:text-lg font-serif text-gold-bright flex items-center gap-2">
                  <span>Happy Bhai Dooj, Vedangi!</span>
                  <Heart className="w-5 h-5 text-rose-soft fill-rose-soft inline animate-pulse" />
                </div>
              </div>

              {/* Golden Divider */}
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent my-8" />

              {/* Brother Signature */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-gold-300/70 font-light">
                    With lots of love,
                  </span>
                  <span className="text-xs uppercase tracking-widest text-rose-soft/90 font-light">
                    Your Brother,
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-gold-gradient tracking-wide mt-1">
                    Ritesh
                  </span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-royal border border-gold-400/25 text-xs text-gold-200/80">
                  <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
                  <span>Always By Your Side</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

