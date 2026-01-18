// src/app/test/page.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import QuantumParticleField from '@/components/QuantumParticleField'; // adjust path if needed

export default function TestPage() {
  return (
    <div className="min-h-screen bg-black relative">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 30] }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#ffd700" />
          <QuantumParticleField count={12000} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls enableZoom={false} autoRotate />
        </Canvas>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen text-white text-center p-8">
        <div>
          <h1 className="text-7xl font-black gradient-text mb-6">Test Mode</h1>
          <p className="text-2xl max-w-2xl mx-auto">
            Quantum particles should be visible here. Safe space to debug.
          </p>
        </div>
      </div>
    </div>
  );
}
