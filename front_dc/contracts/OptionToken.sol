pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

import "./OptionFactory.sol";

/* @title OptionTokenStandard - Abstract contract to create Option Token Contracts
 * It containt whole logic except working with tokenContracts
 *
 *  Author: Mikhail Lazarev (mikael.lazarev@tokenstarter.io)
 */

contract OptionToken is MintableToken, BurnableToken {

    event Execution (address indexed optionHolder, uint amount);

    using SafeMath for uint256;

    // Constants
    uint32 constant public DUTCH_AUCTION_PERIOD = 14 days;

    // Variables
    address factory;
    address public startup;
    
    string public name;
    string public symbol;
    uint8 public decimals;

    // Rate for Strike price (execution price)
    uint256 public strikePriceRate;

    // Date when option expired at
    uint256 public expiredAt;

    // Date when all unused Option Tokens Will be burned
    uint256 public burnedAt;

    // ERC20 Token Contract
    ERC20 public tokenContract;
    address public tokenWallet;
    bool public tokenContractIsMintable;

    constructor (
        string  _name,
        string  _symbol,
        uint8   _decimals,
        uint256 _strikePriceRate,
        uint256 _expiredAt,
        address _tokenContract,
        address _tokenWallet,
        bool    _tokenContractIsMintable,
        address _startup
    )
        public
    {
        //require(now < _expiredAt);

        startup = _startup;
        factory = msg.sender;

        name = _name;
        symbol = _symbol;
        decimals = _decimals;

        strikePriceRate = _strikePriceRate; // strike_price
        expiredAt = _expiredAt;
        burnedAt = expiredAt + DUTCH_AUCTION_PERIOD;


        tokenContract = ERC20(_tokenContract);
        tokenContractIsMintable = _tokenContractIsMintable;
        tokenWallet = _tokenWallet;
    }

    // Allow to execute function before expiration date
    modifier onlyNotExpired {
        require(now < expiredAt);
        _;
    }

    // Allow to execute function before burning date
    modifier onlyNotBurned {
        require(now < burnedAt);
        _;
    }

    // @dev: OPTION CONTRACT EXECUTION (FALLBACK FUNCTION)
    // To execute Option Contract you could send ETH to this Contract
    //
    function() public onlyNotExpired payable {

        // calculate how much tokens should be deliver to msg.sender
        uint256 tokensToDeliver = msg.value.mul(strikePriceRate);

        // Burns Option Tokens for the same quantity
        // If msg.sender hasn't enough tokens to burned it will automatically stop the execution
        burn(tokensToDeliver);

        // Transfer tokens to msg.sender
        tokenContract.transfer(msg.sender, tokensToDeliver);

        // Add an event
        emit Execution(msg.sender, tokensToDeliver);

    }

    /// @dev Minting Option Tokens for burnable Token Contracts
    /// It provides two ways for minting tokens
    /// If tokenWallet is set and != 0x0, it assumes that tokenWallet use
    /// Approve method to allow manage tokens
    /// If tokenWallet is set to 0x0, it means that contract holds some tokens
    /// To release unused tokens check Release Unused Tokens below

    function mint (address _beneficiary, uint256 _amount)
        public
        hasMintPermission
        onlyNotExpired
        returns (bool)
    {

        if (tokenContractIsMintable) {

            // Get token contract Instance as Mintable Contract
            MintableToken tokenContractInstance = MintableToken(address(tokenContract));

            // Try to mint tokens which will be held on this contract
            // If not it will throw and return funds
            require(tokenContractInstance.mint(this, _amount));

            // If tokenContract is burnable, we check the method which we could take tokens
            // If tokenWallet is set, it means that allowance method is used
        } else {

            if (tokenWallet != address(0)) {
                // Check that this contract has enough tokens to be transferred
                require(tokenContract.allowance(tokenWallet, this) >= _amount);

                // Transfer tokens to this contract
                tokenContract.transferFrom(tokenWallet, this, _amount);

            } else {
                // Check avaible tokens for this contract
                // It's token contract balance minus quanityt of minted tokens
                uint avaibleTokens = tokenContract.balanceOf(this) - totalSupply_;

                // If this contract has still enough avaible tokens on balance
                // it means that we could mint new tokens
                // it will increase totalSupply_ and
                require(avaibleTokens >= _amount);
            }
        }
        // Execute function for parent MintableToken to mint new tokens
        MintableToken.mint(_beneficiary, _amount);

        return true;
    }


    // @dev Withdraw funds to startup
    // and send commision to factory address
    //
    function withdraw() public {
        // Add commission here later
        require((msg.sender == factory) || (msg.sender == startup));
        startup.transfer(address(this).balance);
    }

    // This function releases unused tokens
    // For not minted contracts only

    function ReleaseUnusedTokens()
        public
        onlyOwner
    {
        require(tokenWallet == 0x0);
        uint256 tokensToReturn = tokenContract.balanceOf(this) - totalSupply_;
        tokenContract.transfer(msg.sender, tokensToReturn);
    }
}