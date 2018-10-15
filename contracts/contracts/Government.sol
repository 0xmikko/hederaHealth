pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

import "./Strategy.sol";
import "./Case.sol";

// @title Goverment is main contract which allows goverment to control digital health
//
//
//  @author: Mikhail Lazarev (mikael.lazarev@tokenstarter.io)
//  @version: 0.1 (October 2018)

contract Government is Ownable {

    event StrategyProviderAdded(
        uint id,
        address indexed strategyProvider
    );

    event DoctorAdded(
        address indexed doctorAddress
    );

    event CaseAdded(
        address indexed patientHash
    );

    address[] public strategyProviders;

    uint public doctorsQty;
    mapping (address => bool) doctorInList;

    uint public casesQty;
    mapping (address => address) caseContractsToStrategy;

    // Modifiers:

    modifier onlyDoctor() {
        require(doctorInList[msg.sender]);
        _;
    }

    modifier onlyCases()
    {
        require(caseContractsToStrategy[msg.sender] != 0x0);
        _;
    }
    // @dev deployNewStrategy
    // @param _providerName - Name of new Strategy Provider


    constructor () public {
        doctorsQty = 0;
    }

    function deployNewStrategy(string _providerName, address _admin)
        public
        onlyOwner
        returns (address)
    {

        // Creates new Option Sale Contract
        Strategy newStrategy = new Strategy(_providerName, _admin);

        // Register contract in contract base
        uint newStrategyId = strategyProviders.push(address(newStrategy)) - 1;

        // Add event NewOptionContract
        emit StrategyProviderAdded(newStrategyId, address(newStrategy));

        return address(newStrategy);

    }

    /// @dev Returns how many contracts deployed in Factory
    function getStrategyProviderQty() public view returns (uint) {
        return strategyProviders.length;
    }

    // Add new doctor to list
    function addDoctor(address _doctorAddress) public onlyOwner returns (uint) {
        doctorInList[_doctorAddress] = true;
        emit DoctorAdded(_doctorAddress);
        doctorsQty++;
    }

    // Add new Case
    // For doctors only
    function setupCase(address _patient) public onlyDoctor {

        Case newCase = new Case(msg.sender, _patient);
        caseContractsToStrategy[address(newCase)] = 1;
        casesQty++;
        emit CaseAdded(address(newCase));

    }

    //
    // chooseStrategy is function to choose selected medical strategy
    // Strategy could be setup once
    //
    function setStrategy(address _case, address _strategy) public onlyCases returns (bool) {
        // When strategy is setup, it could not be changed
        // We check that case is setup (=1) but strategy is not setup yet
        require(caseContractsToStrategy[address(_case)] == 1);
        caseContractsToStrategy[address(_case)] = _strategy;
        return true;

    }
}
