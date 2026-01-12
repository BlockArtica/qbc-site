'use client';

import { useState } from 'react';
import { create } from 'zustand';

interface WalletState {
  address: string;
  balance: number;
  setAddress: (addr: string) => void;
  setBalance: (bal: number) => void;
}

const useWalletStore = create<WalletState>((set) => ({
  address: '',
  balance: 0,
  setAddress: (address) => set({ address }),
  setBalance: (balance) => set({ balance }),
}));

export default function WalletPanel() {
  const { address, balance, setAddress, setBalance } = useWalletStore();
  const [transferAmount, setTransferAmount] = useState(0);
  const [toAddress, setToAddress] = useState('');

  const login = () => alert('Login system coming soon.');
  const getBalance = () => alert('Balance system coming soon.');
  const transfer = () => alert('Transfer system coming soon.');

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Wallet Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={login}
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold transition-colors"
        >
          Login
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="text-white font-mono p-3 bg-gray-900 rounded-lg shadow-lg border border-gray-700">
          Balance: {balance} QBC
        </div>
        <button
          onClick={getBalance}
          className="bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold transition-colors"
        >
          Refresh Balance
        </button>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <input
          type="number"
          placeholder="Amount"
          value={transferAmount}
          onChange={(e) => setTransferAmount(+e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Recipient Address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={transfer}
          className="bg-red-600 hover:bg-red-700 p-3 rounded-lg font-semibold transition-colors"
        >
          Transfer
        </button>
      </div>
    </div>
  );
}

