// src/components/SectionTitle.tsx
'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  text: string;
  color?: string; // e.g., 'cyan-400/90' or 'gradient-text'
  size?: 'default' | 'small' | 'large'; // responsive sizing
  className?: string;
}

export default function SectionTitle({
  text,
  color = 'gradient-text', // default to gold-cyan gradient
  size = 'default',
  className = '',
}: SectionTitleProps) {
  const sizeClasses = {
    default: 'text-5xl md:text-6xl',
    small: 'text-4xl md:text-5xl',
    large: 'text-6xl md:text-7xl',
  }[size];

  return (
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className={`font-black tracking-tighter mb-8 ${sizeClasses} ${color} drop-shadow-[0_0_15px_rgba(0,234,255,0.4)] ${className}`}
    >
      {text}
    </motion.h2>
  );
}
