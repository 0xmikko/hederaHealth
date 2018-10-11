pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";


contract TokenExampleBurnable is StandardToken, BurnableToken {

    string public name;
    string public symbol;
    uint8 public  decimals;

    constructor (
                 string _name,
                 string _symbol,
                 uint8 _decimals,
                 uint256 _initial_supply
        )
        public
    {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply_ = _initial_supply * (10 ** uint256(decimals));
        balances[msg.sender] = totalSupply_;

        emit Transfer(address(0), msg.sender, totalSupply_);

    }

}
