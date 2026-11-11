import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function RosePetalCluster3D({ scale = 1, isHovered = false }) {
  const group = useRef();

  const petalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C9425E'),
      roughness: 0.35,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
  }, []);

  const softPetalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E28298'),
      roughness: 0.4,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
  }, []);

  const petals = useMemo(() => {
    const list = [];
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      list.push({
        x: Math.cos(angle) * 0.5,
        y: Math.sin(angle) * 0.5,
        z: Math.sin(i * 1.5) * 0.2,
        rotX: 0.4 + (i % 2) * 0.3,
        rotY: angle,
        rotZ: angle - Math.PI / 2,
        scale: 0.8 + (i % 3) * 0.15,
      });
    }
    return list;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = Math.sin(time * 1.6) * 0.12;
      const speed = isHovered ? 1.2 : 0.4;
      group.current.rotation.y += delta * speed;
      group.current.rotation.x = Math.sin(time * 0.9) * 0.25;
    }
  });

  return (
    <group ref={group} scale={scale}>
      {petals.map((p, idx) => (
        <mesh
          key={idx}
          material={idx % 2 === 0 ? petalMaterial : softPetalMaterial}
          position={[p.x, p.y, p.z]}
          rotation={[p.rotX, p.rotY, p.rotZ]}
          scale={p.scale}
        >
          <sphereGeometry args={[0.55, 12, 12, 0, Math.PI, 0, Math.PI * 0.6]} />
        </mesh>
      ))}
    </group>
  );
}

