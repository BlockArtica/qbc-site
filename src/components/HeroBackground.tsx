// src/components/HeroBackground.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import QuantumParticleField from './QuantumParticleField';

export default function HeroBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 24] }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.65} />
      <pointLight position={[14, 14, 14]} intensity={2.4} color="#ffd700" />
      <pointLight position={[-14, -14, -14]} intensity={1.8} color="#00f0ff" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
      <QuantumParticleField count={14000} />
      <Stars radius={140} depth={70} count={7000} factor={4.8} saturation={0.1} fade speed={0.7} />
    </Canvas>
  );
}
