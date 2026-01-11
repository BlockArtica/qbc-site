"use client";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="page-container">
      {/* Main QUBITCOIN heading */}
      <h1 className="main-title">QUBITCOIN</h1>

      {/* Adinkra hallmark centerpiece */}
      <div className="adinkra-wrapper">
        <Image
          src="/adinkra-quantum.png"
          alt="Adinkra Quantum Logo"
          width={420}
          height={420}
          className="adinkra-logo"
        />
      </div>

      {/* Supersymmetric heading */}
      <h2 className="susu-heading">
        A Supersymmetric Framework for Physics-Secured Digital Assets
      </h2>

      {/* Abstract teaser */}
      <p className="abstract-text">
        Commerce on the internet has come to rely on code-based ledgers, but these systems face trust issues and vulnerability to quantum attacks. Qubitcoin (QBC) introduces <span className="highlight">quantum-secure, private transactions</span> via unforgeable quantum tokens encoded with Adinkra diagrams, leveraging supersymmetric principles and next-gen quantum mechanics.
      </p>

      {/* Feature buttons grid */}
      <div className="features-grid">
        <div className="feature-btn">⚡ Lightning-fast transactions</div>
        <div className="feature-btn">🔒 Military-grade security</div>
        <div className="feature-btn">🌐 Decentralized quantum ledger</div>
        <div className="feature-btn">💎 Elegant, secure design</div>
        <div className="feature-btn">🔮 Privacy-enhancing SUSY swaps</div>
        <div className="feature-btn">🔗 Cross-chain interoperability</div>
      </div>

      {/* Social links */}
      <div className="social-links">
        <a href="https://t.me/Qu_Bitcoin" target="_blank" rel="noopener noreferrer">Telegram</a>
        <a href="https://x.com/Qu_bitcoin" target="_blank" rel="noopener noreferrer">X / Twitter</a>
      </div>

      {/* Launch date */}
      <div className="coming-soon">Launching February 2026</div>
    </main>
  );
}

