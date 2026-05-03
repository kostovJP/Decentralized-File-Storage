import React from "react";

export default function Navbar({ account, onConnect, onDisconnect, isConnecting }) {
  const shortAddress = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center animate-glow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <span className="font-display font-700 text-lg tracking-tight">
            Decen<span className="text-gradient">Store</span>
          </span>
        </div>

        {/* Status indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border">
          <span className="text-xs font-mono text-muted">IPFS</span>
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-mono text-muted">Sepolia</span>
          <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
        </div>

        {/* Wallet button */}
        {account ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="font-mono text-sm text-accent-bright">{shortAddress}</span>
            </div>
            <button
              onClick={onDisconnect}
              className="px-4 py-1.5 rounded-lg border border-border text-muted hover:border-danger hover:text-danger transition-all duration-200 text-sm font-display"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={onConnect}
            disabled={isConnecting}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-accent hover:bg-accent-bright text-white font-display font-600 text-sm transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {isConnecting ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Connecting...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                Connect Wallet
              </>
            )}
          </button>
        )}
      </div>
    </nav>
  );
}
