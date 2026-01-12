'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere } from '@react-three/drei';
import Image from 'next/image';
import * as THREE from 'three';

// ────────────────────────────────────────────────────────────────
// Shared Quantum Particle Field
// ────────────────────────────────────────────────────────────────
function QuantumParticleField({ count = 12000 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);
  const velocities = useRef<Float32Array>(new Float32Array(count * 3));
  const initialized = useRef(false);

  useEffect(() => {
    velocities.current = new Float32Array(count * 3);
    initialized.current = false;
  }, [count]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const pos = points.current.geometry.attributes.position.array as Float32Array;
    const vel = velocities.current;

    if (!initialized.current) {
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 28;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 28;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 28;
        vel[i * 3]     = (Math.random() - 0.5) * 0.035;
        vel[i * 3 + 1] = (Math.random() - 0.5) * 0.035;
        vel[i * 3 + 2] = (Math.random() - 0.5) * 0.035;
      }
      initialized.current = true;
    }

    const t = clock.getElapsedTime() * 0.3;
    for (let i = 0; i < count; i++) {
      pos[i * 3]     += vel[i * 3]     + Math.sin(t + i * 0.7) * 0.004;
      pos[i * 3 + 1] += vel[i * 3 + 1] + Math.cos(t + i * 0.9) * 0.004;
      pos[i * 3 + 2] += vel[i * 3 + 2] + Math.sin(t + i * 1.1) * 0.004;

      const dist = Math.hypot(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
      if (dist > 16) {
        pos[i * 3]     *= 0.975;
        pos[i * 3 + 1] *= 0.975;
        pos[i * 3 + 2] *= 0.975;
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[new Float32Array(count * 3), 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.068} color="#00f0ff" transparent opacity={0.78} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// ────────────────────────────────────────────────────────────────
// Hero Background
// ────────────────────────────────────────────────────────────────
function HeroBackground() {
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

// ────────────────────────────────────────────────────────────────
// Entanglement Bridge Scene
// ────────────────────────────────────────────────────────────────
function EntanglementScene() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
  });

  return (
    <>
      <group ref={groupRef}>
        <QuantumParticleField count={28000} />
        <Sphere args={[4.2, 64, 64]}>
          <meshPhysicalMaterial color="#ffffff" metalness={0.92} roughness={0.06} clearcoat={1} transmission={0.45} thickness={1.2} emissive="#4b0082" emissiveIntensity={0.7} />
        </Sphere>
        <Sphere position={[-12, 0, 0]} args={[2.4, 64, 64]}>
          <meshPhysicalMaterial color="#ffd700" metalness={1} roughness={0.04} emissive="#ffaa00" emissiveIntensity={1.1} />
        </Sphere>
        <Sphere position={[12, 0, 0]} args={[2.4, 64, 64]}>
          <meshPhysicalMaterial color="#00f0ff" metalness={1} roughness={0.04} emissive="#00ffff" emissiveIntensity={1.3} />
        </Sphere>
        <line>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={128} array={new Float32Array(128 * 3).map((_, i) => {
              const t = i / 127;
              const x = -12 + t * 24;
              const y = Math.sin(t * Math.PI * 6) * 2.5;
              const z = Math.cos(t * Math.PI * 4) * 1.8;
              return i % 3 === 0 ? x : i % 3 === 1 ? y : z;
            })} itemSize={3} />
          </bufferGeometry>
          <lineBasicMaterial color="#00ffff" transparent opacity={0.6} linewidth={2} />
        </line>
      </group>
      <Stars radius={260} depth={120} count={16000} factor={9} saturation={0.7} fade speed={1.5} />
    </>
  );
}

function QuantumEntanglementBridge() {
  return (
    <Canvas camera={{ position: [0, 0, 38] }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.9} />
      <pointLight position={[22, 22, 22]} intensity={3.2} color="#7b2cbf" />
      <pointLight position={[-22, -22, -22]} intensity={2.8} color="#00f0ff" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.45} />
      <EntanglementScene />
    </Canvas>
  );
}

// ────────────────────────────────────────────────────────────────
// Interactive Adinkra Orb
// ────────────────────────────────────────────────────────────────
function InteractiveAdinkraOrb() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto mt-12 cursor-pointer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => setClicked(!clicked)}>
      <motion.div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/15 to-yellow-400/15 blur-2xl" animate={{ opacity: hovered ? 0.9 : 0.5, scale: hovered ? 1.15 : 1 }} transition={{ duration: 0.6 }} />
      <motion.div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cyan-400/30 shadow-[0_0_40px_rgba(0,234,255,0.25)] p-4" animate={{ scale: hovered ? 1.12 : 1, rotate: clicked ? 360 : 0, boxShadow: hovered ? '0 0 80px rgba(0,234,255,0.55)' : '0 0 40px rgba(0,234,255,0.25)' }} transition={{ duration: 0.8, type: 'spring', stiffness: 180 }}>
        <Image src="/adinkra-quantum.png" alt="Adinkra Quantum Symbol" fill className="object-contain transition-transform duration-700" />
        {clicked && (
          <motion.div className="absolute inset-0 bg-black/65 flex items-center justify-center text-center p-8 rounded-full" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <p className="text-sm md:text-base text-cyan-100 leading-relaxed">Adinkra diagrams graphically encode SUSY multiplets as bipartite graphs — enabling visual symmetry analysis and robust error correction in noisy quantum hardware.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// MAIN PAGE – ALL SECTIONS, FULL COMPLEXITY
// ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 py-24">
        <div className="absolute inset-0 opacity-45 pointer-events-none">
          <HeroBackground />
        </div>

        <div className="relative z-10 max-w-7xl w-full text-center">
          <motion.h1 initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-r from-yellow-400 to-cyan-300 bg-clip-text text-transparent">
            Qubitcoin
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1.4 }} className="mt-5 text-lg md:text-2xl font-light italic text-cyan-300/90 max-w-4xl mx-auto">
            A supersymmetric framework for physics-secured digital assets — where value is protected not by computational effort, but by the immutable laws of quantum mechanics: no-cloning theorem and boson-fermion symmetry.
          </motion.p>

          {/* Feature cards */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { emoji: "⚡", text: "Instant finality", color: "cyan" },
              { emoji: "🔒", text: "Physical unforgeability", color: "yellow" },
              { emoji: "🌐", text: "Fully decentralized", color: "cyan" },
              { emoji: "💎", text: "21M fixed supply", color: "yellow" },
              { emoji: "🔮", text: "Entangled privacy swaps", color: "cyan" },
              { emoji: "🔗", text: "Ethereum & Solana bridge", color: "yellow" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }} className="bg-black/25 backdrop-blur-lg border border-white/10 hover:border-cyan-500/30 rounded-xl p-5 text-center transition-all hover:shadow-cyan-500/20">
                <div className={`text-4xl mb-2 ${item.color === "cyan" ? "text-cyan-400" : "text-yellow-400"}`}>{item.emoji}</div>
                <p className="text-base font-medium text-gray-200">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Quantum Token State Showcase – Horizontal & Clean */}
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1.1 }} className="mt-16 w-full max-w-5xl mx-auto">
            <div className="relative bg-black/35 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-lg shadow-cyan-900/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="text-center md:text-right space-y-2">
                  <p className="text-lg font-semibold text-cyan-300">A token is</p>
                  <p className="text-sm text-gray-300 leading-relaxed max-w-xs ml-auto">
                    a quantum entity, provably unique and tamper-evident by physical law
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="relative w-56 h-56 md:w-72 md:h-72">
                    <Image src="/adinkra-quantum.png" alt="SUSY Multiplet" fill className="object-contain drop-shadow-2xl" priority />
                  </div>
                </div>

                <div className="text-center md:text-left space-y-2">
                  <p className="text-lg font-semibold text-yellow-300">SUSY multiplet</p>
                  <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
                    boson-fermion pair, secured forever by the no-cloning theorem
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://t.me/Qu_Bitcoin" target="_blank" rel="noopener noreferrer" className="px-10 py-5 text-lg font-medium bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all hover:scale-105">
              Join Community
            </a>
            <a href="https://x.com/Qu_bitcoin" target="_blank" rel="noopener noreferrer" className="px-10 py-5 text-lg font-medium bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-all hover:scale-105">
              Follow on X
            </a>
          </div>
        </div>

        <InteractiveAdinkraOrb />
      </section>

      {/* Vision */}
      <motion.section initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="py-32 px-6 md:px-12 max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-cyan-400/90">The Vision</h2>
        <p className="text-base md:text-lg max-w-4xl mx-auto leading-relaxed text-gray-300">
          In the post-quantum era, classical blockchains face existential threats from quantum computers and unsustainable energy consumption. Qubitcoin redefines digital scarcity — value is anchored in the fundamental laws of physics: the no-cloning theorem and supersymmetry — creating tokens that are inherently secure, tamper-evident, and verifiable by nature itself.
        </p>
      </motion.section>

      {/* SUSY Tokens */}
      <motion.section initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="py-32 px-6 md:px-12 bg-black/40 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-8 text-cyan-400/90">Supersymmetric Tokens</h2>
          <p className="text-base md:text-lg max-w-4xl mx-auto mb-10 text-gray-300 leading-relaxed text-center">
            At the core of Qubitcoin lies supersymmetry — a perfect pairing of bosonic value storage with fermionic integrity enforcement. Any attempt to copy, tamper or forge breaks the symmetry and violates the no-cloning theorem — instantly detectable by the entire network.
          </p>
          <div className="h-[600px] md:h-[900px] rounded-2xl overflow-hidden border border-cyan-800/30 shadow-2xl">
            <QuantumEntanglementBridge />
          </div>
        </div>
      </motion.section>

      {/* PoSA */}
      <motion.section initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="py-32 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-cyan-400/90">Proof-of-SUSY-Alignment (PoSA)</h2>
          <p className="text-base md:text-lg max-w-4xl mx-auto leading-relaxed text-gray-300">
            Miners solve randomized SUSY Hamiltonians using Variational Quantum Eigensolver (VQE) on NISQ hardware. Achieving ground state below threshold = valid proof. ~100 iterations, millijoules per block. Rewards halve every 210,000 blocks + pooled transaction fees.
          </p>
        </div>
      </motion.section>

      {/* Wrapped QBC Bridge */}
      <motion.section initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="py-32 px-6 md:px-12 bg-black/40 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-cyan-400/90">Wrapped QBC Bridge</h2>
          <p className="text-base md:text-lg max-w-4xl mx-auto mb-10 text-gray-300 leading-relaxed">
            Lock native QBC → verify SUSY alignment → mint wQBC on Ethereum. Burn wQBC → oracle releases original. Post-quantum secure hybrid bridge enabling DeFi liquidity while preserving core physics-based security.
          </p>
          <div className="h-[600px] md:h-[900px] rounded-2xl overflow-hidden border border-cyan-800/30 shadow-2xl">
            <QuantumEntanglementBridge />
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <section className="py-32 px-6 md:px-12 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-black mb-8 text-cyan-400/90">The Future is Physical</h2>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-4xl mx-auto">
          Qubitcoin — secured not by code, but by the laws of nature.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="https://t.me/Qu_Bitcoin" target="_blank" rel="noopener noreferrer" className="px-10 py-5 text-lg font-medium bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all hover:scale-105">
            Join the Community
          </a>
          <a href="https://x.com/Qu_bitcoin" target="_blank" rel="noopener noreferrer" className="px-10 py-5 text-lg font-medium bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-all hover:scale-105">
            Follow Development
          </a>
        </div>
      </section>
    </div>
  );
}
