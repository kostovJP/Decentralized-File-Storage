import { useState, useCallback } from "react";
import { ethers } from "ethers";
import Navbar from "./components/Navbar.jsx";
import UploadZone from "./components/UploadZone.jsx";
import FileCard from "./components/FileCard.jsx";
import StatsBar from "./components/StatsBar.jsx";
import Toast from "./components/Toast.jsx";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./utils/contract.js";
import { uploadToIPFS } from "./utils/ipfs.js";

let toastId = 0;

export default function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [files, setFiles] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const loadFiles = async (contractInstance) => {
    try {
      setIsLoadingFiles(true);
      const result = await contractInstance.getMyFiles();
      setFiles(result);
    } catch (err) {
      addToast("Failed to load files from blockchain", "error");
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      addToast("MetaMask not found. Please install it.", "error");
      return;
    }
    try {
      setIsConnecting(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      setAccount(accounts[0]);
      setContract(contractInstance);
      addToast("Wallet connected successfully!", "success");
      await loadFiles(contractInstance);
    } catch (err) {
      addToast("Failed to connect wallet", "error");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setContract(null);
    setFiles([]);
    addToast("Wallet disconnected", "info");
  };

  const handleUpload = async (file) => {
    if (!contract) {
      addToast("Please connect your wallet first", "error");
      return;
    }
    try {
      setIsUploading(true);
      addToast("Uploading to IPFS...", "info");
      const cid = await uploadToIPFS(file);
      addToast("File on IPFS! Saving to blockchain...", "info");
      const tx = await contract.uploadFile(cid, file.name);
      await tx.wait();
      addToast(`${file.name} uploaded successfully!`, "success");
      await loadFiles(contract);
    } catch (err) {
      console.error(err);
      addToast(err.message?.includes("user rejected") ? "Transaction cancelled" : "Upload failed", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (index) => {
    if (!contract) return;
    try {
      setDeletingIndex(index);
      const tx = await contract.deleteFile(index);
      await tx.wait();
      addToast("File deleted successfully", "success");
      await loadFiles(contract);
    } catch (err) {
      addToast(err.message?.includes("user rejected") ? "Transaction cancelled" : "Delete failed", "error");
    } finally {
      setDeletingIndex(null);
    }
  };

  return (
    <div className="min-h-screen bg-void">
      {/* Background effects */}
      <div className="fixed inset-0 bg-grid-pattern bg-grid pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-glow pointer-events-none" />

      <Navbar
        account={account}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        isConnecting={isConnecting}
      />

      <main className="relative max-w-5xl mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <div className="mb-10 animate-slide-up">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono text-muted uppercase tracking-widest">Decentralized Storage</span>
          </div>
          <h1 className="font-display font-800 text-4xl md:text-5xl text-white leading-tight">
            Store files on<br />
            <span className="text-gradient">the blockchain</span>
          </h1>
          <p className="text-muted mt-3 max-w-lg leading-relaxed">
            Upload any file to IPFS and register ownership on-chain. 
            Permanent, decentralized, and always accessible via your wallet.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <StatsBar fileCount={files.length} account={account} />
        </div>

        {/* Upload zone */}
        <div className="mb-10">
          <UploadZone
            onUpload={handleUpload}
            isUploading={isUploading}
            account={account}
          />
        </div>

        {/* Files section */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <h2 className="font-display font-700 text-xl text-white">My Files</h2>
              {files.length > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent-bright text-xs font-mono">
                  {files.length}
                </span>
              )}
            </div>
            {account && (
              <button
                onClick={() => loadFiles(contract)}
                disabled={isLoadingFiles}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-muted hover:text-white hover:border-accent/50 transition-all duration-200 text-xs font-display"
              >
                <svg className={`w-3 h-3 ${isLoadingFiles ? "animate-spin" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10"/>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
                Refresh
              </button>
            )}
          </div>

          {!account ? (
            /* Not connected */
            <div className="card flex flex-col items-center justify-center py-16 gap-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4a4a6a" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <div>
                <p className="font-display font-600 text-white">Connect your wallet</p>
                <p className="text-muted text-sm mt-1">to view and manage your files</p>
              </div>
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="px-6 py-2.5 rounded-lg bg-accent hover:bg-accent-bright text-white font-display font-600 text-sm transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 disabled:opacity-50"
              >
                Connect Wallet
              </button>
            </div>
          ) : isLoadingFiles ? (
            /* Loading skeleton */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-xl shimmer" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 rounded shimmer" />
                      <div className="h-3 rounded shimmer w-2/3" />
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex gap-2">
                    <div className="h-8 flex-1 rounded-lg shimmer" />
                    <div className="h-8 flex-1 rounded-lg shimmer" />
                    <div className="h-8 w-10 rounded-lg shimmer" />
                  </div>
                </div>
              ))}
            </div>
          ) : files.length === 0 ? (
            /* Empty state */
            <div className="card flex flex-col items-center justify-center py-16 gap-3 text-center">
              <div className="text-5xl animate-float">📭</div>
              <div>
                <p className="font-display font-600 text-white">No files yet</p>
                <p className="text-muted text-sm mt-1">Upload your first file to get started</p>
              </div>
            </div>
          ) : (
            /* File grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((file, index) => (
                <div key={`${file.cid}-${index}`} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <FileCard
                    file={file}
                    index={index}
                    onDelete={handleDelete}
                    isDeleting={deletingIndex === index}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
