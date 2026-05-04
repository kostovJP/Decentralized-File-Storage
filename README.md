# DecenStore — Decentralized File Storage

A decentralized file storage dApp where users can upload files to IPFS and register ownership on the Ethereum blockchain through a Solidity smart contract. File metadata (CID, filename, timestamp) is stored on-chain, ensuring trustless and permanent ownership records.

![Solidity](https://img.shields.io/badge/Solidity-0.8.24-363636?style=flat&logo=solidity)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Hardhat](https://img.shields.io/badge/Hardhat-2.22.0-yellow?style=flat)
![Ethers.js](https://img.shields.io/badge/Ethers.js-6-purple?style=flat)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?style=flat&logo=tailwindcss)
![Network](https://img.shields.io/badge/Network-Sepolia-blue?style=flat)

---

## How It Works

```
User selects file → Uploaded to IPFS via Pinata → CID returned
       ↓
CID + filename stored on Ethereum via Smart Contract
       ↓
Frontend retrieves CIDs → IPFS Gateway serves actual files
```

- **File content** lives on IPFS — decentralized and content-addressed
- **File metadata** (CID, name, timestamp, owner) lives on the Ethereum blockchain
- **No backend server** — the smart contract replaces a traditional database
- **Wallet-based identity** — MetaMask replaces usernames and passwords

---

## Features

- Upload any file type to IPFS via Pinata
- Store file ownership on the Ethereum blockchain
- View all your uploaded files in a responsive grid
- Open files directly via IPFS gateway
- Copy IPFS links to clipboard
- Delete file records from the blockchain
- Toast notifications for all actions
- Drag and drop file upload support
- MetaMask wallet integration

---

## Tech Stack

| Layer | Technology |
|---|---|
| Smart Contract | Solidity 0.8.24 |
| Development Environment | Hardhat 2.22.0 |
| Blockchain Network | Ethereum Sepolia Testnet |
| Frontend Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Blockchain Library | Ethers.js 6 |
| Wallet | MetaMask |
| IPFS Pinning Service | Pinata |
| RPC Provider | Alchemy |

---

## Project Structure

```
decentralized-storage/
├── contracts/
│   └── FileStorage.sol       # Solidity smart contract
├── scripts/
│   └── deploy.js             # Hardhat deployment script
├── test/
│   └── FileStorage.js        # Smart contract unit tests
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── UploadZone.jsx
│   │   │   ├── FileCard.jsx
│   │   │   ├── StatsBar.jsx
│   │   │   └── Toast.jsx
│   │   ├── utils/
│   │   │   ├── contract.js   # ABI + contract address
│   │   │   └── ipfs.js       # Pinata upload + helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── hardhat.config.js
├── package.json
└── .env                      
```

---

## Prerequisites

Before you begin, make sure you have:

- [Node.js v20 LTS](https://nodejs.org) installed
- [MetaMask](https://metamask.io) browser extension installed
- A [Pinata](https://pinata.cloud) account with an API JWT token
- An [Alchemy](https://alchemy.com) account with a Sepolia RPC URL
- Some Sepolia ETH — get it free from [Google Cloud Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/decentralized-storage.git
cd decentralized-storage
```

### 2. Install Hardhat dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
PRIVATE_KEY=your_metamask_private_key
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your_api_key
```

> ⚠️ Never commit your `.env` file. It is already added to `.gitignore`.

### 4. Compile the smart contract

```bash
npx hardhat compile
```

### 5. Run unit tests

```bash
npx hardhat test
```

You should see 4 passing tests:

```
FileStorage
  ✔ Should upload a file
  ✔ Should return correct file count
  ✔ Should delete a file
  ✔ Should reject empty CID
```

### 6. Deploy to Sepolia testnet

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Copy the deployed contract address from the output:

```
Deploying FileStorage...
FileStorage deployed to: 0xYourContractAddress
```

### 7. Set up the frontend

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` folder:

```env
VITE_PINATA_JWT=your_pinata_jwt_token
```

### 8. Update the contract address

Open `frontend/src/utils/contract.js` and replace the placeholder with your deployed address:

```js
export const CONTRACT_ADDRESS = "0xYourContractAddress";
```

### 9. Run the frontend

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Smart Contract

The `FileStorage.sol` contract is deployed on the Ethereum Sepolia testnet at:

```
0xf54246e75Aa349A75a8D1c89c3A7d9fD0199eA54
```

### Functions

| Function | Type | Description |
|---|---|---|
| `uploadFile(cid, fileName)` | Write | Stores a file's CID and metadata on-chain |
| `getMyFiles()` | Read | Returns all files belonging to the caller |
| `deleteFile(index)` | Write | Deletes a file record by its index |
| `getFileCount()` | Read | Returns the number of files for the caller |

### Events

| Event | Parameters | Emitted When |
|---|---|---|
| `FileUploaded` | owner, cid, fileName, uploadTime | A file is successfully uploaded |
| `FileDeleted` | owner, cid | A file record is deleted |

---

## Local Development (without Sepolia)

You can test the entire system locally without spending any Sepolia ETH:

```bash
# Terminal 1 — start local blockchain
npx hardhat node

# Terminal 2 — deploy to local network
npx hardhat run scripts/deploy.js --network localhost
```

Then add the local network to MetaMask:

```
Network name:    Hardhat Local
RPC URL:         http://127.0.0.1:8545
Chain ID:        31337
Currency symbol: ETH
```

Import one of the Hardhat test accounts into MetaMask using the private key printed in Terminal 1 — each account has 10,000 test ETH.

---

## Limitations

- Users must have MetaMask installed to interact with the system
- Upload and delete operations require a small ETH balance for gas fees
- The smart contract cannot be modified after deployment
- Files are publicly accessible via their IPFS CID — no private file support
- File ownership transfer is not supported in this version
- Pinata free tier provides 1GB storage

---

## Future Improvements

- Deploy on a Layer 2 network (Polygon, Arbitrum) to reduce gas fees
- Add gasless transactions using OpenGSN or Biconomy
- Support Web3Auth for email/social login instead of MetaMask
- Add file access control (private files, shared access)
- Add file ownership transfer
- Support folder uploads

---

## License

This project is licensed under the MIT License.
