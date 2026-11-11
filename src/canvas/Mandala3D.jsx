import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Mandala3D({ scale = 1, rotationSpeed = 0.25 }) {
  const group = useRef();
  const innerRing = useRef();
  const middleRing = useRef();
  const outerRing = useRef();
  const petalsGroup = useRef();

  // Create petal shape using extrude geometry
  const petalGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.2, 0.4, 0.25, 0.8);
    shape.quadraticCurveTo(0.15, 1.1, 0, 1.4);
    shape.quadraticCurveTo(-0.15, 1.1, -0.25, 0.8);
    shape.quadraticCurveTo(-0.2, 0.4, 0, 0);

    const extrudeSettings = {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // 12 Inner Petals
  const innerPetals = useMemo(() => {
    const arr = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      arr.push({
        angle,
        x: Math.cos(angle) * 0.45,
        y: Math.sin(angle) * 0.45,
        rotationZ: angle - Math.PI / 2,
      });
    }
    return arr;
  }, []);

  // 24 Outer Petals
  const outerPetals = useMemo(() => {
    const arr = [];
    const count = 24;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      arr.push({
        angle,
        x: Math.cos(angle) * 1.35,
        y: Math.sin(angle) * 1.35,
        rotationZ: angle - Math.PI / 2,
      });
    }
    return arr;
  }, []);

  // Beads on decorative ring
  const beads = useMemo(() => {
    const arr = [];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      arr.push([Math.cos(angle) * 2.15, Math.sin(angle) * 2.15, 0]);
    }
    return arr;
  }, []);

  // Gold Material
  const goldMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E8B923'),
      roughness: 0.28,
      metalness: 0.88,
      emissive: new THREE.Color('#3A2402'),
      emissiveIntensity: 0.2,
    });
  }, []);

  const rubyCenterMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#941830'),
      roughness: 0.15,
      metalness: 0.4,
      emissive: new THREE.Color('#641B2B'),
      emissiveIntensity: 0.4,
    });
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (group.current) {
      // Gentle floating bob
      group.current.position.y = Math.sin(time * 0.8) * 0.12;
      // Mouse tilt reaction
      const targetRotX = state.pointer.y * 0.15;
      const targetRotY = state.pointer.x * 0.2;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotX, delta * 2);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotY, delta * 2);
    }

    if (innerRing.current) {
      innerRing.current.rotation.z += delta * rotationSpeed * 0.8;
    }
    if (middleRing.current) {
      middleRing.current.rotation.z -= delta * rotationSpeed * 0.5;
    }
    if (outerRing.current) {
      outerRing.current.rotation.z += delta * rotationSpeed * 0.3;
    }
  });

  return (
    <group ref={group} scale={scale}>
      {/* Central Ruby & Gold Gem Dome */}
      <mesh material={rubyCenterMaterial} position={[0, 0, 0.05]}>
        <sphereGeometry args={[0.32, 32, 16]} />
      </mesh>
      <mesh material={goldMaterial} position={[0, 0, 0.02]}>
        <torusGeometry args={[0.34, 0.04, 16, 32]} />
      </mesh>

      {/* Inner Petal Ring */}
      <group ref={innerRing}>
        {innerPetals.map((p, idx) => (
          <mesh
            key={`inner-${idx}`}
            geometry={petalGeometry}
            material={goldMaterial}
            position={[p.x, p.y, 0]}
            rotation={[0, 0, p.rotationZ]}
            scale={[0.7, 0.65, 0.7]}
          />
        ))}
        {/* Ring separator */}
        <mesh material={goldMaterial}>
          <torusGeometry args={[0.9, 0.03, 16, 48]} />
        </mesh>
      </group>

      {/* Middle Ring with 24 Petals and Torus */}
      <group ref={middleRing}>
        {outerPetals.map((p, idx) => (
          <mesh
            key={`outer-${idx}`}
            geometry={petalGeometry}
            material={goldMaterial}
            position={[p.x, p.y, 0.01]}
            rotation={[0, 0, p.rotationZ]}
            scale={[0.65, 0.7, 0.65]}
          />
        ))}
        <mesh material={goldMaterial}>
          <torusGeometry args={[1.85, 0.035, 16, 64]} />
        </mesh>
      </group>

      {/* Outer Filigree Ring with Decorative Golden Beads */}
      <group ref={outerRing}>
        <mesh material={goldMaterial}>
          <torusGeometry args={[2.15, 0.025, 16, 64]} />
        </mesh>
        <mesh material={goldMaterial}>
          <torusGeometry args={[2.3, 0.04, 16, 64]} />
        </mesh>
        {beads.map((pos, idx) => (
          <mesh
            key={`bead-${idx}`}
            material={goldMaterial}
            position={pos}
          >
            <sphereGeometry args={[0.045, 12, 12]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

