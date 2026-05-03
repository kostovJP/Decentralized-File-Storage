import { useState } from "react";
import { getFileIcon, shortenCID, formatTimestamp } from "../utils/ipfs";

const IPFS_GW = "https://gateway.pinata.cloud/ipfs/";

export default function FileCard({ file, index, onDelete, isDeleting }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(`${IPFS_GW}${file.cid}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="file-card card group relative overflow-hidden">
      {/* Subtle gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-cyan/0 group-hover:from-accent/3 group-hover:to-cyan/3 transition-all duration-500 rounded-xl pointer-events-none" />

      <div className="relative flex items-start gap-4">
        {/* File icon */}
        <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center text-2xl flex-shrink-0 group-hover:border-accent/30 transition-colors duration-300">
          {getFileIcon(file.fileName)}
        </div>

        {/* File info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-600 text-white truncate pr-8" title={file.fileName}>
            {file.fileName}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-xs text-muted bg-surface px-2 py-0.5 rounded-md border border-border">
              {shortenCID(file.cid)}
            </span>
          </div>
          <p className="text-xs text-muted mt-1.5">
            {formatTimestamp(file.uploadTime)}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
        {/* View on IPFS */}
        <a
          href={`${IPFS_GW}${file.cid}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border text-muted hover:text-cyan hover:border-cyan/50 transition-all duration-200 text-xs font-display flex-1 justify-center"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          View
        </a>

        {/* Copy link */}
        <button
          onClick={copyLink}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all duration-200 text-xs font-display flex-1 justify-center
            ${copied
              ? "bg-success/10 border-success/50 text-success"
              : "bg-surface border-border text-muted hover:text-accent-bright hover:border-accent/50"
            }`}
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              Copy Link
            </>
          )}
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(index)}
          disabled={isDeleting}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border text-muted hover:text-danger hover:border-danger/50 transition-all duration-200 text-xs font-display disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isDeleting ? (
            <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
