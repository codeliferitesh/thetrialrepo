import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function PujaThali3D({ scale = 1, rotation = [0.6, 0, 0] }) {
  const group = useRef();
  const flame = useRef();
  const light = useRef();

  // Brass platter material
  const brassMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D4AF65'),
      roughness: 0.25,
      metalness: 0.85,
      emissive: new THREE.Color('#3A2402'),
      emissiveIntensity: 0.2,
    });
  }, []);

  // Roli (Red Vermillion)
  const roliMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#9C0C27'),
      roughness: 0.9,
      metalness: 0.05,
    });
  }, []);

  // Akshat (Rice)
  const riceMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFF8E9'),
      roughness: 0.6,
      metalness: 0.1,
    });
  }, []);

  // Golden Ladoo sweets
  const sweetMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F0A500'),
      roughness: 0.7,
      metalness: 0.15,
    });
  }, []);

  // Marigold Petal material
  const marigoldMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FF8000'),
      roughness: 0.5,
    });
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y += delta * 0.2;
      group.current.position.y = Math.sin(time * 1.2) * 0.08;
    }
    if (flame.current) {
      flame.current.scale.set(
        1 + Math.sin(time * 15) * 0.1,
        1 + Math.cos(time * 20) * 0.2,
        1 + Math.sin(time * 12) * 0.1
      );
    }
    if (light.current) {
      light.current.intensity = 1.5 + Math.sin(time * 16) * 0.3;
    }
  });

  return (
    <group ref={group} scale={scale} rotation={rotation}>
      {/* Main Plate */}
      <mesh material={brassMaterial} receiveShadow castShadow>
        <cylinderGeometry args={[2.0, 1.85, 0.12, 48]} />
      </mesh>
      {/* Plate Rim */}
      <mesh material={brassMaterial} position={[0, 0.08, 0]}>
        <torusGeometry args={[1.96, 0.06, 16, 48]} />
      </mesh>

      {/* Roli Katori (Red Kumkum) */}
      <group position={[-0.8, 0.12, -0.4]}>
        <mesh material={brassMaterial}>
          <cylinderGeometry args={[0.35, 0.25, 0.15, 24]} />
        </mesh>
        <mesh material={roliMaterial} position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 24]} />
        </mesh>
      </group>

      {/* Akshat Katori (Sacred Rice) */}
      <group position={[-0.8, 0.12, 0.4]}>
        <mesh material={brassMaterial}>
          <cylinderGeometry args={[0.35, 0.25, 0.15, 24]} />
        </mesh>
        <mesh material={riceMaterial} position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 24]} />
        </mesh>
      </group>

      {/* Sweets (Ladoos) */}
      <group position={[0.7, 0.15, 0]}>
        <mesh material={sweetMaterial} position={[0, 0.1, 0]} castShadow>
          <sphereGeometry args={[0.22, 16, 16]} />
        </mesh>
        <mesh material={sweetMaterial} position={[0.2, 0.1, 0.2]} castShadow>
          <sphereGeometry args={[0.18, 16, 16]} />
        </mesh>
        <mesh material={sweetMaterial} position={[-0.15, 0.1, 0.22]} castShadow>
          <sphereGeometry args={[0.19, 16, 16]} />
        </mesh>
      </group>

      {/* Center Diya */}
      <group position={[0, 0.12, 0]}>
        <mesh material={brassMaterial}>
          <cylinderGeometry args={[0.4, 0.2, 0.18, 24]} />
        </mesh>
        {/* Flame */}
        <mesh ref={flame} position={[0, 0.26, 0]}>
          <coneGeometry args={[0.1, 0.3, 16]} />
          <meshBasicMaterial color="#FF9900" />
        </mesh>
        <pointLight
          ref={light}
          color="#FF9900"
          intensity={1.5}
          distance={4}
          position={[0, 0.35, 0]}
        />
      </group>

      {/* Marigold Petals on the platter */}
      {[0, 1.2, 2.4, 3.6, 4.8].map((angle, i) => (
        <mesh
          key={i}
          material={marigoldMaterial}
          position={[Math.cos(angle) * 1.4, 0.07, Math.sin(angle) * 1.4]}
          rotation={[0.1, angle, 0.1]}
        >
          <boxGeometry args={[0.18, 0.04, 0.12]} />
        </mesh>
      ))}
    </group>
  );
}

