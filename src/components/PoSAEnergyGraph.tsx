// src/components/PoSAEnergyGraph.tsx
'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
} from 'recharts';
import { motion } from 'framer-motion';

// Simulated VQE data: iterations vs multiple metrics
const generateData = (iterations: number) => {
  return Array.from({ length: iterations }, (_, i) => ({
    iteration: i,
    energy: Math.random() * (5 - i / 20) - 2,
    threshold: 0.5,
    fidelity: Math.min(1, i / 50 + 0.5),
    noise: Math.random() * 0.2,
    convergenceRate: (i / iterations) * 100,
    quantumCost: Math.random() * 10 + 50,
    energyDelta: Math.random() * 0.1 - 0.05,
    proofValidity: Math.min(1, i / 80 + 0.2),
    networkConsensus: Math.min(1, i / 60 + 0.3),
    nisqStability: Math.random() * 0.15,
    latticeStrength: Math.min(1, i / 70 + 0.4),
  }));
};

export default function PoSAEnergyGraph() {
  const [data] = useState(generateData(100));
  const [selectedMetric, setSelectedMetric] = useState('all');

  const metrics = [
    { key: 'energy', color: '#00eaff', name: 'Energy Level' },
    { key: 'threshold', color: '#ff0000', name: 'Difficulty Threshold' },
    { key: 'fidelity', color: '#ffd700', name: 'Fidelity (>95%)' },
    { key: 'noise', color: '#ff00ff', name: 'NISQ Noise' },
    { key: 'convergenceRate', color: '#00ff00', name: 'Convergence Rate' },
    { key: 'quantumCost', color: '#ff8800', name: 'Quantum Cost (mJ/block)' },
    { key: 'energyDelta', color: '#88ff00', name: 'Energy Delta per Iteration' },
    { key: 'proofValidity', color: '#00ffff', name: 'Proof Validity Score' },
    { key: 'networkConsensus', color: '#ff00aa', name: 'Network Consensus Strength' },
    { key: 'nisqStability', color: '#aaff00', name: 'NISQ Hardware Stability' },
    { key: 'latticeStrength', color: '#ffaa00', name: 'Lattice Proof Strength' },
  ];

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-cyan-800/30 shadow-2xl bg-black/40 p-6 flex flex-col">
      {/* Chart wrapper – explicit fixed height + flex-grow = guaranteed positive size */}
      <div className="flex-grow" style={{ height: '100%', minHeight: '480px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 90 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="iteration"
              stroke="#fff"
              label={{ value: 'Iterations', position: 'insideBottom', offset: -15, fill: '#aaa' }}
            />
            <YAxis
              stroke="#fff"
              label={{ value: selectedMetric === 'all' ? 'Metrics' : selectedMetric, angle: -90, position: 'insideLeft', fill: '#aaa' }}
            />
            <Tooltip
              contentStyle={{ background: '#000', border: '1px solid #00eaff', borderRadius: '8px', color: '#fff' }}
            />
            <Legend wrapperStyle={{ color: '#fff' }} />
            {metrics.map((m) => (
              <Line
                key={m.key}
                type="monotone"
                dataKey={m.key}
                stroke={m.color}
                dot={false}
                activeDot={{ r: 8 }}
                hide={selectedMetric !== m.key && selectedMetric !== 'all'}
              />
            ))}
            <Scatter dataKey="energy" fill="#00eaff" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Toggles – slightly higher than last (now perfect balance – no overlap with labels) */}
      <motion.div
        className="mt-6 flex flex-wrap gap-2 justify-center bg-black/70 backdrop-blur-md p-4 rounded-xl border border-cyan-800/40 shadow-lg pointer-events-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={() => setSelectedMetric('all')}
          className={`text-xs px-4 py-2 rounded-full transition-all duration-300 ${
            selectedMetric === 'all'
              ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,234,255,0.6)]'
              : 'bg-black/60 text-cyan-200 hover:bg-cyan-900/30 border border-cyan-300/50'
          }`}
        >
          All Metrics
        </button>
        {metrics.map((m) => (
          <button
            key={m.key}
            onClick={() => setSelectedMetric(m.key)}
            className={`text-xs px-4 py-2 rounded-full transition-all duration-300 ${
              selectedMetric === m.key
                ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,234,255,0.6)]'
                : 'bg-black/60 text-cyan-200 hover:bg-cyan-900/30 border border-cyan-300/50'
            }`}
          >
            {m.name}
          </button>
        ))}
      </motion.div>

      {/* Footer info – safe at bottom right */}
      <p className="text-xs text-gray-400 absolute bottom-6 right-6">
        Interactive VQE: ~50 mJ/block, converges in 100 iterations.
      </p>
    </div>
  );
}
