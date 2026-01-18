// src/components/EntanglementScene.tsx
'use client';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Dodecahedron, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import katex from 'katex';
import 'katex/dist/katex.min.css';
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
// ── Inner 3D scene (only Three.js objects + hooks here) ───────────────────────
function SceneContent({ stage }: { stage: number }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });
  const nodePositions: [number, number, number][] = [
    [-3, 0, 0],
    [0, 3, 0],
    [3, 0, 0],
    [0, -3, 0],
  ];
  const stages = [
    { links: [] },
    { links: [[0,1], [1,2], [2,3], [3,0], [0,2], [1,3]] },
    { links: [[0,2], [1,3], [0,3], [1,2]] },
    { links: [[0,0], [1,1], [2,2], [3,3]] },
  ];
  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, i) => (
        <EntanglementNode
          key={i}
          position={pos}
          color={['cyan', 'yellow', 'magenta', 'green'][i]}
          label={`Token ${String.fromCharCode(65 + i)}`}
          stage={stage}
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
    </group>
  );
}
// ── Simple node component (no hooks) ──────────────────────────────────────────
function EntanglementNode({
  position,
  color,
  label,
  stage,
}: {
  position: [number, number, number];
  color: string;
  label: string;
  stage: number;
}) {
  return (
    <group position={position}>
      <Dodecahedron args={[0.4, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} wireframe={stage === 3} />
      </Dodecahedron>
      <Text position={[0, 0.6, 0]} fontSize={0.2} color="white">
        {label}
      </Text>
    </group>
  );
}
// ── Simple link component (no hooks) ──────────────────────────────────────────
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
// ── Main exported component – HTML UI is OUTSIDE Canvas ───────────────────────
export default function EntanglementScene() {
  const [stage, setStage] = useState(0); // 0: Isolate, 1: Entangle, 2: Mix, 3: Disentangle
  const equations = [initialState, entangledState, mixedState, disentangledState];
  return (
    <div className="relative h-[600px] md:h-[900px] rounded-2xl overflow-hidden border border-cyan-800/30 shadow-2xl">
      {/* Canvas – ONLY Three.js objects are allowed inside */}
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={2.5} color="#a0f0ff" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        {/* All 3D content and useFrame are inside Canvas */}
        <SceneContent stage={stage} />
      </Canvas>
      {/* HTML UI overlays – placed OUTSIDE Canvas, absolute positioned */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Controls */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/60 p-4 rounded-lg pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {['Isolate Tokens', 'Entangle', 'Mix States', 'Disentangle'].map((label, i) => (
            <button
              key={i}
              onClick={() => setStage(i)}
              className={`text-xs px-3 py-1 rounded-full ${stage === i ? 'bg-cyan-500' : 'bg-transparent'} border border-cyan-300`}
            >
              {label}
            </button>
          ))}
        </motion.div>
        {/* Equation overlay */}
        <div className="absolute top-4 left-4 bg-black/60 p-4 rounded-lg max-w-xs pointer-events-auto">
          <h3 className="text-sm font-bold text-cyan-300 mb-2">SUSY Swap State</h3>
          <div dangerouslySetInnerHTML={{ __html: equations[stage] }} className="text-white text-sm" />
        </div>
      </div>
    </div>
  );
}
