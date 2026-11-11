import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Marigold3D({ scale = 1, isHovered = false }) {
  const group = useRef();

  const orangeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FF7A00'),
      roughness: 0.5,
      metalness: 0.1,
    });
  }, []);

  const goldOrangeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFAE00'),
      roughness: 0.55,
      metalness: 0.1,
    });
  }, []);

  const yellowMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFD000'),
      roughness: 0.6,
      metalness: 0.1,
    });
  }, []);

  // Generate multi-tiered flower petal clusters
  const petalTiers = useMemo(() => {
    const tiers = [];
    // 4 concentric rings of petals
    const ringCounts = [8, 12, 16, 20];
    const ringRadii = [0.3, 0.6, 0.9, 1.15];
    const scales = [0.28, 0.32, 0.35, 0.3];

    ringCounts.forEach((count, tierIdx) => {
      const radius = ringRadii[tierIdx];
      const petalScale = scales[tierIdx];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        tiers.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          z: (3 - tierIdx) * 0.12 - 0.2,
          rotZ: angle,
          scale: petalScale,
          tier: tierIdx,
        });
      }
    });
    return tiers;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = Math.sin(time * 1.4) * 0.1;
      const speed = isHovered ? 1.0 : 0.3;
      group.current.rotation.z += delta * speed;
      group.current.rotation.x = Math.sin(time * 0.8) * 0.2;
    }
  });

  return (
    <group ref={group} scale={scale}>
      {/* Center green base */}
      <mesh position={[0, 0, -0.2]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#2E5A1C" roughness={0.7} />
      </mesh>

      {/* Ruffled Marigold Petals */}
      {petalTiers.map((p, idx) => (
        <mesh
          key={idx}
          material={
            p.tier === 0
              ? yellowMaterial
              : p.tier === 1
              ? goldOrangeMaterial
              : orangeMaterial
          }
          position={[p.x, p.y, p.z]}
          rotation={[0.3, 0.2, p.rotZ]}
          scale={[p.scale * 1.3, p.scale * 0.7, p.scale]}
        >
          <sphereGeometry args={[0.5, 8, 8]} />
        </mesh>
      ))}
    </group>
  );
}

