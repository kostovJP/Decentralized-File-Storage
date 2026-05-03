const hardhat = require("hardhat");
const { ethers } = hardhat;

async function main() {
    const FileStorage = await ethers.getContractFactory("FileStorage");
    console.log("Deploying FileStorage...");
    const fileStorage = await FileStorage.deploy();
    await fileStorage.waitForDeployment();
    const address = await fileStorage.getAddress();
    console.log("FileStorage deployed to:", address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});