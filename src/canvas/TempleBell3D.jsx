import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function TempleBell3D({ scale = 1, isHovered = false }) {
  const group = useRef();
  const clapper = useRef();

  const bellMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D4AF65'),
      roughness: 0.22,
      metalness: 0.88,
      emissive: new THREE.Color('#432704'),
      emissiveIntensity: 0.2,
    });
  }, []);

  const chainMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#A88438'),
      roughness: 0.35,
      metalness: 0.8,
    });
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (group.current) {
      const swayAmount = isHovered ? 0.35 : 0.08;
      const swaySpeed = isHovered ? 5 : 1.8;
      group.current.rotation.z = Math.sin(time * swaySpeed) * swayAmount;
    }
    if (clapper.current) {
      const clapperSway = isHovered ? 0.45 : 0.1;
      clapper.current.rotation.z = -Math.sin(time * (isHovered ? 5 : 1.8)) * clapperSway;
    }
  });

  return (
    <group ref={group} scale={scale}>
      {/* Hanging Chain Links */}
      {[0.8, 1.1, 1.4, 1.7].map((y, idx) => (
        <mesh key={idx} material={chainMaterial} position={[0, y, 0]}>
          <torusGeometry args={[0.08, 0.025, 8, 16]} />
        </mesh>
      ))}

      {/* Bell Top Dome & Ring */}
      <mesh material={bellMaterial} position={[0, 0.6, 0]}>
        <torusGeometry args={[0.15, 0.035, 12, 24]} />
      </mesh>

      {/* Bell Body */}
      <mesh material={bellMaterial} position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.3, 0.9, 0.8, 32, 1, true]} />
      </mesh>
      {/* Bell Crown */}
      <mesh material={bellMaterial} position={[0, 0.58, 0]}>
        <sphereGeometry args={[0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
      </mesh>
      {/* Bell Lip (Thick golden rim) */}
      <mesh material={bellMaterial} position={[0, -0.2, 0]}>
        <torusGeometry args={[0.9, 0.08, 16, 32]} />
      </mesh>

      {/* Clapper inside */}
      <group ref={clapper} position={[0, 0.3, 0]}>
        <mesh material={chainMaterial} position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
        </mesh>
        <mesh material={bellMaterial} position={[0, -0.55, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

