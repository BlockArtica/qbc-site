'use client';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, TorusKnot, Icosahedron, Tube, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import QuantumParticleField from './QuantumParticleField';

// ── SUSY Equations with strict: 'ignore' (kills "→" warning) ────────────────
const susyMultiplet = katex.renderToString(
  '|\\psi\\rangle = \\alpha |B\\rangle + \\beta |F\\rangle',
  { throwOnError: false, displayMode: true, strict: 'ignore' }
);
const susyTransformation = katex.renderToString(
  'Q |B\\rangle = |F\\rangle, \\quad Q |F\\rangle = |B\\rangle',
  { throwOnError: false, displayMode: true, strict: 'ignore' }
);
const susyBreaking = katex.renderToString(
  '[H, Q] \\neq 0 \\quad \\Rightarrow \\quad \\Delta E > 0',
  { throwOnError: false, displayMode: true, strict: 'ignore' }
);

// ── Boson-Fermion Pair ───────────────────────────────────────────────────────
function BosonFermionPair({
  position,
  tamper = false,
}: {
  position: [number, number, number];
  tamper?: boolean;
}) {
  const bosonRef = useRef<THREE.Mesh>(null!);
  const fermionRef = useRef<THREE.Mesh>(null!);
  const linkRef = useRef<THREE.Mesh>(null!);
  const labelRef = useRef<THREE.Mesh>(null!);

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0.5, 0),
    new THREE.Vector3(2, 0, 0),
  ]);

  useFrame(({ clock }) => {
    if (!bosonRef.current || !fermionRef.current || !linkRef.current || !labelRef.current) return;

    const t = clock.getElapsedTime();

    bosonRef.current.rotation.y = Math.sin(t) * 0.5;
    bosonRef.current.rotation.x = Math.cos(t) * 0.3;
    fermionRef.current.rotation.y = Math.sin(t) * 0.5;
    fermionRef.current.rotation.z = Math.cos(t) * 0.4;

    if (tamper) {
      bosonRef.current.position.x += Math.sin(t * 3) * 0.02;
      bosonRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.2);
      fermionRef.current.position.x -= Math.cos(t * 3) * 0.02;
      (linkRef.current.material as THREE.MeshStandardMaterial).color.set('red');
      linkRef.current.scale.set(1, Math.abs(Math.sin(t * 1.5)), 1);
      labelRef.current.visible = true;
    } else {
      const pulse = 1 + Math.sin(t * 0.8) * 0.05;
      bosonRef.current.scale.setScalar(pulse);
      fermionRef.current.scale.setScalar(pulse);
      (linkRef.current.material as THREE.MeshStandardMaterial).color.set('cyan');
      labelRef.current.visible = false;
    }
  });

  return (
    <group position={position}>
      <TorusKnot ref={bosonRef} args={[0.4, 0.15, 128, 32, 2, 3]}>
        <meshStandardMaterial
          color={tamper ? 'orange' : 'cyan'}
          emissive={tamper ? 'orange' : 'cyan'}
          emissiveIntensity={1.2}
          wireframe={tamper}
        />
      </TorusKnot>
      <Text position={[0, 1.1, 0]} fontSize={0.24} color="white">Boson (Value)</Text>

      <Icosahedron ref={fermionRef} args={[0.6, 1]} position={[3, 0, 0]}>
        <meshStandardMaterial
          color={tamper ? 'darkred' : 'yellow'}
          emissive={tamper ? 'darkred' : 'yellow'}
          emissiveIntensity={1.2}
          wireframe={tamper}
        />
      </Icosahedron>
      <Text position={[3, 1.1, 0]} fontSize={0.24} color="white">Fermion (Integrity)</Text>

      <Tube ref={linkRef} args={[curve, 64, 0.1, 8, false]}>
        <meshStandardMaterial
          color="white"
          emissive="white"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </Tube>

      <Text ref={labelRef} position={[1.5, -1.2, 0]} fontSize={0.3} color="red" visible={false}>
        Symmetry Broken
      </Text>
    </group>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function SusyTokenSimulation() {
  const [tamper, setTamper] = useState(false);

  return (
    <div className="relative h-[600px] md:h-[900px] rounded-2xl overflow-hidden border border-cyan-800/30 shadow-2xl bg-black/40">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#a0f0ff" />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />

        <group position={[0, 3, 0]}>
          <BosonFermionPair position={[0, 0, 0]} tamper={false} />
          <QuantumParticleField count={18000} tamper={false} /> {/* Dense field for quantum wow */}
        </group>

        <group position={[0, -3, 0]}>
          <BosonFermionPair position={[0, 0, 0]} tamper={tamper} />
          <QuantumParticleField count={18000} tamper={tamper} />
        </group>
      </Canvas>

      {/* ── Advanced Equation Panel (Version 2) ─────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tamper ? 'tampered' : 'stable'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute top-5 left-5 bg-black/65 backdrop-blur-xl p-6 rounded-2xl border border-cyan-900/50 max-w-sm shadow-[0_0_35px_rgba(0,234,255,0.22)]"
        >
          <h3 className="text-base font-bold text-cyan-300 mb-4 tracking-wider uppercase">SUSY MULTIPLET</h3>
          <div dangerouslySetInnerHTML={{ __html: susyMultiplet }} />

          <h3 className="text-base font-bold text-cyan-300 mt-7 mb-4 tracking-wider uppercase">SUSY TRANSFORMATION</h3>
          <div dangerouslySetInnerHTML={{ __html: susyTransformation }} />

          {tamper && (
            <>
              <div className="mt-7 pt-5 border-t border-red-800/60">
                <h3 className="text-base font-bold text-red-300 mb-4 tracking-wider uppercase">SYMMETRY BREAKING DETECTED</h3>
                <div dangerouslySetInnerHTML={{ __html: susyBreaking }} />
              </div>

              {/* Warning pulse overlay */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600/8 via-red-500/4 to-transparent pointer-events-none"
                animate={{ opacity: [0.18, 0.45, 0.18] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Control Button – original toggle */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-6 py-4 rounded-xl border border-cyan-800/40 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={() => setTamper(!tamper)}
          className="px-6 py-3 bg-gradient-to-r from-cyan-600/30 to-cyan-800/30 hover:from-cyan-500/50 hover:to-cyan-700/50 border border-cyan-400/60 rounded-lg text-cyan-200 font-medium transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,234,255,0.5)]"
        >
          {tamper ? 'Restore Symmetry' : 'Simulate Tampering'}
        </button>
      </motion.div>
    </div>
  );
}
