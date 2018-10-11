pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TokenExampleMintable.sol";
import "../contracts/OptionFactory.sol";


contract TestOptionFactory {

    OptionFactory f;
    address tokenContract;

    function beforeAll() public {
        f = OptionFactory(DeployedAddresses.OptionFactory());
        tokenContract = address(new TokenExampleMintable("TEST", "TST", 18));
    }

    function testFactoryIsDeployed() public {
        uint contractsQty = f.getContractsQty();
        Assert.equal(contractsQty, 0, "No contract were developed");

    }
    /*

    function testFactoryDeployment() public {

        uint256 _optionPremiumRate = 5;
        uint256 _strikePriceRate = 1;
        uint256 _salesStartTime = now;
        uint256 _salesFinishTime = _salesStartTime + 14 days;
        uint256 _expiredAt = _salesFinishTime + 365 days;

        address _startup = this;

        uint newId = f.deployOptionContractsForMintable(
            _optionPremiumRate,
            _strikePriceRate,
            _salesStartTime,
            _salesFinishTime,
            _expiredAt,

            tokenContract,
            _startup);

        Assert.equal(newId, 1, "One contract were developed");


    }*/

}
