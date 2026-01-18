// src/components/FeatureCardGrid.tsx
'use client';

import { motion } from 'framer-motion';

interface FeatureItem {
  emoji: string;
  text: string;
  color: 'cyan' | 'yellow';
}

interface FeatureCardGridProps {
  features: FeatureItem[];
}

export default function FeatureCardGrid({ features }: FeatureCardGridProps) {
  return (
    <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
      {features.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
          className="bg-black/25 backdrop-blur-lg border border-white/10 hover:border-cyan-500/30 rounded-xl p-5 text-center transition-all hover:shadow-cyan-500/20"
        >
          <div className={`text-4xl mb-2 ${item.color === "cyan" ? "text-accent-cyan" : "text-accent-gold"}`}>
            {item.emoji}
          </div>
          <p className="text-base font-medium text-gray-200">{item.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
