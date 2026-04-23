import pinataSDK from "@pinata/sdk";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// creating a new pinata client
// logging into my pinata account basically
const pinata = new pinataSDK(
    process.env.PINATA_API_KEY,
    process.env.PINATA_API_SECRET
);

// this function uploadToIPFS() takes the file from my system and sends it to pinata
// and then pinata uploads it to the IPFS.
// It returns a CID (Content ID) that I will later store in the blockchain
export async function uploadToIPFS(filePath, fileName) {
    const readableStream = fs.createReadStream(filePath);
    const options = {
        pinataMetadata: { name: fileName },
        pinataOptions: { cidVersion: 0 }
    };
    const result = await pinata.pinFileToIPFS(readableStream, options);
    console.log("File uploaded! CID:", result.IpfsHash);
    return result.IpfsHash;  // This CID is what gets stored on blockchain
}