import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { CinematicIntro } from './components/CinematicIntro';
import { HeroSection } from './components/HeroSection';
import { BhaiDoojMessage } from './components/BhaiDoojMessage';
import { SisterhoodVault } from './components/SisterhoodVault';
import { SpecialWish } from './components/SpecialWish';
import { GrandCelebration } from './components/GrandCelebration';
import { Footer } from './components/Footer';
import { sound } from './utils/soundEffects';

export function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const handleToggleMute = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleEnterExperience = () => {
    setHasEntered(true);
  };

  // Section Observer to update active navigation item
  useEffect(() => {
    if (!hasEntered) return;

    const sections = ['hero', 'message', 'vault', 'wishes', 'celebration'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered]);

  return (
    <div className="relative min-h-screen bg-[#350B18] text-[#FFF8E9] selection:bg-[#D4AF65] selection:text-[#350B18] overflow-x-hidden">
      {/* Fluid Golden Aura Custom Cursor */}
      <CustomCursor />

      {/* Section 1: Cinematic Full-Screen Introduction */}
      {!hasEntered && (
        <CinematicIntro onEnterExperience={handleEnterExperience} />
      )}

      {/* Main Website Experience (Revealed upon entering) */}
      {hasEntered && (
        <div className="relative z-10 animate-fade-in transition-opacity duration-1000">
          {/* Royal Glassmorphic Navbar */}
          <Navbar
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            activeSection={activeSection}
          />

          <main>
            {/* Section 2: Immersive 3D Hero */}
            <HeroSection />

            {/* Section 3: A Special Bhai Dooj Message */}
            <BhaiDoojMessage />

            {/* Section 4: Sisterhood Vault (5 Sacred Vows, Diya Lighting & Reasons) */}
            <SisterhoodVault />

            {/* Section 5: A Little Wish For You */}
            <SpecialWish />

            {/* Section 6: Grand Final Wish */}
            <GrandCelebration />
          </main>

          {/* Section 8: Personal Signature Footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;

