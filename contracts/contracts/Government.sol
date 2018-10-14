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
        bytes32 indexed patientHash
    );

    address[] public strategyProviders;
    address[] public caseContracts;

    uint public doctorsQty;
    mapping (address => bool) doctorInList;

    // Modifiers:

    modifier onlyDoctor() {
        require(doctorInList[msg.sender]);
        _;
    }

    // @dev deployNewStrategy
    // @param _providerName - Name of new Strategy Provider


    constructor () public {
        doctorsQty = 0;
    }

    function deployNewStrategy(string _providerName)
        public
        onlyOwner
        returns (address)
    {

        // Creates new Option Sale Contract
        Strategy newStrategy = new Strategy(_providerName);

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
        emit CaseAdded(keccak256(_patient));

    }

}
