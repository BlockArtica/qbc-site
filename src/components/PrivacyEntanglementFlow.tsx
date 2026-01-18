// src/components/PrivacyEntanglementFlow.tsx
'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Dodecahedron, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import QuantumParticleField from './QuantumParticleField';

// ── Equations ─────────────────────────────────────────────────────────────────
const initialState = katex.renderToString(
  '|\\psi\\rangle = \\bigotimes_{i=1}^{n} |\\phi_i\\rangle',
  { throwOnError: false, displayMode: true }
);
const entangledState = katex.renderToString(
  '|\\Psi\\rangle = \\sum \\alpha_{i_1 \\dots i_n} |i_1 \\dots i_n\\rangle',
  { throwOnError: false, displayMode: true }
);
const mixedState = katex.renderToString(
  '\\rho = \\sum p_k |\\Psi_k\\rangle \\langle \\Psi_k|',
  { throwOnError: false, displayMode: true }
);
const disentangledState = katex.renderToString(
  '|\\psi\'\\rangle = \\bigotimes_{i=1}^{n} |\\phi\'_i\\rangle',
  { throwOnError: false, displayMode: true }
);

// ── Inner 3D scene (all R3F hooks must live here) ─────────────────────────────
function SceneContent({ stage }: { stage: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  const nodePositions: [number, number, number][] = [
    [-3, 0, 0],
    [0, 3, 0],
    [3, 0, 0],
    [0, -3, 0],
  ];

  const stages = [
    { links: [], name: 'Isolate Tokens' },
    { links: [[0,1], [1,2], [2,3], [3,0], [0,2], [1,3]], name: 'Entangle' },
    { links: [[0,2], [1,3], [0,3], [1,2]], name: 'Mix States' },
    { links: [[0,0], [1,1], [2,2], [3,3]], name: 'Disentangle' },
  ];

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, idx) => (
        <EntanglementNode
          key={idx}
          position={pos}
          color={['cyan', 'yellow', 'magenta', 'green'][idx]}
          label={`Token ${String.fromCharCode(65 + idx)}`}
          stage={stage}
          active={stage === 3}
        />
      ))}
      {stages[stage].links.map((linkIdx, i) => (
        <EntanglementLink
          key={i}
          start={nodePositions[linkIdx[0]]}
          end={nodePositions[linkIdx[1]]}
          dashed={stage === 3}
          stage={stage}
        />
      ))}
      <QuantumParticleField count={1200} />
    </group>
  );
}

// Simple node component (no hooks)
function EntanglementNode({
  position,
  color,
  label,
  stage,
  active,
}: {
  position: [number, number, number];
  color: string;
  label: string;
  stage: number;
  active: boolean;
}) {
  return (
    <group position={position}>
      <Dodecahedron args={[0.4, 0]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 2.5 : 1.2}
          wireframe={stage === 3}
        />
      </Dodecahedron>
      <Text position={[0, 0.6, 0]} fontSize={0.2} color="white">
        {label}
      </Text>
    </group>
  );
}

// Simple link component (no hooks)
function EntanglementLink({
  start,
  end,
  dashed = false,
  stage,
}: {
  start: [number, number, number];
  end: [number, number, number];
  dashed?: boolean;
  stage: number;
}) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  return (
    <Line
      points={points}
      color={stage === 2 ? 'yellow' : 'cyan'}
      lineWidth={3}
      dashed={dashed}
      dashSize={0.3}
      gapSize={0.15}
      transparent
      opacity={0.8}
    />
  );
}

// ── Main exported component ───────────────────────────────────────────────────
export default function PrivacyEntanglementFlow() {
  const [stage, setStage] = useState(0); // 0: Isolate, 1: Entangle, 2: Mix, 3: Disentangle
  const equations = [initialState, entangledState, mixedState, disentangledState];
  const stageNames = ['Isolate Tokens', 'Entangle', 'Mix States', 'Disentangle'];

  return (
    <div className="relative w-full h-[450px] md:h-[650px] rounded-2xl overflow-hidden border border-cyan-800/30 shadow-2xl bg-black/40">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={2.5} color="#a0f0ff" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <SceneContent stage={stage} />
      </Canvas>

      {/* HTML overlays – placed OUTSIDE Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Controls – now visible and clickable */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/70 backdrop-blur-md p-3 rounded-lg border border-cyan-800/40 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {stageNames.map((label, i) => (
            <button
              key={i}
              onClick={() => setStage(i)}
              className={`text-xs px-4 py-2 rounded-full transition-all duration-300 ${
                stage === i
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,234,255,0.6)]'
                  : 'bg-black/60 text-cyan-200 hover:bg-cyan-900/30 border border-cyan-300/50'
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Current stage indicator */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md px-6 py-2 rounded-full border border-cyan-800/40 pointer-events-none">
          <p className="text-sm font-medium text-cyan-300">
            Current State: {stageNames[stage]}
          </p>
        </div>

        {/* Equation overlay */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md p-4 rounded-lg max-w-xs pointer-events-auto">
          <h3 className="text-sm font-bold text-cyan-300 mb-2">SUSY Swap State</h3>
          <div dangerouslySetInnerHTML={{ __html: equations[stage] }} className="text-white text-sm" />
        </div>

        {/* Footer info */}
        <p className="text-xs text-gray-400 absolute bottom-4 right-4">
          SUSY Swaps: Quantum entanglement merges states for privacy mixing; disentanglement yields untraceable outputs.
        </p>
      </div>
    </div>
  );
}
