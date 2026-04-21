import pinataSDK from "@pinata/sdk";
import dotenv from "dotenv";
dotenv.config();

const pinata = new pinataSDK(
    process.env.PINATA_API_KEY,
    process.env.PINATA_API_SECRET
);

const result = await pinata.testAuthentication();
console.log(result);