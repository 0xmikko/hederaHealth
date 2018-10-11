pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";


contract SalesAgent is MintableToken {

    event SetSalesAgent (address indexed _address);

    // A contract which has permission to mint new Tokens
    address public salesAgent;

    // Check that specific user has a permission to Mint Option Tokens
    //
    modifier hasMintPermission() {
        require((msg.sender == owner) || (msg.sender == salesAgent));
        _;
    }

    // @dev Set Sales Agent Role to Contract
    // Sales Agent is a role which has a permission to mint new Option Tokens
    // It will be used in our Token Sale contract
    //
    // @param _address Address of New sales agent
    //
    function setSalesAgent(address _address) public onlyOwner {
        require(_address != 0x0);
        salesAgent = _address;
        emit SetSalesAgent(_address);
    }


}
