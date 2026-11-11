import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function RosePetals3D({ count = 35 }) {
  const meshRef = useRef();

  // Create curved petal geometry
  const petalGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(0.25, 0.35, 6, 6);
    const pos = geom.attributes.position;
    // Curve into an organic bowl/cup shape
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = -(x * x * 1.5 + y * y * 0.8);
      pos.setZ(i, z);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Procedural petals data
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 10,
        y: Math.random() * 8 - 4,
        z: (Math.random() - 0.5) * 6,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        speedY: Math.random() * 0.4 + 0.25,
        speedRotX: (Math.random() - 0.5) * 1.2,
        speedRotY: (Math.random() - 0.5) * 1.2,
        speedRotZ: (Math.random() - 0.5) * 0.8,
        swaySpeed: Math.random() * 1.5 + 0.8,
        scale: Math.random() * 0.4 + 0.7,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      // Fall down
      p.y -= p.speedY * delta;
      // Gentle horizontal sway
      p.x += Math.sin(time * p.swaySpeed + i) * 0.005;
      p.z += Math.cos(time * p.swaySpeed * 0.8 + i) * 0.004;

      // Rotation tumble
      p.rotX += p.speedRotX * delta;
      p.rotY += p.speedRotY * delta;
      p.rotZ += p.speedRotZ * delta;

      // Reset when below floor
      if (p.y < -5) {
        p.y = 5;
        p.x = (Math.random() - 0.5) * 10;
        p.z = (Math.random() - 0.5) * 6;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeometry, null, count]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color="#B75D72"
        roughness={0.4}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

