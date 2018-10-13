pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";

import "./Case.sol";
import "./Government.sol";

    /*
     * @title OptionInterface
     *
     * @dev The Whitelist contract has a whitelist of addresses, and provides basic authorization control functions.
     * This simplifies the implementation of "user permissions".
     *
     * @author: Mikhail Lazarev (mikael.lazarev@tokenstarter.io)
     *
     */

contract Strategy is Ownable {

    using SafeMath for uint256;

    uint8 constant public PLANNED = 1;
    uint8 constant public EXECUTED = 2;
    uint8 constant public CANCELLED = 3;

    // Variables
    address public government;
    string public providerName;

    struct Action {
        string caseContractHash;
        int8 status;
        uint256 datePlanned;
        uint256 dateExecuted;
        uint256 qty;


    }

    Action[] public actions;

    mapping (uint => address) public actionsOwnerHashes;
    mapping (address => bool) public registeredCases;

	constructor(string _providerName)
        public
    {
        providerName = _providerName;

    }

    modifier onlyRegisteredCases() {
        _;
    }



}