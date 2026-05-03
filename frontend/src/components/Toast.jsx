import React, { useEffect } from "react";

export default function Toast({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const icons = {
    success: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    error: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    ),
    info: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  };

  const colors = {
    success: "border-success/30 text-success bg-success/10",
    error: "border-danger/30 text-danger bg-danger/10",
    info: "border-accent/30 text-accent-bright bg-accent/10",
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border glass animate-slide-up min-w-[280px] max-w-[380px] ${colors[toast.type]}`}>
      <span className="flex-shrink-0">{icons[toast.type]}</span>
      <p className="text-sm font-display flex-1">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="opacity-60 hover:opacity-100 transition-opacity flex-shrink-0"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  );
}
