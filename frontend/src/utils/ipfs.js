const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;

export async function uploadToIPFS(file) {
  const formData = new FormData();
  formData.append("file", file);

  const metadata = JSON.stringify({ name: file.name });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({ cidVersion: 0 });
  formData.append("pinataOptions", options);

  const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload to IPFS");
  }

  const data = await response.json();
  return data.IpfsHash;
}

export function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function getFileIcon(fileName) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  const icons = {
    pdf: "📄", png: "🖼️", jpg: "🖼️", jpeg: "🖼️", gif: "🖼️", webp: "🖼️",
    mp4: "🎬", mov: "🎬", avi: "🎬", mp3: "🎵", wav: "🎵",
    zip: "📦", rar: "📦", txt: "📝", md: "📝",
    js: "💻", ts: "💻", jsx: "💻", tsx: "💻", py: "💻", sol: "💻",
    json: "📋", csv: "📊", xlsx: "📊",
  };
  return icons[ext] || "📁";
}

export function shortenCID(cid) {
  if (!cid) return "";
  return `${cid.slice(0, 6)}...${cid.slice(-4)}`;
}

export function formatTimestamp(timestamp) {
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
}
