'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import create from 'zustand';
import { useQuery } from '@tanstack/react-query';

// Minimal Zustand store for wallet stubs
const useWalletStore = create((set) => ({
  jwt: '',
  address: '',
  balance: 0,
  setJwt: (jwt: string) => set({ jwt }),
  setAddress: (address: string) => set({ address }),
  setBalance: (balance: number) => set({ balance }),
}));

export default function Home() {
  const { jwt, address, balance, setJwt, setAddress, setBalance } = useWalletStore();
  const [transferAmount, setTransferAmount] = useState(0);
  const [toAddress, setToAddress] = useState('');
  const [energyData, setEnergyData] = useState<{ time: string; energy: number }[]>([]);

  // Placeholder: fetch metrics stub
  const { data: metrics } = useQuery({
    queryKey: ['metrics'],
    queryFn: async () => {
      // Replace with actual PoSA backend later
      return { energy: Math.random() * 100, txns: Math.floor(Math.random() * 50) };
    },
    staleTime: 5000,
  });

  // Append latest energy to chart
  if (metrics?.energy) {
    setEnergyData((prev) => [...prev, { time: new Date().toLocaleTimeString(), energy: metrics.energy }].slice(-20));
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">Qubitcoin: A Supersymmetric Framework for Physics-Secured Digital Assets</h1>
        <p className="italic mt-2">January 11, 2026</p>
      </header>

      <section className="space-y-4 mb-10">
        <p>
          Commerce on the internet has come to rely almost exclusively on code-based ledgers for financial transactions,
          but these systems suffer from trust issues, energy inefficiency, and vulnerability to quantum attacks.
        </p>
        <p>
          Qubitcoin proposes a new electronic asset scheme based on the fundamental laws of quantum mechanics, where value
          is secured not by cryptographic hardness but by the no-cloning theorem and supersymmetric principles.
        </p>
        <p>
          Tokens are encoded via Adinkra diagrams and minted using a Proof-of-SUSY-Alignment (PoSA) mechanism, producing
          unforgeable units with a capped supply of 21 million and programmed halvings.
        </p>
        <p>
          This represents a paradigm shift from computational security to physical security, suitable for deployment
          on near-term NISQ hardware and future fault-tolerant quantum networks.
        </p>
      </section>

      <section className="mb-10 text-center">
        <Image src="/adinkra.png" alt="Adinkra Diagram (pages 7-8)" width={300} height={300} className="mx-auto" />
        <p className="mt-2 text-gray-500">Adinkra diagram (visual encoding stub)</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Downloads</h2>
        <p className="text-gray-500">Whitepaper PDF (patent-pending) will be enabled here.</p>
        <p className="mt-2"><a href="/miner.exe" className="text-blue-500">Miner Binary (PoSA Client, Page 10)</a></p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Live Metrics (Page 14)</h2>
        <p className="text-gray-500">Proof-of-SUSY-Alignment convergence and validation energy.</p>
        <div className="mt-4">
          <LineChart width={600} height={300} data={energyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="energy" stroke="#8884d8" />
          </LineChart>
        </div>
        <p className="mt-2">Confirmed Txns: {metrics?.txns || 0}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Wallet (Stubs)</h2>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 mr-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        <div className="mt-2">Balance: {balance} QBC</div>
        <input
          type="number"
          placeholder="Amount"
          value={transferAmount}
          onChange={(e) => setTransferAmount(+e.target.value)}
          className="border p-2 mt-2 mr-2"
        />
        <input
          type="text"
          placeholder="To Address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          className="border p-2 mt-2 mr-2"
        />
        <button className="bg-red-500 text-white px-4 py-2 rounded mt-2">Transfer</button>
      </section>
    </div>
  );
}

