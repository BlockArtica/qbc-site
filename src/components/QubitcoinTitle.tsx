// src/components/QubitcoinTitle.tsx
'use client';

import { motion } from 'framer-motion';

export default function QubitcoinTitle() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#00eaff] to-[#ffd700] drop-shadow-[0_0_20px_rgba(0,234,255,0.5)]"
    >
      QUBITCOIN
    </motion.h1>
  );
}
