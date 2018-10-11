pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";

import "./OptionSale.sol";
import "./OptionPermission.sol";
import "./OptionToken.sol";

// @title Option Factory deploys and manages Option Token contracts
//
// Provides functionaity for Token Options deployment
// All public methods are onlyOwner to make it more secure
// All queries should be done via OptionInterface
//
//  @author: Mikhail Lazarev (mikael.lazarev@tokenstarter.io)
//  @version: 0.1 (August 2018)

contract OptionFactory is OptionPermission {

    event OptionContractsCreated(
        uint id,
        address indexed optionSaleContractAddress
    );

    address[] public contractBase;

    mapping (uint => address) optionContractToStartup;

    // @dev Deploy OptionToken and OptionSale contracts for Standard (using Allowance) tokens only
    // @param _optionPremiumRate - Rate for option premium
    // @param _strikePriceRate - Rate for strike price
    // @param _salesStartTime Time when sales start
    // @param _salesFinishTime Time when sales finish
    // @param _expiredAt Option Expiration date
    // @param _tokencontract Address of Standard Token Contact (function approve and transfer required)
    // @param _tokenWallet If not 0x0 it means that allowance set up from this address
    //                     if is 0x0, contract should have balances for OptionSale Tokens
    // @param _startup Address of startup (to collect money and manage contracts)

    function createOptionContracts(

        uint256 _optionPremiumRate,
        uint256 _strikePriceRate,
        uint256 _expiredAt,

        uint256 _salesStartTime,
        uint256 _salesFinishTime,

        address _tokenContract,
        address _tokenWallet,
        bool    _tokenContractIsMintable,
        address _startup

    )
        public
        onlyIfStartupWhitelisted
        returns (address)
    {

        // Creates new Option Sale Contract
        OptionSale optionSaleContract = new OptionSale(
            _optionPremiumRate,
            _strikePriceRate,
            _expiredAt,

            _salesStartTime,
            _salesFinishTime,

            _tokenContract,
            _tokenWallet,
            _tokenContractIsMintable,
            _startup
        );

        // Register contract in contract base
        uint newContractId = contractBase.push(address(optionSaleContract)) - 1;

        optionContractToStartup[newContractId] = msg.sender;

        // Add event NewOptionContract
        emit OptionContractsCreated(newContractId, address(optionSaleContract));

        return address(optionSaleContract);

    }

    /// @dev Returns how many contracts deployed in Factory
    function getContractsQty() public view returns (uint) {
        return contractBase.length;
    }

    // Deploys Sales contract and Emit event
    //
    function getOptionParameters(uint uid) public view
        returns (
            uint256 optionPremiumRate,
            uint256 optionStrikePriceRate,
            uint256 optionExpiredAt,
            uint256 salesStartTime,
            uint256 salesFinishTime,
            bool    salesIsGoing)
    {
        require(uid <= getContractsQty());
        OptionSale ocs = OptionSale(contractBase[uid]);

        (optionPremiumRate, optionStrikePriceRate, optionExpiredAt) = ocs.getOptionParameters();
        (salesStartTime, salesFinishTime, salesIsGoing) = ocs.getSalesParameters();
    }

    function getSaleContractAddress(uint uid) public view
        returns(address)
    {
        return contractBase[uid];
    }

    function getContractsInfo(uint uid) public view
        returns (
            address optionSaleContractAddress,
            address optionTokenContractAddress,
            address tokenContractAddress,

            string optionTokenName,
            string optionTokenSymbol,
            uint8 optionTokenDecimals)
    {
        optionSaleContractAddress = contractBase[uid];
        OptionSale ocs = OptionSale(contractBase[uid]);
        optionTokenContractAddress = ocs.getOptionTokenAddress();
        OptionToken otc = ocs.optionTokenContract();
        tokenContractAddress = ocs.tokenContract();

        optionTokenName = otc.name();
        optionTokenSymbol = otc.symbol();
        optionTokenDecimals = otc.decimals();


    }
}
