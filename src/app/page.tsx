'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import katex from 'katex';
import 'katex/dist/katex.min.css';

function QuantumParticleField({ count = 12000 }) {
  const points = useRef<THREE.Points>(null);

  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 28;

      velocities[i * 3] = (Math.random() - 0.5) * 0.035;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.035;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.035;
    }

    return { positions, velocities };
  }, [count]);

  useFrame(() => {
    if (!points.current) return;
    const pos = points.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      pos[i * 3] += particleData.velocities[i * 3];
      pos[i * 3 + 1] += particleData.velocities[i * 3 + 1];
      pos[i * 3 + 2] += particleData.velocities[i * 3 + 2];

      pos[i * 3] += (Math.random() - 0.5) * 0.009;
      pos[i * 3 + 1] += (Math.random() - 0.5) * 0.009;
      pos[i * 3 + 2] += (Math.random() - 0.5) * 0.009;

      const dist = Math.hypot(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
      if (dist > 16) {
        pos[i * 3] *= 0.975;
        pos[i * 3 + 1] *= 0.975;
        pos[i * 3 + 2] *= 0.975;
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particleData.positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color="#00eaff"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Adinkra3D() {
  return (
    <Canvas camera={{ position: [0, 0, 22] }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[12, 12, 12]} intensity={2.2} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      <QuantumParticleField />
      <Stars radius={120} depth={60} count={6000} factor={4.2} saturation={0} fade speed={0.6} />
      <Sphere position={[-3.8, 0, 0]} args={[1.45, 64, 64]}>
        <meshStandardMaterial color="#ffd700" metalness={0.92} roughness={0.12} />
      </Sphere>
      <Sphere position={[3.8, 0, 0]} args={[1.45, 64, 64]}>
        <meshStandardMaterial color="#00eaff" metalness={0.92} roughness={0.12} />
      </Sphere>
      <Cylinder position={[0, 0, 0]} args={[0.14, 0.14, 8.2, 64]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.06} transparent opacity={0.8} />
      </Cylinder>
    </Canvas>
  );
}

const tokenFormula = katex.renderToString(
  '|\\Psi\\rangle = \\sum_{k=0}^{3} c_k |\\phi_k\\rangle',
  { throwOnError: false }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center px-6 md:px-12">
        <div className="absolute inset-0 opacity-35 pointer-events-none">
          <Adinkra3D />
        </div>

        <div className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <h1 className="text-8xl md:text-10xl font-bold tracking-tighter leading-none">
              Qubitcoin
            </h1>
            <p className="mt-5 text-4xl md:text-6xl font-light text-[var(--accent-cyan)]/90 leading-tight">
              Physics-Secured Digital Assets
            </p>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { e: "⚡", t: "Instant finality" },
                { e: "🔒", t: "Physical unforgeability" },
                { e: "🌐", t: "Fully decentralized" },
                { e: "💎", t: "21M fixed supply" },
                { e: "🔮", t: "SUSY privacy swaps" },
                { e: "🔗", t: "Ethereum + SOL bridge" },
              ].map((item, i) => (
                <div key={i} className="card text-center">
                  <div className="text-5xl mb-4">{item.e}</div>
                  <p className="text-lg font-medium">{item.t}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-6">
              <a
                href="https://t.me/Qu_Bitcoin"
                target="_blank"
                rel="noopener noreferrer"
                className="high-tech-btn"
              >
                Join Telegram
              </a>
              <a
                href="https://x.com/Qu_bitcoin"
                target="_blank"
                rel="noopener noreferrer"
                className="high-tech-btn"
              >
                Follow on X
              </a>
            </div>
          </div>

          <div className="card text-center py-12 px-8">
            <h3 className="text-4xl font-semibold mb-8">Quantum Token State</h3>
            <div
              className="text-4xl mb-8 text-[var(--accent-cyan)]"
              dangerouslySetInnerHTML={{ __html: tokenFormula }}
            />
            <p className="text-gray-300 text-lg">
              SUSY multiplet — inherently unforgeable by the no-cloning theorem
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <h2 className="text-6xl font-bold mb-16">The Vision</h2>
        <p className="text-xl max-w-4xl mx-auto mb-20 text-gray-300">
          Qubitcoin secures value using the immutable laws of quantum mechanics — supersymmetry and no-cloning — instead of computational puzzles. 
          Extremely low-energy PoSA consensus on NISQ hardware, 21 million cap, native privacy, and seamless bridges to classical DeFi.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card">
            <h3 className="text-3xl font-semibold mb-5">Beyond Classical</h3>
            <p className="text-gray-300">Replaces energy-hungry PoW and quantum-vulnerable signatures with physical guarantees.</p>
          </div>
          <div className="card">
            <h3 className="text-3xl font-semibold mb-5">Millijoule Efficiency</h3>
            <p className="text-gray-300">Proofs cost millijoules instead of kilowatt-hours — sustainable from day one.</p>
          </div>
          <div className="card">
            <h3 className="text-3xl font-semibold mb-5">Scientific Value</h3>
            <p className="text-gray-300">Network produces real SUSY-breaking data for fundamental physics research.</p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* SUSY Tokens */}
      <section className="py-32 px-6 md:px-12 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-bold text-center mb-16">Supersymmetric Tokens</h2>
          <p className="text-xl text-center max-w-4xl mx-auto mb-16 text-gray-300">
            Boson-fermion multiplets locked by supersymmetry. Any tampering destroys the quantum symmetry — instantly detectable.
          </p>
          <div className="h-[700px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Adinkra3D />
          </div>
        </div>
      </section>

      {/* PoSa Consensus */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-6xl font-bold mb-16">Proof-of-SUSY-Alignment</h2>
          <p className="text-xl max-w-4xl mx-auto mb-16 text-gray-300">
            Miners solve randomized SUSY Hamiltonians using VQE on NISQ hardware (Heron ~$1.60/hr). 
            Ground state below adaptive threshold → proof. ~100 iterations. Millijoules per block.
          </p>
          {/* You can re-add the chart here later if desired */}
        </div>
      </section>

      <div className="section-divider" />

      {/* wQBC Bridge */}
      <section className="py-32 px-6 md:px-12 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-6xl font-bold mb-16">Wrapped QBC Bridge</h2>
          <p className="text-xl max-w-4xl mx-auto mb-16 text-gray-300">
            Lock native QBC → verified SUSY alignment → mint wQBC ERC-20 on Ethereum. 
            Burn → oracle re-verifies → release original. Post-quantum secure.
          </p>
          {/* Add simple bridge diagram / ReactFlow here later if you want */}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 md:px-12 text-center">
        <h2 className="text-7xl font-bold mb-10">The Future is Physical</h2>
        <p className="text-2xl text-gray-300 mb-16 max-w-4xl mx-auto">
          Join the paradigm shift from computational trust to physics-enforced scarcity.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <a href="https://t.me/Qu_Bitcoin" target="_blank" rel="noopener noreferrer" className="high-tech-btn text-xl">
            Join Community
          </a>
          <a href="https://x.com/Qu_bitcoin" target="_blank" rel="noopener noreferrer" className="high-tech-btn text-xl">
            Follow Development
          </a>
        </div>
      </section>
    </div>
  );
}
