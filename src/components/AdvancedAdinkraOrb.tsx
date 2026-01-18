// src/components/AdvancedAdinkraOrb.tsx
'use client';

import { useState } from 'react'; // ← This fixes the "useState is not defined" error
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Torus } from '@react-three/drei';
import Image from 'next/image';
import * as THREE from 'three';
import QuantumParticleField from './QuantumParticleField';

export default function AdvancedAdinkraOrb() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Scroll-based parallax (from PDF source)
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <motion.div
      className="relative w-80 h-80 md:w-[28rem] md:h-[28rem] mx-auto mt-16 cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
      style={{ scale }}
    >
      {/* Background glow blur */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-yellow-400/20 blur-3xl"
        animate={{ opacity: hovered ? 0.95 : 0.6, scale: hovered ? 1.18 : 1 }}
        transition={{ duration: 0.7 }}
      />

      {/* 3D Canvas overlay for advanced effects */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#ffd700" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />

          {/* Small inner particle field for depth */}
          <QuantumParticleField count={5000} />

          {/* Central orb with dynamic material */}
          <Sphere args={[1.8, 64, 64]}>
            <meshPhysicalMaterial
              color="#ffffff"
              metalness={0.95}
              roughness={0.05}
              clearcoat={1}
              transmission={0.6}
              thickness={1.5}
              emissive="#4b0082"
              emissiveIntensity={hovered ? 1.2 : 0.7}
            />
          </Sphere>

          {/* Rotating rings for complexity */}
          <Torus args={[2.2, 0.15, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#00f0ff" emissive="#00ffff" emissiveIntensity={0.8} />
          </Torus>
        </Canvas>
      </div>

      {/* Static Adinkra image overlay */}
      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden border-2 border-cyan-400/40 shadow-[0_0_50px_rgba(0,234,255,0.3)] p-6 backdrop-blur-sm"
        animate={{
          scale: hovered ? 1.08 : 1,
          rotate: clicked ? 360 : 0,
          boxShadow: hovered ? '0 0 100px rgba(0,234,255,0.6)' : '0 0 50px rgba(0,234,255,0.3)',
        }}
        transition={{ duration: 0.9, type: 'spring', stiffness: 160 }}
      >
        <Image
          src="/adinkra-quantum.png"
          alt="Adinkra Quantum Symbol"
          fill
          className="object-contain transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Click reveal */}
        {clicked && (
          <motion.div
            className="absolute inset-0 bg-black/70 flex items-center justify-center text-center p-10 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-base md:text-lg text-cyan-100 leading-relaxed max-w-md">
              Adinkra diagrams graphically encode SUSY multiplets as bipartite graphs — enabling visual symmetry analysis and robust error correction in noisy quantum hardware.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
