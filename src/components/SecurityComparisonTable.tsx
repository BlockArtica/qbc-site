'use client';

import { motion } from 'framer-motion';

const comparisonData = [
  {
    feature: 'Signature Scheme',
    dilithium: 'Dilithium (CRYSTALS-Dilithium)',
    btc: 'ECDSA (Elliptic Curve Digital Signature Algorithm)',
    advantage: 'Post-quantum secure against Shor/Grover attacks.',
  },
  {
    feature: 'Key Length (Public)',
    dilithium: '1312 bytes (Dilithium2)',
    btc: '65 bytes (uncompressed)',
    advantage: 'Larger but quantum-resistant; optimized for NISQ.',
  },
  {
    feature: 'Key Length (Private)',
    dilithium: '2528 bytes (Dilithium2)',
    btc: '32 bytes',
    advantage: 'Enhanced security margin (128-bit post-quantum).',
  },
  {
    feature: 'Signature Size',
    dilithium: '2420 bytes (Dilithium2)',
    btc: '72 bytes',
    advantage: 'Trade-off for quantum resistance; batching reduces overhead.',
  },
  {
    feature: 'Security Level',
    dilithium: 'NIST Level 2 (AES-192 equivalent post-quantum)',
    btc: '128-bit classical (vulnerable to quantum)',
    advantage: 'Future-proof; withstands 2^64 Grover searches.',
  },
  {
    feature: 'Verification Time',
    dilithium: '~0.1 ms (optimized)',
    btc: '~0.05 ms',
    advantage: 'Comparable; hardware acceleration planned.',
  },
  {
    feature: 'Attack Resistance',
    dilithium: 'Lattice-based; no known quantum breaks.',
    btc: 'Curve-based; broken by Shor in polynomial time.',
    advantage: 'Essential for quantum era (est. 2030 threat).',
  },
  {
    feature: 'Implementation',
    dilithium: 'dilithium-py library',
    btc: 'secp256k1',
    advantage: 'Integrated with Qiskit for hybrid proofs.',
  },
];

export default function SecurityComparisonTable() {
  return (
    <motion.div 
      className="overflow-x-auto rounded-2xl border border-cyan-800/30 shadow-2xl bg-black/40 p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="border-b border-cyan-800/50">
            <th className="py-4 px-6 font-bold text-cyan-300">Feature</th>
            <th className="py-4 px-6 font-bold text-yellow-300">Dilithium (QBC)</th>
            <th className="py-4 px-6 font-bold text-gray-400">ECDSA (BTC)</th>
            <th className="py-4 px-6 font-bold text-cyan-300">QBC Advantage</th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map((row, i) => (
            <motion.tr 
              key={i}
              className="border-b border-cyan-800/20 hover:bg-cyan-900/10 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <td className="py-4 px-6">{row.feature}</td>
              <td className="py-4 px-6 text-yellow-200">{row.dilithium}</td>
              <td className="py-4 px-6 text-gray-300">{row.btc}</td>
              <td className="py-4 px-6 text-cyan-200">{row.advantage}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
