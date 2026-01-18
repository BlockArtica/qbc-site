'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Text, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// ── Compact Equations ─────────────────────────────────────────────────────────
const mintEq = katex.renderToString('\\text{Lock QBC → Mint wQBC}', { throwOnError: false });
const burnEq = katex.renderToString('\\text{Burn wQBC → Release QBC}', { throwOnError: false });

// ── Fast Math Reveal ──────────────────────────────────────────────────────────
function MathReveal({ html, delay = 0 }: { html: string; delay?: number }) {
  const [text, setText] = useState('');
  useEffect(() => {
    const clean = html.replace(/<[^>]*>/g, '');
    const timer = setTimeout(() => {
      let i = 0;
      const int = setInterval(() => {
        if (i < clean.length) {
          setText(clean.slice(0, i + 1));
          i++;
        } else clearInterval(int);
      }, 35);
      return () => clearInterval(int);
    }, delay * 600);
    return () => clearTimeout(timer);
  }, [html, delay]);

  return (
    <span className="font-mono text-cyan-200/90 text-[11px]">
      {text}<span className="animate-pulse">|</span>
    </span>
  );
}

// ── Subtle Background Particles ───────────────────────────────────────────────
function QuantumParticleField() {
  const points = useRef<THREE.Points>(null!);
  const initialized = useRef(false);

  useFrame(({ clock }) => {
    if (!points.current?.geometry?.attributes?.position) return;
    const pos = points.current.geometry.attributes.position.array as Float32Array;

    if (!initialized.current) {
      for (let i = 0; i < 20000; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 16;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      }
      initialized.current = true;
    }

    const t = clock.getElapsedTime() * 0.25;
    for (let i = 0; i < 20000; i++) {
      pos[i * 3]     += Math.sin(t + i * 1.1) * 0.0015;
      pos[i * 3 + 1] += Math.cos(t + i * 1.4) * 0.0015;
      pos[i * 3 + 2] += Math.sin(t + i * 1.7) * 0.0015;
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={20000} array={new Float32Array(20000 * 3)} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#00d4ff" transparent opacity={0.55} />
    </points>
  );
}

// ── Mint/Burn Flow with Transformation ────────────────────────────────────────
function BridgeFlow({ mintActive, burnActive }: { mintActive: boolean; burnActive: boolean }) {
  const qbcRef = useRef<THREE.Group>(null!);
  const wqbcRef = useRef<THREE.Group>(null!);
  const flowPoints = useRef<THREE.Points>(null!);
  const count = 1200;
  const positions = useRef(new Float32Array(count * 3));
  const velocities = useRef(new Float32Array(count * 3));
  const lifetimes = useRef(new Float32Array(count));
  const mintProgress = useRef(0);
  const burnProgress = useRef(0);

  const [showQBC, setShowQBC] = useState(true);
  const [showWQBC, setShowWQBC] = useState(false);

  useEffect(() => {
    if (!flowPoints.current) return;
    const geo = flowPoints.current.geometry;
    geo.setAttribute('position', new THREE.BufferAttribute(positions.current, 3));
  }, []);

  useFrame(({ clock }) => {
    const dt = clock.getDelta();
    const t = clock.getElapsedTime();

    // Mint animation (1.5s)
    if (mintActive) {
      mintProgress.current = Math.min(1, mintProgress.current + dt / 1.5);
      if (qbcRef.current) {
        qbcRef.current.position.x = -3.5 + mintProgress.current * 7;
        qbcRef.current.scale.setScalar(1 - mintProgress.current * 0.2 + Math.sin(t * 4) * 0.08);
      }

      // Switch at end
      if (mintProgress.current >= 1) {
        setShowQBC(false);
        setShowWQBC(true);
        mintProgress.current = 1;
      }
    } else {
      mintProgress.current = 0;
      if (qbcRef.current) qbcRef.current.position.x = -3.5;
    }

    // Burn animation (3s)
    if (burnActive) {
      burnProgress.current = Math.min(1, burnProgress.current + dt / 3);
      if (wqbcRef.current) {
        wqbcRef.current.position.x = 3.5 - burnProgress.current * 7;
        wqbcRef.current.scale.setScalar(1 - burnProgress.current * 0.2 + Math.sin(t * 4) * 0.08);
      }

      // Switch at end
      if (burnProgress.current >= 1) {
        setShowWQBC(false);
        setShowQBC(true);
        burnProgress.current = 1;
      }
    } else {
      burnProgress.current = 0;
      if (wqbcRef.current) wqbcRef.current.position.x = 3.5;
    }

    // Flow particles
    if (mintActive || burnActive) {
      flowPoints.current.visible = true;
      const dir = mintActive ? 1 : -1;
      for (let i = 0; i < count; i++) {
        if (lifetimes.current[i] <= 0) {
          lifetimes.current[i] = 0.8 + Math.random() * 1.2;
          positions.current[i * 3]     = dir > 0 ? -3.5 : 3.5;
          positions.current[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
          positions.current[i * 3 + 2] = (Math.random() - 0.5) * 0.8;

          velocities.current[i * 3]     = dir * (3 + Math.random() * 2.5);
          velocities.current[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
          velocities.current[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
        } else {
          positions.current[i * 3]     += velocities.current[i * 3] * dt;
          positions.current[i * 3 + 1] += velocities.current[i * 3 + 1] * dt;
          positions.current[i * 3 + 2] += velocities.current[i * 3 + 2] * dt;

          // Explosion on burn near center
          if (burnActive && Math.abs(positions.current[i * 3]) < 0.5) {
            velocities.current[i * 3 + 1] += (Math.random() - 0.5) * 10;
            velocities.current[i * 3 + 2] += (Math.random() - 0.5) * 10;
            velocities.current[i * 3]     *= 0.4;
          }

          lifetimes.current[i] -= dt;
        }
      }
      flowPoints.current.geometry.attributes.position.needsUpdate = true;
    } else {
      flowPoints.current.visible = false;
    }
  });

  return (
    <group scale={0.7} position={[0, 0, 0]}>
      {/* QBC */}
      <group ref={qbcRef} visible={showQBC} position={[-3.5, 0, 0]}>
        <Sphere args={[1.3, 64, 64]}>
          <meshPhysicalMaterial 
            color="#00f0ff" 
            emissive="#00ffff" 
            emissiveIntensity={2.4} 
            metalness={0.96} 
            roughness={0.03} 
          />
        </Sphere>
        <Text position={[0, 2, 0]} fontSize={0.65} color="#00ffff" anchorX="center">QBC</Text>
      </group>

      {/* wQBC */}
      <group ref={wqbcRef} visible={showWQBC} position={[3.5, 0, 0]}>
        <Sphere args={[1.3, 64, 64]}>
          <meshPhysicalMaterial 
            color="#ffd700" 
            emissive="#ffaa00" 
            emissiveIntensity={2.4} 
            metalness={0.96} 
            roughness={0.03} 
          />
        </Sphere>
        <Text position={[0, 2, 0]} fontSize={0.65} color="#ffd700" anchorX="center">wQBC</Text>
      </group>

      {/* Portal */}
      <Torus args={[3.8, 0.55, 32, 96]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#7b2cbf" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </Torus>

      {/* Flow particles */}
      <points ref={flowPoints}>
        <bufferGeometry />
        <pointsMaterial 
          size={0.05} 
          color={mintActive ? "#00ffff" : "#ff4444"} 
          transparent 
          opacity={0.9} 
          blending={THREE.AdditiveBlending} 
        />
      </points>
    </group>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function QuantumMintBurnBridge() {
  const [mintActive, setMintActive] = useState(false);
  const [burnActive, setBurnActive] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const handleMint = () => {
    setMintActive(p => !p);
    if (burnActive) setBurnActive(false);
  };

  const handleBurn = () => {
    setBurnActive(p => !p);
    if (mintActive) setMintActive(false);
  };

  return (
    <div className="relative h-[500px] md:h-[650px] rounded-2xl overflow-hidden border border-cyan-900/40 shadow-2xl bg-gradient-to-b from-black via-cyan-950/20 to-black">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <ambientLight intensity={1.3} />
        <pointLight position={[10, 10, 10]} intensity={2.8} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={2.2} color="#ffd700" />

        <OrbitControls enableZoom={false} autoRotate={autoRotate} autoRotateSpeed={0.8} />

        <Stars radius={200} depth={90} count={10000} factor={5} saturation={0.85} fade speed={0.5} />
        <QuantumParticleField />

        <BridgeFlow mintActive={mintActive} burnActive={burnActive} />
      </Canvas>

      {/* Top-left equations */}
      <motion.div 
        className="absolute top-4 left-4 bg-black/90 backdrop-blur-xl p-2.5 rounded-xl border border-cyan-900/50 shadow-lg max-w-[240px] text-[11px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <span className="font-bold text-cyan-300 uppercase">MINT</span>
          <span className="text-cyan-400">→</span>
          <MathReveal html={mintEq} delay={0} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-red-300 uppercase">BURN</span>
          <span className="text-red-400">→</span>
          <MathReveal html={burnEq} delay={0.3} />
        </div>
      </motion.div>

      {/* Bottom controls */}
      <motion.div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 bg-black/90 backdrop-blur-xl px-8 py-4 rounded-2xl border border-cyan-800/60 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-sm text-cyan-200 font-medium">
          {mintActive ? 'Minting wQBC...' : burnActive ? 'Burning wQBC...' : 'Bridge Ready'}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleMint}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              mintActive ? 'bg-cyan-700 text-white shadow-cyan-500/50' : 'bg-cyan-900/70 text-cyan-200 hover:bg-cyan-800/70'
            }`}
          >
            {mintActive ? 'Stop Mint' : 'Mint'}
          </button>

          <button
            onClick={handleBurn}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              burnActive ? 'bg-red-700 text-white shadow-red-500/50' : 'bg-red-900/70 text-red-200 hover:bg-red-800/70'
            }`}
          >
            {burnActive ? 'Stop Burn' : 'Burn'}
          </button>

          <button
            onClick={() => setAutoRotate(p => !p)}
            className="px-5 py-2 bg-gray-800/70 text-gray-200 rounded-lg text-sm hover:bg-gray-700/70 transition-all"
          >
            {autoRotate ? 'Stop Spin' : 'Spin'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
