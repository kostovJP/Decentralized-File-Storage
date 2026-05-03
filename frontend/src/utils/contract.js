// Replace this with your deployed contract address
export const CONTRACT_ADDRESS = "0xf54246e75Aa349A75a8D1c89c3A7d9fD0199eA54";

// ABI from your compiled contract (artifacts/contracts/FileStorage.sol/FileStorage.json)
export const CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "cid", "type": "string" }
    ],
    "name": "FileDeleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "cid", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "fileName", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "uploadTime", "type": "uint256" }
    ],
    "name": "FileUploaded",
    "type": "event"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_index", "type": "uint256" }],
    "name": "deleteFile",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getFileCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyFiles",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "cid", "type": "string" },
          { "internalType": "string", "name": "fileName", "type": "string" },
          { "internalType": "uint256", "name": "uploadTime", "type": "uint256" },
          { "internalType": "address", "name": "owner", "type": "address" }
        ],
        "internalType": "struct FileStorage.File[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_cid", "type": "string" },
      { "internalType": "string", "name": "_fileName", "type": "string" }
    ],
    "name": "uploadFile",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/";
