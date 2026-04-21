import pinataSDK from "@pinata/sdk";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const pinata = new pinataSDK(
    process.env.PINATA_API_KEY,
    process.env.PINATA_API_SECRET
);

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