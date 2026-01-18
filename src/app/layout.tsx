// src/app/layout.tsx
import type { ReactNode } from 'react';
import { Inter, Orbitron } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import TopNav from '@/components/TopNav'; // ← New sleek menu component
import './globals.css';

// Fonts – Inter for body, Orbitron for futuristic headings
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata = {
  title: 'Qubitcoin – Physics-Secured Digital Assets',
  description: 'Supersymmetric quantum tokens protected by the no-cloning theorem and SUSY principles.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} scroll-smooth`}>
      <body className="min-h-screen bg-black text-white antialiased overflow-x-hidden relative">
        {/* Floating Logo – Top-left */}
        <div className="fixed top-6 left-6 md:top-10 md:left-12 z-50">
          <Link href="/" aria-label="Qubitcoin Home">
            <div className="relative w-16 h-16 md:w-24 md:h-24 animate-float transition-all duration-500 hover:scale-110 hover:rotate-6">
              <Image
                src="/logo.png"
                alt="Qubitcoin Logo"
                fill
                className="object-contain drop-shadow-[0_0_20px_rgba(0,234,255,0.7)]"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Top-right Floating Menu – Sleek, metallic, mobile-friendly */}
        <TopNav />

        {/* Main content */}
        <main className="relative z-10 min-h-screen">
          {children}
        </main>

        {/* Global overlay gradient */}
        <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-[-1]" />
      </body>
    </html>
  );
}
