import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles, Heart, Music } from 'lucide-react';
import { sound } from '../utils/soundEffects';
import { triggerGoldenCelebration } from '../utils/confetti';

export function Navbar({ isMuted, onToggleMute, activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'A Message', href: '#message' },
    { name: "Brother's Vows", href: '#vault' },
    { name: 'My Wishes', href: '#wishes' },
  ];

  const handleNavClick = (href) => {
    sound.playSparkle();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCelebrationClick = () => {
    sound.playCelebration();
    triggerGoldenCelebration();
  };

  return (
    <>
      {/* Top Gold Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-maroon-950/80 z-50">
        <div
          className="h-full bg-gradient-to-r from-gold-400 via-gold-bright to-gold-200 transition-all duration-150 shadow-[0_0_10px_#D4AF65]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-3 left-1/2 -translate-x-1/2 w-[94%] max-w-6xl z-40 transition-all duration-500 rounded-full ${
          isScrolled
            ? 'glass-royal py-2.5 px-6 shadow-2xl border border-gold-400/30'
            : 'bg-transparent py-4 px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo / Personal Title */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-maroon-700 p-[1px] shadow-gold-sm transition-transform duration-300 group-hover:scale-110">
              <div className="w-full h-full rounded-full bg-maroon-900 flex items-center justify-center">
                <span className="text-gold-light font-display text-sm font-bold">V</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-widest text-sm md:text-base font-semibold text-gold-gradient group-hover:text-gold-bright transition-colors">
                VEDANGI
              </span>
              <span className="text-[10px] tracking-widest uppercase text-rose-soft/80 -mt-1 hidden sm:block">
                Bhai Dooj 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-1.5 text-xs lg:text-sm font-medium tracking-wider transition-all duration-300 rounded-full ${
                    isActive
                      ? 'text-gold-bright bg-gold-400/15 shadow-[0_0_12px_rgba(212,175,101,0.25)]'
                      : 'text-ivory/80 hover:text-gold-light hover:bg-gold-400/10'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gold-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: Audio Toggle & Celebrate */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Celebrate Button */}
            <button
              onClick={handleCelebrationClick}
              title="Celebrate with festive flowers & sparks"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-maroon-950 bg-gradient-to-r from-gold-300 via-gold-bright to-gold-400 shadow-gold-sm hover:shadow-gold-glow transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Celebrate</span>
            </button>

            {/* Audio Toggle with Song Title */}
            <button
              onClick={onToggleMute}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 border ${
                !isMuted
                  ? 'bg-gold-400/20 text-gold-bright border-gold-400/40 shadow-gold-sm'
                  : 'bg-maroon-900/40 text-ivory/50 border-gold-400/20 hover:text-gold-300'
              }`}
              title={isMuted ? 'Play Tenu Sang Rakhna' : 'Mute Music'}
            >
              {!isMuted ? (
                <>
                  <div className="relative">
                    <Music className="w-3.5 h-3.5 text-gold-bright animate-bounce" />
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-gold-bright animate-ping" />
                  </div>
                  <span className="text-[11px] font-medium tracking-wide text-gold-light hidden lg:inline max-w-[130px] truncate">
                    Tenu Sang Rakhna 🎵
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium tracking-wide text-ivory/50 hidden lg:inline">
                    Muted
                  </span>
                </>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-full glass-royal text-gold-300 border border-gold-400/30"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden flex flex-col justify-center items-center bg-[#350B18]/95 backdrop-blur-xl animate-fade-in px-6">
          <div className="flex flex-col items-center gap-6 w-full max-w-xs text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-maroon-700 p-[2px] shadow-gold-glow mb-2">
              <div className="w-full h-full rounded-full bg-maroon-950 flex items-center justify-center">
                <Heart className="w-8 h-8 text-gold-bright animate-pulse" />
              </div>
            </div>
            <h3 className="font-serif text-2xl text-gold-gradient font-bold">Vedangi</h3>
            <p className="text-xs text-rose-soft/90 -mt-4">Bhai Dooj Special • From Ritesh</p>

            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-400/60 to-transparent my-1" />

            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="w-full py-3 text-lg font-serif text-ivory hover:text-gold-bright transition-colors border-b border-gold-400/15"
              >
                {link.name}
              </button>
            ))}

            <button
              onClick={() => {
                handleCelebrationClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 mt-4 rounded-full font-medium text-maroon-950 bg-gradient-to-r from-gold-300 via-gold-bright to-gold-400 shadow-gold-glow flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Celebrate Our Bond ✨
            </button>
          </div>
        </div>
      )}
    </>
  );
}

