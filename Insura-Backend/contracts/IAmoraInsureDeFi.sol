// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IAmoraInsureDeFi {
    function whitelistedAddresses(address) external view returns (bool);

    function safeMint(address to, string memory metadataURI) external;

    function burn(uint256 tokenId) external;
}
