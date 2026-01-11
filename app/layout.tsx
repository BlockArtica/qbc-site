 import './globals.css';
import Image from 'next/image';

export const metadata = {
  title: 'Qubitcoin',
  description: 'Next-gen Quantum Blockchain Teaser',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Top-left static logo */}
        <div className="top-left-logo-wrapper">
          <Image
            src="/logo.png"
            alt="Top Left Logo"
            width={80}
            height={80}
            className="top-left-logo"
          />
        </div>

        {/* Page content */}
        {children}
      </body>
    </html>
  );
}

