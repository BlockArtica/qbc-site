'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Box, Torus } from '@react-three/drei';
import Image from 'next/image';
import * as THREE from 'three';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import QuantumMintBurnBridge from '@/components/QuantumMintBurnBridge';
import HeroBackground from '@/components/HeroBackground';
import FeatureCardGrid from '@/components/FeatureCardGrid';
import QuantumTokenShowcase from '@/components/QuantumTokenShowcase';
import HighTechCTA from '@/components/HighTechCTA';
import SectionTitle from '@/components/SectionTitle';
import AdvancedAdinkraOrb from '@/components/AdvancedAdinkraOrb';
import QuantumEntanglementBridge from '@/components/QuantumEntanglementBridge';
import SusyTokenSimulation from '@/components/SusyTokenSimulation';
import PoSAEnergyGraph from '@/components/PoSAEnergyGraph';
import PrivacyEntanglementFlow from '@/components/PrivacyEntanglementFlow';
import SecurityComparisonTable from '@/components/SecurityComparisonTable';
import QubitcoinTitle from '@/components/QubitcoinTitle';
import TopNav from '@/components/TopNav';
import QuantumSimulationQiskit from '@/components/QuantumSimulationQiskit';

// Explicit type for FeatureCardGrid props (fixes build type error)
interface FeatureItem {
  emoji: string;
  text: string;
  color: 'cyan' | 'yellow'; // Literal union type - matches component expectation
}

const features: FeatureItem[] = [
  { emoji: "⚡", text: "Instant finality", color: "cyan" },
  { emoji: "🔒", text: "Physical unforgeability", color: "yellow" },
  { emoji: "🌐", text: "Fully decentralized", color: "cyan" },
  { emoji: "💎", text: "21M fixed supply", color: "yellow" },
  { emoji: "🔮", text: "Entangled privacy swaps", color: "cyan" },
  { emoji: "🔗", text: "Ethereum & Solana bridge", color: "yellow" },
];

