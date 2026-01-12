import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Qubitcoin – Physics-Secured Digital Assets",
  description: "A supersymmetric framework for unforgeable quantum tokens secured by fundamental laws of physics.",
  keywords: "quantum money, supersymmetry, qubitcoin, quantum blockchain, post-quantum, SUSY, VQE, PoSA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
