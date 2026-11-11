import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Diya3D({ position = [0, 0, 0], scale = 1, rotation = [0.3, 0, 0] }) {
  const diyaGroup = useRef();
  const flameMesh = useRef();
  const innerFlameMesh = useRef();
  const lightRef = useRef();

  // Create traditional Diya bowl geometry
  const bowlGeometry = useMemo(() => {
    // Lathe profile for traditional diya
    const points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.4, 0.05));
    points.push(new THREE.Vector2(0.85, 0.2));
    points.push(new THREE.Vector2(1.1, 0.45));
    points.push(new THREE.Vector2(1.15, 0.55));
    points.push(new THREE.Vector2(1.0, 0.53));
    points.push(new THREE.Vector2(0.8, 0.35));
    points.push(new THREE.Vector2(0.4, 0.22));
    points.push(new THREE.Vector2(0, 0.2));
    return new THREE.LatheGeometry(points, 32);
  }, []);

  // Flame teardrop geometry
  const flameGeometry = useMemo(() => {
    const geom = new THREE.ConeGeometry(0.18, 0.55, 16);
    geom.translate(0, 0.27, 0);
    return geom;
  }, []);

  const innerFlameGeometry = useMemo(() => {
    const geom = new THREE.ConeGeometry(0.09, 0.35, 16);
    geom.translate(0, 0.17, 0);
    return geom;
  }, []);

  // Brass / Antique Terracotta material
  const brassMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C89B3C'),
      roughness: 0.35,
      metalness: 0.8,
      emissive: new THREE.Color('#4D2C04'),
      emissiveIntensity: 0.15,
    });
  }, []);

  // Flame materials
  const flameMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FF8C00'),
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  const innerFlameMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FFF5CC'),
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Cotton wick material
  const wickMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1F140A'),
      roughness: 0.9,
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Realistic organic flame flicker
    const flicker1 = Math.sin(time * 14) * 0.08 + Math.cos(time * 26) * 0.05;
    const flicker2 = Math.cos(time * 18) * 0.06;

    if (flameMesh.current) {
      flameMesh.current.scale.set(
        1 + flicker1 * 0.8,
        1 + flicker1 * 1.5,
        1 + flicker2 * 0.8
      );
      flameMesh.current.rotation.z = Math.sin(time * 8) * 0.08;
      flameMesh.current.rotation.x = Math.cos(time * 7) * 0.05;
    }

    if (innerFlameMesh.current) {
      innerFlameMesh.current.scale.set(
        1 + flicker2 * 0.6,
        1 + flicker2 * 1.2,
        1 + flicker1 * 0.6
      );
    }

    if (lightRef.current) {
      lightRef.current.intensity = 2.0 + Math.sin(time * 15) * 0.4 + Math.cos(time * 27) * 0.3;
    }
  });

  return (
    <group ref={diyaGroup} position={position} scale={scale} rotation={rotation}>
      {/* Diya Bowl */}
      <mesh geometry={bowlGeometry} material={brassMaterial} castShadow receiveShadow />

      {/* Decorative Beaded Rim */}
      <mesh material={brassMaterial} position={[0, 0.52, 0]}>
        <torusGeometry args={[1.08, 0.04, 12, 32]} />
      </mesh>

      {/* Oil surface inside */}
      <mesh position={[0, 0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.75, 24]} />
        <meshStandardMaterial
          color="#3A1D05"
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* Cotton Wick */}
      <mesh
        material={wickMaterial}
        position={[0.35, 0.42, 0]}
        rotation={[0, 0, -0.35]}
      >
        <cylinderGeometry args={[0.03, 0.04, 0.25, 8]} />
      </mesh>

      {/* Outer Flame */}
      <mesh
        ref={flameMesh}
        geometry={flameGeometry}
        material={flameMaterial}
        position={[0.42, 0.52, 0]}
      />

      {/* Inner Flame (White-hot core) */}
      <mesh
        ref={innerFlameMesh}
        geometry={innerFlameGeometry}
        material={innerFlameMaterial}
        position={[0.42, 0.5, 0]}
      />

      {/* Dynamic Flickering Light */}
      <pointLight
        ref={lightRef}
        color="#FFA31A"
        intensity={2.2}
        distance={6}
        decay={2}
        position={[0.42, 0.7, 0]}
      />
    </group>
  );
}

