pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";

import "./OptionToken.sol";
import "./OptionFactory.sol";

    /*
     * @title OptionInterface
     *
     * @dev The Whitelist contract has a whitelist of addresses, and provides basic authorization control functions.
     * This simplifies the implementation of "user permissions".
     *
     * @author: Mikhail Lazarev (mikael.lazarev@tokenstarter.io)
     *
     */

contract OptionSale is Ownable {

    using SafeMath for uint256;

    // Constants
    uint public constant COMMISSION = 1;

    // Variables
    address factory;
    address startup;

    OptionToken public optionTokenContract;
    uint256 public optionPremiumRate;
    uint256 public optionStrikePriceRate;
    uint256 public optionExpiredAt;

    uint256 public salesStartTime;
    uint256 public salesFinishTime;

    address public tokenContract;
    address tokenWallet;
    bool tokenContractIsMintable;

    bool public started = false;
    bool public paused = false;
    bool public finished = false;

	constructor (
        uint256 _optionPremiumRate,
        uint256 _optionStrikePriceRate,
        uint256 _optionExpiredAt,

        uint256 _salesStartTime,
        uint256 _salesFinishTime,

        address _tokenContract,
        address _tokenWallet,
        bool    _tokenContractIsMintable,
        address _startup
    )
        public
    {

        factory = msg.sender;
        startup = _startup;

        optionPremiumRate = _optionPremiumRate;
        optionStrikePriceRate = _optionStrikePriceRate;
        optionExpiredAt = _optionExpiredAt;

        salesStartTime = _salesStartTime;
        salesFinishTime = _salesFinishTime;

        tokenContract = _tokenContract;
        tokenWallet = _tokenWallet;
        tokenContractIsMintable = _tokenContractIsMintable;


    }

    modifier onlyStartup() {
        require(msg.sender == startup);
        _;
    }

    modifier onlyOnSale() {
        require(salesIsGoing());
        _;
    }

    // @dev This fallback function gets money and sell options

    function() public payable onlyOnSale {

        uint optionCount = msg.value.mul(optionPremiumRate);
        optionTokenContract.mint(msg.sender, optionCount);
    }

    // @dev Withdraw collected funds to startup
    function withdraw() public onlyStartup {
        // cut commission
        uint256 factoryCommision = address(this).balance.mul(COMMISSION).div(100);
        uint256 balanceAfterCommission = address(this).balance - factoryCommision;

        factory.transfer(factoryCommision);
        startup.transfer(balanceAfterCommission);
    }

    // @dev give current Sale state
    function salesIsGoing() public view returns (bool)
    {
        return (address(optionTokenContract) != address(0) &&
                !paused && !finished && started &&
                now >= salesStartTime &&
                now <= salesFinishTime);
    }

    // @dev Pauses sales process
    function pause () public onlyStartup {
        paused = true;
    }

    // @dev Remain sales process
    function remain() public onlyStartup {
        paused = false;
    }

    // Finalize sale process and transfer collected funds to startup
    function finishSale() public onlyStartup {
        finished = true;
        withdraw();
    }

    // Deploys OptionToken with _name, _symbol and _decimal
    // And start sales
    // @return address of new optionTokenContract
    function startSales(string _name, string _symbol, uint8 _decimals)
        public
        onlyStartup
        returns (bool)
    {
        require(!started);

        optionTokenContract = new OptionToken(
            _name,
            _symbol,
            _decimals,
            optionStrikePriceRate,
            optionExpiredAt,
            tokenContract,
            tokenWallet,
            tokenContractIsMintable,
            startup
        );

        started = true;
        return started;

    }

    // function
    function getOptionTokenAddress() public view returns (address)
    {
        return address(optionTokenContract);
    }

    function getTokenContactAddress() public view returns (address)
    {
        return address(optionTokenContract.tokenContract());
    }

    function getOptionParameters() public view
        returns (
            uint256 _optionPremiumRate,
            uint256 _optionStrikePriceRate,
            uint256 _optionExpiredAt)
    {
        _optionPremiumRate = optionPremiumRate;
        _optionStrikePriceRate = optionStrikePriceRate;
        _optionExpiredAt = optionExpiredAt;
    }

    function getSalesParameters() public view
        returns (
            uint256 _salesStartTime,
            uint256 _salesFinishTime,
            bool _salesIsGoing)
    {
        _salesStartTime = salesStartTime;
        _salesFinishTime = salesFinishTime;
        _salesIsGoing = salesIsGoing();
    }

}