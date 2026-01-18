// src/components/TopNav.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'Vision', href: '#vision' },
  { name: 'SUSY Tokens', href: '#susy' },
  { name: 'PoSA', href: '#posa' },
  { name: 'Privacy & Entanglement', href: '#privacy' },
  { name: 'Security', href: '#security' },
  { name: 'Wrapped Bridge', href: '#bridge' },
  { name: 'Tokenisation', href: '#tokenisation' },
  { name: 'Token Sale', href: '#token-sale' },
];

export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed top-6 right-6 md:top-10 md:right-12 z-50">
      {/* Desktop: Horizontal pill menu */}
      <nav className="hidden md:flex bg-black/40 backdrop-blur-lg border border-cyan-800/30 rounded-full px-6 py-3 shadow-lg shadow-cyan-900/30">
        <ul className="flex gap-6 text-sm font-medium text-cyan-200">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: Hamburger with dropdown */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-black/40 backdrop-blur-lg border border-cyan-800/30 rounded-full shadow-lg shadow-cyan-900/30 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-14 right-0 bg-black/90 backdrop-blur-lg border border-cyan-800/30 rounded-xl shadow-2xl shadow-cyan-900/50 p-6 w-64"
            >
              <ul className="flex flex-col gap-4 text-sm font-medium text-cyan-200">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleSmoothScroll(e, item.href)}
                      className="hover:text-cyan-400 transition-colors cursor-pointer block py-2 px-4 rounded-lg hover:bg-cyan-900/20"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
