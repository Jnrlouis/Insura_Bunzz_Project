// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title ETHEREUM PRICE DEVALUATION INSURANCE
/// @author TheBlocAmora TEAM
/// @notice This is an insurance policy for $ETH Price Devaluation
/// @notice Contract owner cannot transfer contract funds
/// @notice Contract leverages parametric insurance model, using chainlink price feeds
/// as a decentralized oracle to automatically handle claim assessment and settlement
/// Users also hold a policy NFT with DYNAMIC METADATA as Proof of Agreement!
/// This NFT is minted upon policy creation and burnt after claim settlements
/// @dev All function calls are currently implemented without side effects
/// @custom:testing stages. This contract has been rigorously tested.

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./IInsurancePolicy.sol";

contract EthPriceInsurance is Ownable, ReentrancyGuard {
    /// @notice A Struct to record each holder of this policy
    /// @dev Struct stores each policyholder's Data
    struct PolicyHolder {
        uint256 insuredPrice;
        uint256 premiumPaid;
        uint256 timeDuration;
        uint256 portfolioValue;
        bool hasPolicy;
    }

    //**************VARIABLE DECLARATION***************//
    uint256 public tokenIds;
    uint256 public noOfHolders;
    uint256 public ethPrice;

    // policy contract instance
    IInsurancePolicy nftPolicy;

    //chainlink price feeds
    AggregatorV3Interface internal priceFeed;

    // a list of all Policy holders
    mapping(address => PolicyHolder) public policyHolders;
    // mapping(uint256 => PolicyHolder) public policyHolders;
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

    //******************READABLE FUNCTIONS*******************//
    /**
     * Returns the latest price of Ethereum in USD
     */

    /// @notice reads the current price of ETH from chainlink price feeds
    /// @dev returns $Ether as 8 decimals value
    /// @dev function rounds up $Ether price to 18 decimals by ^10
    function getEthPrice() public view returns (uint256) {
        (, int price, , , ) = priceFeed.latestRoundData();
        return uint256(price * 10 ** 10);
    }

    /// @notice function calls getEthPrice() above
    /// @dev enables price feeds data to be reused inside of functions
    /// @dev stores $Ether price into ethPrice
    function checkEthPrice() public returns (uint256) {
        ethPrice = getEthPrice();
        return ethPrice;
    }

    /// @notice function handles the calculation of installmental payments
    /// @dev can only be called by this contract
    function calculateMinimumPremium(
        uint256 _value
    ) private pure returns (uint256) {
        //calculate how much premium user is to pay point
        uint256 premiumInstallments = (_value / 3) * 10 ** 18;
        return premiumInstallments;
    }

    /// @notice function handles the calculation of installmental payments
    /// @dev can only be called by contract owner
    function contractBalance() public view onlyOwner returns (uint256) {
        address insureContract = address(this);
        uint256 insurePool = insureContract.balance;
        return insurePool;
    }

    //******************WRITABLE FUNCTIONS*******************//

    /// @notice Enables DeFi users to create policy agreement
    /// @dev Updates parameters in struct
    /// @dev Records the data of every policyholder && tracks who holds policy
    /// @dev Function mints NFT with a DYNAMIC METADATA to holders wallet
    /// @dev DYNAMIC METADATA stores the "price", "duration" and "portfolio" insured onchain!
    /// @param _price is the ETH price a user wants to insure against
    /// @param _timeDuration the number of days the user wants cover to run(must not be lesser than 30 days)
    /// @param _portfolioValue is the portfolio size of the user. This determines amount to be paid as premium
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

    /// @notice Enables DeFi users to withdraw premiums paid (No questions asked)
    /// @dev Function uses Chainlink price feeds to check if $Eth price
    /// @dev is below insured amount, if true, pays holder
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
        // nftPolicy.burn();
        ///////////////////
        noOfHolders--;
    }

    receive() external payable {}

    fallback() external payable {}
}
