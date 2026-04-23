// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract FileStorage {

    // a structure to hold the file info
    struct File {
        string cid; // IPFS CID hash
        string fileName; // Name of the file uploaded to IPFS
        uint256 uploadTime; // Timestamp of upload
        address owner; // wallet address of owner
    }

    // maps each wallet address to their list of files
    // it's private so that it cannot be directly accessed from the outside
    mapping(address => File[]) private userFiles;

    // Events:

    // triggered when file is uploaded
    event FileUploaded(address indexed owner, string cid, string fileName, uint256 uploadTime);
    
    // triggered when file is deleted
    event FileDeleted(address indexed owner, string cid);


    // function that will upload the file (Store it's CID on blockchain):
    // memory -> exists only while the function runs, gets deleted after function execution finishes
    function uploadFile(string memory _cid, string memory _fileName) public {
        require(bytes(_cid).length > 0, "CID cannot be empty");
        require(bytes(_fileName).length > 0, "File name cannot be empty");

        File memory newFile = File({
            cid: _cid,
            fileName: _fileName,
            uploadTime: block.timestamp,
            owner: msg.sender
        });

        userFiles[msg.sender].push(newFile);

        // log the upload so that external apps can detect this instantly
        emit FileUploaded(msg.sender, _cid, _fileName, block.timestamp);
    }

    // Get all the files belonging to the caller.
    // view --> does not modify blockchain
    function getMyFiles() public view returns (File[] memory) {
        return userFiles[msg.sender];
    }

    function deleteFile(uint256 _index) public {
        File[] storage files = userFiles[msg.sender];
        require((_index >= 0) && (_index < files.length), "invalid file index");

        string memory deletedCid = files[_index].cid;

        // replacing deleted file with the last file and pop the last file.
        files[_index] = files[files.length - 1];
        files.pop();

        // logging the delete event
        emit FileDeleted(msg.sender, deletedCid);
    }

    // returns the total number of files for the caller:
    function getFileCount() public view returns (uint256) {
        return userFiles[msg.sender].length;
    }
}