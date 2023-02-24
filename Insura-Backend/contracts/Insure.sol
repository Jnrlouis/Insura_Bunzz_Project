//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./helper.sol";
import "./IInsurancePolicy.sol";

contract Insure is helper, Ownable {
    struct NFTInsuranceDetails {
        bool isInsured;
        uint256 NFTInsurancyPolicyID;
        uint256 startDate;
        uint256 endDay;
        uint256 insureAmount;
        int256 capturedFloorPrice;
        string NFT_Name;
        string NFT_Symbol;
        string NFT_TokenURI;
    }

    // policy contract instance
    IInsurancePolicy nftPolicy;

    mapping(uint => NFTInsuranceDetails) public NFTInsurance;
    mapping(address => mapping(uint256 => NFTInsuranceDetails))
        public getNFTInsuranceDetails;

    uint256 public numInsurance;

    constructor() {
        nftPolicy = IInsurancePolicy(
            0xb5FfEcac8d239a19836DBEcb5262DA2B7Ca6b78e
        );
    }

    enum ValidityPeriod {
        QUARTER,
        HALF,
        YEAR
    }

    function getDays(
        ValidityPeriod validityPeriod
    ) internal pure returns (uint) {
        uint256 policyDuration;
        if (validityPeriod == ValidityPeriod.QUARTER) {
            policyDuration = 92 days;
        } else if (validityPeriod == ValidityPeriod.HALF) {
            policyDuration = 182 days;
        } else {
            policyDuration = 366 days;
        }
        return policyDuration;
    }

    function checkEligibility(
        address _contractAddress,
        uint256 _tokenId
    )
        public
        confirmOwner(_contractAddress, _tokenId)
        checkFloorPriceValidity
        returns (bool)
    {
        if (
            getNFTInsuranceDetails[_contractAddress][_tokenId].isInsured ==
            true &&
            getNFTInsuranceDetails[_contractAddress][_tokenId].endDay <=
            block.timestamp
        ) {
            getNFTInsuranceDetails[_contractAddress][_tokenId]
                .isInsured = false;
            NFTInsurance[
                getNFTInsuranceDetails[_contractAddress][_tokenId]
                    .NFTInsurancyPolicyID
            ].isInsured = false;
        }
        require(
            !getNFTInsuranceDetails[_contractAddress][_tokenId].isInsured,
            "ALREADY INSURED"
        );
        return true;
    }

    function getInsuredAmount(
        ValidityPeriod validityPeriod
    ) public returns (uint) {
        int floorPrice = getFloorPrice();
        uint256 insuredAmount;
        if (validityPeriod == ValidityPeriod.QUARTER) {
            insuredAmount = uint256(floorPrice / 10);
        } else if (validityPeriod == ValidityPeriod.HALF) {
            insuredAmount = uint256((floorPrice * 2) / 10);
        } else {
            insuredAmount = uint256((floorPrice * 3) / 10);
        }
        return insuredAmount;
    }

    function insureNFT(
        address _contractAddress,
        uint256 _tokenId,
        ValidityPeriod validityPeriod
    ) public payable {
        bool isEligible = checkEligibility(_contractAddress, _tokenId);
        require(isEligible, "NOT ELIGIBLE");
        uint256 policyDuration = getDays(validityPeriod);

        NFTInsuranceDetails storage nftInsuranceDetails = NFTInsurance[
            numInsurance
        ];
        uint256 _insuredAmount = getInsuredAmount(validityPeriod);
        require(msg.value >= _insuredAmount, "PAY CORRECT AMOUNT");

        nftInsuranceDetails.NFTInsurancyPolicyID = numInsurance;
        nftInsuranceDetails.startDate = block.timestamp;
        nftInsuranceDetails.endDay = block.timestamp + policyDuration;
        nftInsuranceDetails.capturedFloorPrice = getFloorPrice();
        nftInsuranceDetails.insureAmount = msg.value;
        nftInsuranceDetails.NFT_Name = getName(_contractAddress);
        nftInsuranceDetails.NFT_Symbol = getSymbol(_contractAddress);
        nftInsuranceDetails.NFT_TokenURI = getTokenURI(
            _contractAddress,
            _tokenId
        );
        nftInsuranceDetails.isInsured = true;
        getNFTInsuranceDetails[_contractAddress][
            _tokenId
        ] = nftInsuranceDetails;

        // mint NFT
        // function mintInsureNFT(address recipient, uint256 _NFTInsurancePolicyID,
        // uint256 _startDate, uint256 _endDay, uint256 _insureAmount,
        // string memory _NFTName, string memory _NFTSymbol, string memory _NFTTokenURI) external;

        nftPolicy.mintInsureNFT(
            msg.sender,
            nftInsuranceDetails.NFTInsurancyPolicyID,
            nftInsuranceDetails.startDate,
            nftInsuranceDetails.endDay,
            nftInsuranceDetails.insureAmount,
            nftInsuranceDetails.NFT_Name,
            nftInsuranceDetails.NFT_Symbol,
            nftInsuranceDetails.NFT_TokenURI
        );

        numInsurance++;
    }

    function claimPremium(
        address payable _to,
        uint256 _amount
    ) external onlyOwner {
        require(_to != address(0) && _amount > 0, "INVALID");
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "FAILED");
    }

    receive() external payable {}

    fallback() external payable {}
}
