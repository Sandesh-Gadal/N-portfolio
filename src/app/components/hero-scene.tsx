import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import type { Group } from 'three';

const ACCENT = '#22d3ee';

function WireframeMac() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.15;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.0002) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 1.15, 0]} scale={0.6}>
      {/* Display */}
      <RoundedBox args={[1.7, 1.05, 0.05]} radius={0.04} smoothness={1} position={[0, 0.3, 0]}>
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.35} />
      </RoundedBox>
      {/* Screen glow */}
      <mesh position={[0, 0.3, 0.03]}>
        <planeGeometry args={[1.45, 0.85]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.04} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.35, 8]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.3} />
      </mesh>

      {/* Base */}
      <mesh position={[0, -0.41, 0]}>
        <cylinderGeometry args={[0.46, 0.48, 0.03, 24]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <WireframeMac />
      </Suspense>
    </Canvas>
  );
}
