import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function GoldParticles3D({ count = 350, spread = 12 }) {
  const points = useRef();

  // Generate particle positions, sizes, and random drift speeds
  const [positions, scales, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const spd = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * spread;
      pos[i3 + 1] = (Math.random() - 0.5) * (spread * 0.9);
      pos[i3 + 2] = (Math.random() - 0.5) * (spread * 0.8);

      sca[i] = Math.random() * 0.08 + 0.02;

      spd[i3] = (Math.random() - 0.5) * 0.15;
      spd[i3 + 1] = Math.random() * 0.2 + 0.05; // Gentle upward drift
      spd[i3 + 2] = (Math.random() - 0.5) * 0.15;
    }
    return [pos, sca, spd];
  }, [count, spread]);

  // Create a soft glowing circle texture procedurally
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 248, 220, 1)');
    grad.addColorStop(0.3, 'rgba(232, 185, 35, 0.85)');
    grad.addColorStop(0.7, 'rgba(212, 175, 101, 0.3)');
    grad.addColorStop(1, 'rgba(212, 175, 101, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state, delta) => {
    if (!points.current) return;
    const pos = points.current.geometry.attributes.position.array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Drift upwards
      pos[i3 + 1] += speeds[i3 + 1] * delta;
      pos[i3] += Math.sin(time + i) * 0.003;
      pos[i3 + 2] += Math.cos(time + i * 1.5) * 0.003;

      // Wrap around bounds
      const halfSpreadY = (spread * 0.9) / 2;
      if (pos[i3 + 1] > halfSpreadY) {
        pos[i3 + 1] = -halfSpreadY;
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        map={particleTexture}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        color="#FFE9A8"
      />
    </points>
  );
}

