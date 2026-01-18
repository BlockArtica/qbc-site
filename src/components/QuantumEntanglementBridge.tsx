// src/components/QuantumEntanglementBridge.tsx
'use client';

import EntanglementScene from './EntanglementScene';

export default function QuantumEntanglementBridge() {
  return (
    <div className="relative w-full h-[600px] md:h-[900px] rounded-2xl overflow-hidden border border-cyan-800/30 shadow-2xl">
      {/* Put the scene content directly — no extra wrapping Canvas here */}
      <EntanglementScene />
    </div>
  );
}
