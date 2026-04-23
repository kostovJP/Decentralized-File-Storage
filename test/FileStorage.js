import { expect } from "chai";
import hardhat from "hardhat";
const { ethers } = hardhat;

describe("FileStorage", function () {
    let fileStorage;
    let owner;

    this.beforeEach(async function () {
        [owner] = await ethers.getSigners();
        const FileStorage = await ethers.getContractFactory("FileStorage");
        fileStorage = await FileStorage.deploy();
    });

    it("should upload a file", async function () {
        await fileStorage.uploadFile("QmTestCID123", "test.pdf");
        const files = await fileStorage.getMyFiles();
        expect(files.length).to.equal(1);
        expect(files[0].fileName).to.equal("test.pdf");
    });

    it("should return correct file count", async function () {
        await fileStorage.uploadFile("QmTestCID123", "test.pdf");
        await fileStorage.uploadFile("QmTestCID456", "image.png");
        const count = await fileStorage.getFileCount();
        expect(count).to.equal(2);
    });

    it("Should delete a file", async function () {
        await fileStorage.uploadFile("QmTestCID123","test.pdf");
        await fileStorage.deleteFile(0);
        const files = await fileStorage.getMyFiles();
        expect(files.length).to.equal(0);
    });

    it("Should reject empty CID", async function () {
        await expect(
            fileStorage.uploadFile("", "test.pdf")
        ).to.be.revertedWith("CID cannot be empty");
    });
});