import React, { useState, useRef, useCallback } from "react";
import { formatFileSize, getFileIcon } from "../utils/ipfs";

export default function UploadZone({ onUpload, isUploading, account }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setSelectedFile(file);
  }, []);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    await onUpload(selectedFile);
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemove = () => {
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full animate-slide-up">
      {/* Drop zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !selectedFile && inputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
          ${dragActive
            ? "border-accent bg-accent/5 scale-[1.01]"
            : selectedFile
            ? "border-success/50 bg-success/5 cursor-default"
            : "border-border hover:border-accent/50 hover:bg-accent/3"
          }`}
      >
        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-50" />

        <div className="relative p-10 flex flex-col items-center justify-center gap-4 min-h-[220px]">
          {selectedFile ? (
            /* File selected state */
            <div className="flex flex-col items-center gap-3 animate-fade-in">
              <div className="text-5xl">{getFileIcon(selectedFile.name)}</div>
              <div className="text-center">
                <p className="font-display font-600 text-white text-lg">{selectedFile.name}</p>
                <p className="text-muted text-sm font-mono mt-1">{formatFileSize(selectedFile.size)}</p>
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleRemove}
                  className="px-4 py-2 rounded-lg border border-border text-muted hover:border-danger hover:text-danger transition-all duration-200 text-sm font-display"
                >
                  Remove
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!account || isUploading}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-accent hover:bg-accent-bright text-white font-display font-600 text-sm transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                  {isUploading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      Upload to IPFS
                    </>
                  )}
                </button>
              </div>
              {!account && (
                <p className="text-xs text-danger font-mono">Connect wallet to upload</p>
              )}
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-300
                ${dragActive ? "border-accent bg-accent/10 scale-110" : "border-border bg-surface"}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke={dragActive ? "#7c6aff" : "#4a4a6a"} strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="font-display font-600 text-white text-lg">
                  {dragActive ? "Drop it here" : "Drop your file here"}
                </p>
                <p className="text-muted text-sm mt-1">
                  or <span className="text-accent-bright">click to browse</span> · Any file type supported
                </p>
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {["PDF", "Images", "Video", "Code", "Anything"].map((type) => (
                  <span key={type} className="px-2 py-0.5 rounded-full bg-surface border border-border text-muted text-xs font-mono">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
