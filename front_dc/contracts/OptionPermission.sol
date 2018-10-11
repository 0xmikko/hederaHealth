pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/*
 * @title OptionInterface
 *
 * @dev The Whitelist contract has a whitelist of addresses, and provides basic authorization control functions.
 * This simplifies the implementation of "user permissions".
 *
 * @author: Mikhail Lazarev (mikael.lazarev@tokenstarter.io)
 *
 */

contract OptionPermission is Ownable {

    event SetAdmin (address indexed _address);
    event Whitelisted(address indexed _address);

    address public admin;
    mapping (address => bool) public whitelist;

    modifier onlyAdmin() {
        require((msg.sender == admin) || (msg.sender == owner));
        _;
    }

    // check if startup is in whitelist
    modifier onlyIfStartupWhitelisted () {
        require(checkStartupWhitelisted(msg.sender));
        _;
    }

    // @dev Set Admin Role to provided address
    function setAdmin(address _address) public onlyOwner {
        require(_address != address(0));
        admin = _address;
        emit SetAdmin(_address);
    }

    // Add startup to Whitelist
    function addToStartupWhiteList(address _address) public onlyAdmin {
        require(_address != address(0));
        whitelist[_address] = true;
        emit Whitelisted(_address);
    }

    // Remove startup from Whitelist
    function removeFromStartupWhiteList (address _address) public onlyAdmin {
        require(_address != address(0));
        whitelist[_address] = false;
    }

    function checkStartupWhitelisted (address _address) public view returns (bool) {
        return whitelist[_address];
    }




}

