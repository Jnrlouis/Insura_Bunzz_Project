// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// DONE == 1. Deploy NFT With Bunzz
// DONE == 2. Write the setPolicyCondition
// DONE == 3. Write the claim condition
// DONE == 4. Add Chainlink Price Oracle to confirm price
// DONE == 5. In the createPolicy function, update the input param into the struct
// Then TEST!!!!!
// DONE == 6. Test the get Eth Price
// DONE == 7. Test the check Eth value function in createPolicy function
// DONE == 8. Add the reentracy guard to the claimSettlement function
// DONE == 9. Test the NFT mint function in createPolicy function
// DONE == 10. Add the dynamic metadata feature
// DONE == 101. Create the metadata URI
// DONE == 10. Test the Burn mint function claimSettlement function
// 12 Add NatSpec
// 13. Research on Thirdweb to get ideas for Bunzz

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./IInsurancePolicy.sol";

contract EthPriceInsurance is Ownable, ReentrancyGuard {
    uint256 public tokenIds;
    uint256 public noOfHolders;
    uint256 public ethPrice;

    // policy contract instance
    IInsurancePolicy nftPolicy;

    AggregatorV3Interface internal priceFeed;

    struct PolicyHolder {
        uint256 insuredPrice;
        uint256 premiumPaid;
        uint256 timeDuration;
        uint256 portfolioValue;
        bool hasPolicy;
    }

    //an ID for all policyHolders
    // mapping(uint256 => PolicyHolder) public policyHolders;
    // a list of all Policy holders
    mapping(address => PolicyHolder) public policyHolders;
    // stores record of insured users
    mapping(address => bool) insured;

    /**
     * Network: Goerli * Aggregator: ETH/USD
     * Address: 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
     */
    constructor() {
        priceFeed = AggregatorV3Interface(
            0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        );
        nftPolicy = IInsurancePolicy(
            0xb5FfEcac8d239a19836DBEcb5262DA2B7Ca6b78e
        );
    }

    /**
     * Returns the latest price of Ethereum in USD
     */

    function getEthPrice() public view returns (uint256) {
        (, int price, , , ) = priceFeed.latestRoundData();
        return uint256(price);
    }

    // function to read the price of eth;
    function checkEthPrice() public returns (uint256) {
        ethPrice = getEthPrice();
        return ethPrice;
    }

    //function calculates premium
    function calculateMinimumPremium(
        uint256 _value
    ) private pure returns (uint256) {
        //calculate how much premium user is to pay point
        uint256 premiumInstallments = (_value / 3) * 10 ** 18;
        return premiumInstallments;
    }

    // function to create policy
    function createPolicyAgreement(
        uint256 _price,
        uint256 _timeDuration,
        uint _porfolioValue
    ) public payable {
        //require user hasn't claimed policy already
        require(!insured[msg.sender], "You have the policy already!");
        require(_price > 0, "Invalid Price!");
        uint price = _price * 10 ** 18;
        //require insurance period is more 30 days
        require(_timeDuration >= 30, "Duration must be more than 30Days!");
        //portfolio value is not 0
        require(_porfolioValue > 0, "Portfolio is too small");
        /// check ETH price isn't already less
        require(getEthPrice() > price, "Price isn't valid");

        /// Update User Policy details
        policyHolders[msg.sender].insuredPrice = price;
        policyHolders[msg.sender].timeDuration = _timeDuration;
        policyHolders[msg.sender].portfolioValue = _porfolioValue;
        policyHolders[msg.sender].hasPolicy = true;
        noOfHolders++;

        ////////////////////////////
        // withdraw premium payment
        uint256 premium = calculateMinimumPremium(_porfolioValue);
        require(msg.value >= premium, "Premium Value isn't valid");

        address payable contractAddress = payable(address(this));
        contractAddress.transfer(premium);
        ////////////////////////////

        //Update premiumPaid
        policyHolders[msg.sender].premiumPaid += premium;

        //record user has insured
        insured[msg.sender] = true;
        // mint NFT to wallet
        nftPolicy.mintNFT(msg.sender, _price, _timeDuration, _porfolioValue);
        //
    }

    function claimSettlement() public nonReentrant {
        // require sender owns NFT OR he's on the insured list
        require(insured[msg.sender] == true, "You're not entitled to this!");
        // require present ETH price is less than the amount user insured
        require(policyHolders[msg.sender].insuredPrice > ethPrice);
        ///////////////////
        // require agreement is more than 30days
        require(policyHolders[msg.sender].timeDuration > 30, "");
        ///////////////////
        //
        ///////////////////
        // Withdraw Funds Paid by Users to their Wallet
        uint amountToBePaid = policyHolders[msg.sender].premiumPaid;
        payable(msg.sender).transfer(amountToBePaid);
        ///////////////////
        // @dev later take 1% of claim withdrawn for maintainance
        ///////////////////
        // BurnNFT
        // IAmoraInsureDeFi.burn(tokenId);
        ///////////////////
        noOfHolders--;
    }

    function contractBalance() public view onlyOwner returns (uint256) {
        address insureContract = address(this);
        uint256 insurePool = insureContract.balance;
        return insurePool;
    }

    receive() external payable {}

    fallback() external payable {}
}
