pragma solidity ^0.4.24;


import "./Government.sol";
import "./Strategy.sol";

/* @title OptionTokenStandard - Abstract contract to create Option Token Contracts
 * It containt whole logic except working with tokenContracts
 *
 *  Author: Mikhail Lazarev (mikael.lazarev@tokenstarter.io)
 */

contract Case is Ownable {


    using SafeMath for uint256;

    // Constants

    // Variables
    address patient;
    address doctor;
    address governmentAddress;
    address strategyContractAddress;

    // Strategy approval
    mapping (address => bool) strategyApprovement;

    constructor (
        address  _patient,
        address  _doctor
    )
        public
    {
        governmentAddress = msg.sender;
        patient = _patient;
        doctor = _doctor;

    }

    // Allow to execute function before expiration date
    modifier onlyPatient {
        require(msg.sender == patient);
        _;
    }

    // Allow to execute function before burning date
    modifier onlyDoctor {
        require(msg.sender == doctor);
        _;
    }

    modifier onlyPatientOrDoctor {
        require((msg.sender == doctor) || (msg.sender == patient));
        _;
    }
    // setup strategy could be done by Goverment contract
    // Goverment contract as Case holder set it up for Case
    // And connect Strategy contract also

    function setupStrategy(address _strategy) public onlyPatientOrDoctor {
        strategyApprovement[msg.sender] = true;
        require(strategyApprovement[patient] && strategyApprovement[doctor]);
        Government government = Government(governmentAddress);
        require(government.setStrategy(address(this), _strategy));
        strategyContractAddress = _strategy;

    }

    function submitAction(uint32 actionHash) public onlyPatient {
        Strategy myStrategy = Strategy(strategyContractAddress);
        myStrategy.submitAction(actionHash);
    }

}