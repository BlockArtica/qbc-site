// src/components/QuantumTokenShowcase.tsx
'use client';

import { motion } from 'framer-motion';
import AdvancedAdinkraOrb from './AdvancedAdinkraOrb';

interface QuantumTokenShowcaseProps {
  formulaLeft: string;
  formulaRight: string;
}

export default function QuantumTokenShowcase({ formulaLeft, formulaRight }: QuantumTokenShowcaseProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1.1 }} className="mt-16 w-full max-w-5xl mx-auto">
      <div className="relative bg-black/35 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-lg shadow-cyan-900/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
          {/* Left: A Token is + Left Formula */}
          <div className="space-y-3">
            <p className="text-lg font-semibold text-cyan-300">A Token is</p>
            <p className="text-sm text-gray-300 leading-relaxed max-w-xs mx-auto">
              a quantum entity, provably unique and tamper-evident by physical law
            </p>
            <div
              className="text-base md:text-lg text-cyan-200 mt-3 font-light"
              dangerouslySetInnerHTML={{ __html: formulaLeft }}
            />
          </div>

          {/* Center: Advanced Interactive Adinkra Orb */}
          <div className="flex justify-center">
            <AdvancedAdinkraOrb />
          </div>

          {/* Right: SUSY multiplet + Right Formula */}
          <div className="space-y-3">
            <p className="text-lg font-semibold text-yellow-300">SUSY multiplet</p>
            <p className="text-sm text-gray-300 leading-relaxed max-w-xs mx-auto">
              boson-fermion pair, secured forever by the no-cloning theorem
            </p>
            <div
              className="text-base md:text-lg text-cyan-200 mt-3 font-light"
              dangerouslySetInnerHTML={{ __html: formulaRight }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
