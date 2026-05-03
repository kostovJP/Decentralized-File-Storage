import React from "react";

export default function StatsBar({ fileCount, account }) {
  const shortAddress = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : "—";

  const stats = [
    {
      label: "Files Stored",
      value: fileCount ?? "—",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
          <polyline points="13 2 13 9 20 9"/>
        </svg>
      ),
      color: "text-accent-bright",
    },
    {
      label: "Network",
      value: "Sepolia",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ),
      color: "text-cyan",
    },
    {
      label: "Storage",
      value: "IPFS",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
      ),
      color: "text-success",
    },
    {
      label: "Wallet",
      value: shortAddress,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      ),
      color: "text-white",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
      {stats.map((stat) => (
        <div key={stat.label} className="card flex items-center gap-3">
          <div className={`${stat.color} opacity-70`}>{stat.icon}</div>
          <div>
            <p className="text-xs text-muted font-mono">{stat.label}</p>
            <p className={`font-display font-600 text-sm ${stat.color}`}>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
