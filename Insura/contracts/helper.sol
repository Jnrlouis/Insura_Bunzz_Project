//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract helper {
    IERC721Metadata internal NFT_Contract;
    AggregatorV3Interface internal nftFloorPriceFeed;

    modifier confirmOwner (address _contractAddress, uint256 _tokenId) {
        NFT_Contract = IERC721Metadata(_contractAddress);
        require(msg.sender == NFT_Contract.ownerOf(_tokenId) ? true : false, "NOT NFT OWNER");
        _;
    }

    modifier checkFloorPriceValidity () {
        int nftFloorPrice = getFloorPrice();
        require (nftFloorPrice >= 0.6 ether, "FLOOR PRICE TOO LOW");
        _;
    }

    function getName(address _contractAddress) internal view returns (string memory) {
        return IERC721Metadata(_contractAddress).name();
    }

    function getSymbol(address _contractAddress) internal view returns (string memory) {
        return IERC721Metadata(_contractAddress).symbol();
    }

    function getTokenURI(address _contractAddress, uint256 _tokenId) internal view returns (string memory) {
        return IERC721Metadata(_contractAddress).tokenURI(_tokenId);
    }

    function getNFTOwner(address _contractAddress, uint256 _tokenId) public returns (address) {
        NFT_Contract = IERC721Metadata(_contractAddress);
        address nftOwner = NFT_Contract.ownerOf(_tokenId);
        return nftOwner;
    }

    function getFloorPrice () public returns (int) {
         nftFloorPriceFeed = AggregatorV3Interface(
            0xB677bfBc9B09a3469695f40477d05bc9BcB15F50
        );
        (
            ,
            int nftFloorPrice,
            ,
            ,
        ) = nftFloorPriceFeed.latestRoundData();
        return nftFloorPrice;
    }

    //0xE29F8038d1A3445Ab22AD1373c65eC0a6E1161a4
    //683

    /*
    Azuki Floor Price               0x9F6d70CDf08d893f0063742b51d3E9D1e18b7f74
    BAYC Floor Price                0xB677bfBc9B09a3469695f40477d05bc9BcB15F50
    CloneX Floor Price              0xE42f272EdF974e9c70a6d38dCb47CAB2A28CED3F
    CoolCats Floor Price            0x13F38938A18ff26394c5ac8df94E349A97AaAb4e
    CryptoPunks Floor Price         0x5c13b249846540F81c093Bc342b5d963a7518145
    Cryptoadz Floor Price           0x870bc8BfEe8A7Bbd63Dc1ef09F2fF37DeBCfEF35
    Doodles Floor Price             0xEDA76D1C345AcA04c6910f5824EC337C8a8F36d2
    MAYC Floor Price                0xCbDcc8788019226d09FcCEb4C727C48A062D8124
    VeeFriends Floor Price          0x4b531A318B0e44B549F3b2f824721b3D0d51930A
    World of Women Floor Price      0x2748A42aBd328835DFDA748bdD1D77Ce3c3312EE
    */
}