// KaTeX formulas (swapped + strict: 'ignore' to suppress Unicode warnings)
const formulaEntangled = katex.renderToString(
  '|\\Psi\\rangle = \\alpha |B\\rangle \\otimes |F\\rangle + \\beta |F\\rangle \\otimes |B\\rangle',
  { throwOnError: false, displayMode: true, strict: 'ignore' }
);
const formulaStandard = katex.renderToString(
  '|\\Psi\\rangle = \\sum_{k=0}^{3} c_k |\\phi_k\\rangle',
  { throwOnError: false, displayMode: true, strict: 'ignore' }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Top Navigation Menu – Sleek, floating, mobile-friendly */}
      <TopNav />

      {/* HERO PAGE – Particles 300% smaller & slower (subtle mist only) */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 py-32 text-center border-t border-white/10">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <HeroBackground /> {/* Particles 300% smaller & slower – subtle mist only */}
        </div>
        <div className="relative z-10 max-w-7xl w-full">
          <QubitcoinTitle />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.6 }}
            className="mt-8 text-xl md:text-3xl font-light italic text-cyan-200/90 max-w-5xl mx-auto leading-relaxed"
          >
            Tokens are SUSY multiplets. Boson components store value in supersymmetric states. Fermions enforce integrity through Dilithium lattice proofs. No-cloning theorem guarantees unforgeability. Deploy your NISQ rig. Mine PoSA blocks. Entangle tokens across chains. Qubitcoin. Physics first. Quantum secure. Post-quantum ready.
          </motion.p>

          {/* Feature Cards Grid */}
          <SectionTitle text="Core Features" color="cyan-400/90" size="small" className="mb-8 mt-16" />
          <ul className="text-lg max-w-5xl mx-auto mb-8 text-gray-300 leading-relaxed list-disc pl-6 space-y-4">
            <li><span className="highlight-copy">Instant finality</span> achieved through SUSY alignment verification. No probabilistic consensus delays.</li>
            <li><span className="highlight-copy">Physical unforgeability</span> enforced by no-cloning theorem. Any fork or double-spend collapses multiplet symmetry instantly.</li>
            <li><span className="highlight-copy">Full decentralization</span> with no central custodian. Every node validates quantum proofs.</li>
            <li><span className="highlight-copy">Fixed 21M supply</span> capped by physics. No inflation possible.</li>
            <li><span className="highlight-copy">Entangled privacy swaps</span> via zero-knowledge proofs. Balances remain hidden.</li>
            <li><span className="highlight-copy">Cross-chain bridges</span> to Ethereum and Solana secured by Dilithium signatures and lattice oracles.</li>
            <li><span className="highlight-copy">Dilithium signatures</span> provide NIST-approved post-quantum security. Resistant to Shor and Grover attacks.</li>
            <li><span className="highlight-copy">VQE solvers</span> on NISQ devices enable low-energy mining. Millijoules per block.</li>
          </ul>
          <FeatureCardGrid features={features} />

          {/* Quantum Token Showcase */}
          <SectionTitle text="Quantum Token State" color="cyan-400/90" size="small" className="mb-8 mt-16" />
          <ul className="text-lg max-w-5xl mx-auto mb-8 text-gray-300 leading-relaxed list-disc pl-6 space-y-4">
            <li><span className="highlight-copy">SUSY multiplets</span> consist of boson-fermion pairs. Bosons store immutable value in supersymmetric states. Fermions enforce integrity via lattice-based proofs.</li>
            <li><span className="highlight-copy">Entanglement</span> enables privacy swaps. Zero-knowledge. Post-quantum secure.</li>
            <li><span className="highlight-copy">No-cloning theorem</span> ensures any tampering attempt collapses the symmetry. Triggering immediate network rejection.</li>
            <li><span className="highlight-copy">Central orb</span> visualizes Adinkra bipartite graphs encoding multiplets. Enabling visual symmetry analysis and robust error correction on noisy NISQ hardware.</li>
            <li><span className="highlight-copy">Adinkra graphs</span> encode supersymmetry multiplets. Bipartite structure represents boson-fermion pairings.</li>
            <li><span className="highlight-copy">Error correction</span> leverages SUSY symmetry breaking for detection. Immediate collapse on violation.</li>
          </ul>
          <QuantumTokenShowcase
            formulaLeft={formulaEntangled}
            formulaRight={formulaStandard}
          />

          {/* CTA */}
          <HighTechCTA />
        </div>
      </section>

      {/* VISION – Two paragraphs, no bullets, more structured/precise */}
      <motion.section
        id="vision"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="py-40 px-6 md:px-12 max-w-7xl mx-auto text-center relative z-10 border-t border-white/10"
      >
        <SectionTitle text="The Vision" color="cyan-400/90" />
        <p className="text-xl max-w-5xl mx-auto leading-relaxed text-gray-300 mb-8">
          Qubitcoin addresses the existential threat quantum computing poses to classical blockchains. ECDSA signatures are vulnerable to Shor's algorithm in polynomial time. Energy consumption is unsustainable. Qubitcoin anchors value in physics. The no-cloning theorem and supersymmetry make tokens inherently unforgeable. Tamper-evident. Verifiable by nature itself.
        </p>
        <p className="text-xl max-w-5xl mx-auto leading-relaxed text-gray-300">
          PoSA enables low-energy mining on NISQ devices with VQE solvers. Dilithium signatures provide NIST-approved post-quantum security. The network is future-proof against Shor and Grover attacks. This is the next era of digital assets. Deploy. Mine. Entangle. Secure.
        </p>
      </motion.section>

      {/* SUSY TOKENS – Info left, Simulation right */}
      <motion.section
        id="susy"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="py-40 px-6 md:px-12 bg-black/40 relative z-10 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle text="Supersymmetric Tokens" color="cyan-400/90" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Left: Detailed explanation */}
            <div className="space-y-8 text-lg leading-relaxed text-gray-300">
              <p>
                Every Qubitcoin token is a SUSY multiplet. A boson-fermion pair. The bosonic component stores value in supersymmetric states. The fermionic component enforces integrity through lattice-based proofs. This draws from Adinkra graph encodings for error correction on noisy quantum hardware.
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li><span className="highlight-copy">Tampering attempts</span> violate SUSY symmetry and the no-cloning theorem. Triggering immediate network rejection.</li>
                <li><span className="highlight-copy">The system uses Dilithium signatures</span> (NIST post-quantum) for verification. Resistant to Shor and Grover attacks.</li>
                <li><span className="highlight-copy">Adinkra symbols</span> encode 4D supersymmetry. Bipartite graphs represent boson-fermion pairings.</li>
                <li><span className="highlight-copy">SUSY breaking</span> detection leverages energy differences between bosons and fermions.</li>
              </ul>
              <p>
                Action: Deploy your NISQ rig. Mine PoSA blocks. Entangle tokens across chains for privacy swaps. Qubitcoin. Unforgeable by physics.
              </p>
            </div>

            {/* Right: SusyTokenSimulation component (smaller height) */}
            <div className="h-[500px] md:h-[700px] rounded-2xl overflow-hidden border border-cyan-800/30 shadow-2xl">
              <SusyTokenSimulation />
            </div>
          </div>
        </div>
      </motion.section>

      {/* PoSA */}
      <motion.section
        id="posa"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="py-40 px-6 md:px-12 relative z-10 text-center border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle text="Proof-of-SUSY-Alignment (PoSA)" color="cyan-400/90" />
          <ul className="text-xl max-w-5xl mx-auto leading-relaxed text-gray-300 mb-10 list-disc pl-6 space-y-4">
            <li><span className="highlight-copy">Miners solve</span> randomized SUSY Hamiltonians using Variational Quantum Eigensolver (VQE) on NISQ hardware.</li>
            <li><span className="highlight-copy">Achieving ground state</span> below threshold equals valid proof. Approximately 100 iterations. Millijoules per block.</li>
            <li><span className="highlight-copy">Rewards halve</span> every 210,000 blocks plus pooled transaction fees.</li>
            <li><span className="highlight-copy">VQE optimizes</span> variational parameters to approximate ground state. NISQ-tolerant algorithm.</li>
            <li><span className="highlight-copy">SUSY Hamiltonians</span> incorporate boson-fermion interactions. Energy degeneracy for unbroken symmetry.</li>
            <li><span className="highlight-copy">Proof validity</span> tied to energy below threshold. Invalid proofs rejected instantly.</li>
            <li><span className="highlight-copy">Deploy Qiskit integration</span> now. Secure the network with physics.</li>
          </ul>
          <div className="h-[500px] md:h-[700px] rounded-2xl overflow-hidden border border-cyan-800/30 shadow-2xl mx-auto">
            <PoSAEnergyGraph />
          </div>
        </div>
      </motion.section>

      {/* Privacy & Quantum Entanglement */}
      <motion.section
        id="privacy"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="py-40 px-6 md:px-12 bg-black/40 relative z-10 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto text-center">
          <SectionTitle text="Privacy & Quantum Entanglement" color="cyan-400/90" />
          <ul className="text-xl max-w-5xl mx-auto leading-relaxed text-gray-300 mb-10 list-disc pl-6 space-y-4">
            <li><span className="highlight-copy">Qubitcoin tokens</span> are entangled across chains via quantum-secure channels.</li>
            <li><span className="highlight-copy">Privacy is preserved</span> through zero-knowledge proofs and entangled state swaps. No public ledger exposure of balances or transaction graphs.</li>
            <li><span className="highlight-copy">The no-cloning theorem</span> guarantees unforgeability even under quantum attack.</li>
            <li><span className="highlight-copy">Zero-knowledge proofs</span> allow verification without revealing underlying data.</li>
            <li><span className="highlight-copy">Entangled swaps</span> mix states across chains. Outputs untraceable to inputs.</li>
            <li><span className="highlight-copy">Quantum-secure channels</span> use post-quantum cryptography. Resistant to quantum eavesdropping.</li>
          </ul>
          <div className="h-[500px] md:h-[700px] rounded-2xl overflow-hidden border border-cyan-800/30 shadow-2xl mx-auto">
            <PrivacyEntanglementFlow />
          </div>
        </div>
      </motion.section>

      {/* Security Comparison */}
      <motion.section
        id="security"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="py-40 px-6 md:px-12 relative z-10 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto text-center">
          <SectionTitle text="Security: Dilithium Keys" color="cyan-400/90" />
          <p className="text-xl max-w-5xl mx-auto leading-relaxed text-gray-300 mb-10">
            Qubitcoin uses CRYSTALS-Dilithium. NIST-approved lattice-based post-quantum signatures. Public keys approximately 1312 bytes. Private approximately 2528 bytes. Signatures approximately 2420 bytes. Security level matches AES-192 post-quantum. Resistant to Shor and Grover attacks. Verification time approximately 0.1 ms optimized. Integrated with Qiskit for hybrid NISQ proofs.
          </p>
          <div className="rounded-2xl overflow-hidden border border-cyan-800/30 shadow-2xl mx-auto">
            <SecurityComparisonTable />
          </div>
        </div>
      </motion.section>

      {/* Wrapped QBC Bridge – Info right, Component left */}
      <motion.section
        id="bridge"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="py-40 px-6 md:px-12 bg-black/40 relative z-10 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle text="Wrapped QBC Bridge" color="cyan-400/90" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Left: Mint/Burn component (smaller height) */}
            <div className="h-[500px] md:h-[700px] rounded-2xl overflow-hidden border border-cyan-800/30 shadow-2xl">
              <QuantumMintBurnBridge />
            </div>

            {/* Right: Detailed explanation with bullet points */}
            <div className="space-y-8 text-lg leading-relaxed text-gray-300">
              <p>
                The Wrapped QBC Bridge is a totally new breed of smart contract. Physics-anchored. Post-quantum secure. Supersymmetry-verified. It enables seamless cross-chain liquidity without compromising core security.
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li><span className="highlight-copy">SUSY oracles</span> verify multiplet alignment during mint/burn.</li>
                <li><span className="highlight-copy">Lock QBC</span> on source chain. Mint wQBC on Ethereum/Solana with 1:1 backing.</li>
                <li><span className="highlight-copy">Burn wQBC</span> to release original QBC. All secured by Dilithium signatures.</li>
                <li><span className="highlight-copy">Amplified DeFi</span> unlock liquidity for yield farming. Lending. Trading while preserving physics-based security.</li>
                <li><span className="highlight-copy">Post-quantum safe</span> no custodian. Entanglement enables privacy during transfers.</li>
                <li><span className="highlight-copy">Oracle verification</span> uses SUSY alignment checks from white paper. Ensuring multiplet integrity across chains.</li>
                <li><span className="highlight-copy">1:1 backing</span> maintained through locked reserves. Auditable on-chain.</li>
              </ul>
              <p>
                Action: Bridge your QBC now. Access DeFi liquidity while keeping physics-based security.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Tokenisation Section – New, card-based */}
      <motion.section
        id="tokenisation"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="py-40 px-6 md:px-12 max-w-7xl mx-auto relative z-10 border-t border-white/10"
      >
        <SectionTitle text="Tokenisation" color="cyan-400/90" />
        <ul className="text-xl max-w-5xl mx-auto leading-relaxed text-gray-300 mb-10 list-disc pl-6 space-y-4">
          <li><span className="highlight-copy">Qubitcoin tokens</span> are native physics-secured assets.</li>
          <li><span className="highlight-copy">Tokenisation occurs</span> on-chain via SUSY alignment proofs.</li>
          <li><span className="highlight-copy">Each token</span> is a unique multiplet. Minted through PoSA consensus.</li>
          <li><span className="highlight-copy">Bridged to DeFi</span> via the Wrapped QBC protocol.</li>
          <li><span className="highlight-copy">SUSY proofs</span> ensure physical integrity during minting.</li>
          <li><span className="highlight-copy">PoSA consensus</span> distributes tokens based on VQE solutions.</li>
        </ul>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Tokenisation Cards */}
          <div className="card text-center p-8">
            <div className="text-5xl mb-4 text-cyan-400">1</div>
            <h3 className="text-2xl font-bold mb-4">SUSY Minting</h3>
            <p className="text-gray-300">Tokens minted via PoSA VQE proofs on NISQ hardware. Ground state alignment equals valid mint.</p>
          </div>
          <div className="card text-center p-8">
            <div className="text-5xl mb-4 text-cyan-400">2</div>
            <h3 className="text-2xl font-bold mb-4">Lattice Security</h3>
            <p className="text-gray-300">Dilithium signatures ensure post-quantum security. Resistant to Shor/Grover attacks.</p>
          </div>
          <div className="card text-center p-8">
            <div className="text-5xl mb-4 text-cyan-400">3</div>
            <h3 className="text-2xl font-bold mb-4">No-Cloning</h3>
            <p className="text-gray-300">Physics-enforced uniqueness. Tamper attempts collapse symmetry instantly.</p>
          </div>
          <div className="card text-center p-8">
            <div className="text-5xl mb-4 text-cyan-400">4</div>
            <h3 className="text-2xl font-bold mb-4">Entanglement Bridge</h3>
            <p className="text-gray-300">Cross-chain liquidity with privacy swaps. Zero-knowledge. Physics-secured.</p>
          </div>
        </div>
      </motion.section>

      {/* Token Sale Section – New, visual, well-designed */}
      <motion.section
        id="token-sale"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="py-40 px-6 md:px-12 bg-black/40 relative z-10 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto text-center">
          <SectionTitle text="Token Sale" color="cyan-400/90" />
          <p className="text-xl max-w-5xl mx-auto leading-relaxed text-gray-300 mb-12">
            Qubitcoin launches with a 5M raise. 500k tokens released at launch. Starting market cap 15M. Available on major chains. Physics-backed value from day one.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Token Sale Cards */}
            <div className="card p-8 text-center">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Total Supply</h3>
              <p className="text-4xl font-black text-white">21M</p>
              <p className="text-gray-400 mt-2">Fixed by physics</p>
            </div>
            <div className="card p-8 text-center">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Sale Raise</h3>
              <p className="text-4xl font-black text-white">5M</p>
              <p className="text-gray-400 mt-2">Target raise</p>
            </div>
            <div className="card p-8 text-center">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Tokens Released</h3>
              <p className="text-4xl font-black text-white">500k</p>
              <p className="text-gray-400 mt-2">Initial circulation</p>
            </div>
            <div className="card p-8 text-center">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Starting Market Cap</h3>
              <p className="text-4xl font-black text-white">15M</p>
              <p className="text-gray-400 mt-2">At launch</p>
            </div>
          </div>
          {/* Allocation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="card p-8 text-center">
              <div className="text-5xl mb-4 text-cyan-400">40%</div>
              <h3 className="text-xl font-bold">Community & Liquidity</h3>
            </div>
            <div className="card p-8 text-center">
              <div className="text-5xl mb-4 text-cyan-400">30%</div>
              <h3 className="text-xl font-bold">Ecosystem & Development</h3>
            </div>
            <div className="card p-8 text-center">
              <div className="text-5xl mb-4 text-cyan-400">20%</div>
              <h3 className="text-xl font-bold">Team & Advisors</h3>
            </div>
            <div className="card p-8 text-center md:col-span-3">
              <div className="text-5xl mb-4 text-cyan-400">10%</div>
              <h3 className="text-xl font-bold">Pre-mine (Locked)</h3>
            </div>
          </div>
          {/* Call-to-Action */}
          <a
            href="#token-sale" // Placeholder — change to real sale page/link later
            className="inline-block px-12 py-6 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full text-black font-bold text-xl shadow-lg shadow-cyan-500/40 hover:shadow-cyan-500/60 hover:scale-105 transition-all duration-300"
          >
            Join Token Sale Now
          </a>
        </div>
      </motion.section>

      {/* Quantum Simulation with Qiskit Section */}
      <QuantumSimulationQiskit />

      {/* Final CTA */}
      <section className="py-40 px-6 md:px-12 text-center relative z-10 border-t border-white/10">
        <SectionTitle text="The Future is Physical" color="cyan-400/90" />
        <p className="text-2xl md:text-3xl max-w-5xl mx-auto mb-16 text-gray-200">
          Qubitcoin. Secured by the laws of nature.
        </p>
        <HighTechCTA />
      </section>

      {/* Copyright at bottom */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-white/10">
        © 2026 SUSY Labs. All rights reserved.
      </footer>
    </div>
  );
}
