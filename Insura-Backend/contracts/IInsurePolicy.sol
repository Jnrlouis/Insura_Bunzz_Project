// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IInsurancePolicy {
    function mintNFT(
        address recipient,
        uint256 _price,
        uint256 _timeDuration,
        uint256 _portfolioValue
    ) external;

    function mintInsureNFT(
        address recipient,
        uint256 _NFTInsurancePolicyID,
        uint256 _startDate,
        uint256 _endDay,
        uint256 _insureAmount,
        string memory _NFTName,
        string memory _NFTSymbol,
        string memory _NFTTokenURI
    ) external;

    function getTokenURI(
        uint256 _tokenID
    ) external view returns (string memory);

    function burnNFT(uint256 _tokenID) external;
}
