pragma solidity ^0.4.24;


contract DigitalCare {

    // Events

    // Constants

    // Variables

    uint public doctorsQty;
    mapping (address => int) doctorInList;

    address[] strategyProviersList;

    mapping (bytes32 => address) IPFSHashToStrategyProviderTo;

    struct Case {
        address patient;
        address doctor;
        bytes32 strategyIPFSHash;
        uint256 dateStrategyStarted;
        uint256 lastAction;
    }

    mapping (bytes32 => Case) public cases;

    struct Action {
        bytes32 caseHash;
        bytes32 IPFSHash;
        uint256 dateExecuted;
    }

    Action[] public actions;

    constructor () public {
        doctorInList[msg.sender] = 1;

    }

    // Modifiers

    modifier onlyOwner() {
        require(doctorInList[msg.sender] == 1);
        _;
     }

    modifier onlyDoctor() {
        require(doctorInList[msg.sender] == 2);
        _;
     }

    modifier onlyStrategyProvider() {
        require(doctorInList[msg.sender] == 3);
        _;
     }

    // Functions

    function addStrategyProvider(address _strategyProvider) public onlyOwner {
         doctorInList[_strategyProvider] = 3;
    }


    function addIPFSStrategy(bytes32 IPFSStrategy) public onlyStrategyProvider {
        IPFSHashToStrategyProviderTo[IPFSStrategy] == msg.sender;
    }


    // Add new doctor to list
    function addDoctor(address _doctorAddress) public onlyOwner {
        doctorInList[_doctorAddress] = 2;
        doctorsQty++;
    }


    function addMedicalCase(address _patient) onlyDoctor {
        bytes32 caseHash = keccak256(msg.sender, _patient);
        cases[caseHash] = Case(_patient, msg.sender, 0, 0, 0);
    }

    function submitAction(bytes32 caseHash, bytes32 actionHash) {
        require(cases[caseHash].patient == msg.sender);
        cases[caseHash].lastAction = actions.push(Action(caseHash, actionHash, now)) - 1;

    }

    function getLastActionByCaseHash(bytes32 caseHash) public view
        returns (
            bytes32 _caseHash,
            bytes32 _IPFSHash,
            uint256 _dateExecuted
            )
        {
        _caseHash = actions[cases[caseHash].lastAction].caseHash;
        _IPFSHash = actions[cases[caseHash].lastAction].IPFSHash;
        _dateExecuted = actions[cases[caseHash].lastAction].dateExecuted;

        }

    function setupStrategy(bytes32 caseHash, bytes32 _strategyIPFSHash) public {
        require(IPFSHashToStrategyProviderTo[_strategyIPFSHash] != 0x0);
        require(cases[caseHash].doctor == msg.sender);
        require(cases[caseHash].strategyIPFSHash != 0);
        cases[caseHash].strategyIPFSHash = _strategyIPFSHash;
        cases[caseHash].dateStrategyStarted = now;
    }




}
