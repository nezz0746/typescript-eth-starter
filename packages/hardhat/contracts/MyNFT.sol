// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable {
    using Counters for Counters.Counter;
    struct Piece {
        string tokenURI;
        uint256 tokenId;
        bool minted;
    }
    Piece[] public listedPieces;
    Counters.Counter private _tokenIdCounter;
    uint256 public _price = 3 * 10**16;

    constructor() ERC721("MyNFT", "MNFT") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function listPiece(string memory uri) public onlyOwner {
        listedPieces.push(Piece(uri, _tokenIdCounter.current(), false));
        _tokenIdCounter.increment();
    }

    function getListedPieces() public view returns (Piece[] memory) {
        Piece[] memory pieces = new Piece[](_tokenIdCounter.current());
        for (uint256 index = 0; index < _tokenIdCounter.current(); index++) {
            pieces[index] = listedPieces[index];
        }
        return listedPieces;
    } 


    function mint(address _to, uint256 index) public whenNotPaused payable {
        require(listedPieces[index].minted == false, "NFT already minted.");
        if(msg.sender != owner()) {
          require(msg.value >= _price, "Ether sent is not correct" );
        }

        _safeMint(_to, index);
        _setTokenURI(index, listedPieces[index].tokenURI);
        listedPieces[index].minted = true;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function walletOfOwner(address _owner) public view returns(uint256[] memory) {
      uint256 tokenCount = balanceOf(_owner);

      uint256[] memory tokensId = new uint256[](tokenCount);
      for(uint256 i; i < tokenCount; i++){
          tokensId[i] = tokenOfOwnerByIndex(_owner, i);
      }
      return tokensId;
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}