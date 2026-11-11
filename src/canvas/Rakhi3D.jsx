import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Rakhi3D({ scale = 1, isHovered = false }) {
  const group = useRef();
  const discRef = useRef();

  const goldMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D4AF65'),
      roughness: 0.25,
      metalness: 0.9,
      emissive: new THREE.Color('#412604'),
      emissiveIntensity: 0.2,
    });
  }, []);

  const rubyMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8E0F2B'),
      roughness: 0.15,
      metalness: 0.3,
      emissive: new THREE.Color('#58091A'),
      emissiveIntensity: 0.35,
    });
  }, []);

  const crimsonThreadMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#A81832'),
      roughness: 0.8,
      metalness: 0.1,
    });
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = Math.sin(time * 1.5) * 0.1;
      const rotSpeed = isHovered ? 0.8 : 0.25;
      group.current.rotation.y += delta * rotSpeed;
    }
  });

  return (
    <group ref={group} scale={scale}>
      {/* Central Golden Sunburst Medallion */}
      <group ref={discRef}>
        <mesh material={goldMaterial}>
          <cylinderGeometry args={[0.9, 0.9, 0.08, 32]} />
        </mesh>
        <mesh material={rubyMaterial} position={[0, 0.06, 0]}>
          <sphereGeometry args={[0.35, 24, 16]} />
        </mesh>
        {/* Ornate Gold Rim */}
        <mesh material={goldMaterial} position={[0, 0.05, 0]}>
          <torusGeometry args={[0.88, 0.06, 12, 32]} />
        </mesh>
        {/* Tiny Pearl Beads around perimeter */}
        {[...Array(16)].map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          return (
            <mesh
              key={i}
              material={goldMaterial}
              position={[Math.cos(angle) * 0.75, 0.05, Math.sin(angle) * 0.75]}
            >
              <sphereGeometry args={[0.07, 12, 12]} />
            </mesh>
          );
        })}
      </group>

      {/* Left Silk Ceremonial Thread */}
      <group position={[-1.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh material={crimsonThreadMaterial}>
          <cylinderGeometry args={[0.04, 0.04, 1.4, 12]} />
        </mesh>
        {/* Beads on left thread */}
        <mesh material={goldMaterial} position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
        </mesh>
        <mesh material={goldMaterial} position={[0, -0.2, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
        </mesh>
      </group>

      {/* Right Silk Ceremonial Thread */}
      <group position={[1.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh material={crimsonThreadMaterial}>
          <cylinderGeometry args={[0.04, 0.04, 1.4, 12]} />
        </mesh>
        {/* Beads on right thread */}
        <mesh material={goldMaterial} position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
        </mesh>
        <mesh material={goldMaterial} position={[0, -0.2, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
        </mesh>
      </group>
    </group>
  );
}

