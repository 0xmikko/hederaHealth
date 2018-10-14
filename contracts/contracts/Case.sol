pragma solidity ^0.4.24;


import "./Government.sol";
import "./Strategy.sol";

/* @title OptionTokenStandard - Abstract contract to create Option Token Contracts
 * It containt whole logic except working with tokenContracts
 *
 *  Author: Mikhail Lazarev (mikael.lazarev@tokenstarter.io)
 */

contract Case is Ownable {

    event Execution (address indexed optionHolder, uint amount);

    using SafeMath for uint256;

    // Constants
    uint32 constant public DUTCH_AUCTION_PERIOD = 14 days;

    // Variables
    address patient;
    address doctor;
    address strategyContractAddress;

    constructor (
        address  _patient,
        address  _doctor,
    )
        public
    {
        //require(now < _expiredAt);

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

    // setup strategy could be done by Goverment contract
    // Goverment contract as Case holder set it up for Case
    // And connect Strategy contract also

    function setupStrategy(address _strategy) public onlyOwner {
        strategyContractAddress = _strategy;
    }

    function submitAction(uint32 actionHash) public onlyPatient {
        Strategy myStrategy = Strategy(strategyContractAddress);
        myStrategy.submitAction()
    }

}