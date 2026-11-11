import React, { useEffect, useState, useRef } from 'react';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    // Check if device supports touch only
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let trailX = -100;
    let trailY = -100;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPos({ x: mouseX, y: mouseY });

      // Check if target or parent is interactive
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth trail loop
    let animId;
    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.22;
      trailY += (mouseY - trailY) * 0.22;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
      }
      animId = requestAnimationFrame(animateTrail);
    };
    animId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Trailing soft golden aura */}
      <div
        ref={trailRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 pointer-events-none ${
          isHovering
            ? 'w-14 h-14 bg-[#D4AF65]/20 border border-[#FFF6D8]/50 shadow-[0_0_25px_rgba(212,175,101,0.6)]'
            : 'w-8 h-8 bg-[#D4AF65]/15 border border-[#D4AF65]/35 shadow-[0_0_15px_rgba(212,175,101,0.3)]'
        } ${isClicking ? 'scale-75 bg-[#FFDF73]/40' : 'scale-100'}`}
        style={{ willChange: 'transform' }}
      />

      {/* Main sharp golden spark */}
      <div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-75"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${isClicking ? 0.7 : isHovering ? 1.4 : 1})`,
        }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#FFF6D8] shadow-[0_0_10px_#FFDF73,0_0_20px_#D4AF65]" />
      </div>
    </div>
  );
}

