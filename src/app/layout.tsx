// src/app/layout.tsx
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {/* Floating Logo */}
        <div className="fixed top-6 left-6 md:top-8 md:left-10 z-50">
          <Link href="/">
            <div className="relative w-16 h-16 md:w-20 md:h-20 animate-float">
              <Image
                src="/logo.png"
                alt="Qubitcoin Logo"
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(0,234,255,0.5)] transition-transform duration-500 hover:scale-110 hover:rotate-6"
                priority
              />
            </div>
          </Link>
        </div>

        {children}
      </body>
    </html>
  );
}
