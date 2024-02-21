// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Company: Decrypted Labs
// @title ArtPassage contract for ERC721 tokens
// @author Rabeeb Aqdas
/// @notice This contract allows only the owner to mint NFT to any address at once, which afterward will not be transferrable.
/// @dev Inherits functions and modifiers from ERC721 contract

///@dev Error thrown when attempting to transfer NFT from a non-zero address (preventing transfers from specific addresses).
error CantTransferNFT();   
///@dev Error thrown when attempting to mint an NFT to an address that already owns one (avoiding duplicate ownership).
error AlreadyOwnedNFT();  
///@dev Error thrown when attempting to mint an NFT beyond the specified limit (enforcing a maximum limit on minting).
error LimitReached();     
///@dev Error thrown when attempting to add an invalid amount to the minting limit (ensuring a valid amount for limit increase). 
error InvalidAmount();    

contract ArtPassage is ERC721, Ownable {
    using Strings for uint256;

    uint256 private _nextTokenId;
    uint256 private limit;

    // Base URI for token metadata
    string private baseURI;

    // Mapping to track ownership history
    mapping (address to => bool status) private _history;

    // Constructor to initialize the contract with an initial owner ,limit and base URI of nft
    constructor(address initialOwner, uint256 initialLimit,string memory _uri)
        ERC721("ArtPassage", "APT")
        Ownable(initialOwner)
    {
        limit = initialLimit;
         baseURI = _uri;
    }

    ///@dev Mint a new NFT and assign it to the specified address
    function safeMint(address to) public onlyOwner {
        // Check if the address already owns an NFT
        if(_history[to]) revert AlreadyOwnedNFT();
        
        // Check if the limit has been reached
        if(_nextTokenId >= limit) revert LimitReached(); 
        _nextTokenId++;
        uint256 tokenId = _nextTokenId;
        
        // Mint a new NFT and update ownership history
        _safeMint(to, tokenId);
        _history[to] = true;
    }

    ///@dev Increase the limit for minting more NFTs
    function addLimit(uint256 _addLimit) external onlyOwner {
        // Check if the provided amount is valid
        if(_addLimit == 0) revert InvalidAmount();
        
        // Increase the limit
        limit = limit + _addLimit;
    }

    ///@dev Override transferFrom to prevent transfers from a specific address
    function transferFrom(address from, address to, uint256 tokenId) public override {
        // Check if transfer is allowed from a specific address
        if(from != address(0)) revert CantTransferNFT();
        super.transferFrom(from, to, tokenId);
    }

     /**
    * @param _newBaseURI The new base URI for the entire collection metadata.
    * @notice Only the owner can call this function.
    */
    function changeBaseURI(string memory _newBaseURI) external onlyOwner {
       baseURI = _newBaseURI;
    }

    /**
     * @dev Internal function to get the base URI for token metadata.
     * @return The base URI for token metadata.
     */
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override  returns (string memory) {
        _requireOwned(tokenId);

        string memory baseUri = _baseURI();
        return bytes(baseUri).length > 0 ? string.concat(baseUri, tokenId.toString(),".json") : "";
    }
}