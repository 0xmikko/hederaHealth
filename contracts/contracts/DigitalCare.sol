pragma solidity ^0.4.24;


contract DigitalCare {

    // Events

    // Constants

    // Variables

    uint public doctorsQty;
    mapping (address => int) usersList;

    address[] strategyProviersList;

    mapping (bytes32 => address) IPFSHashToStrategyProviderTo;
    bytes32[] IPFSStrategyList;

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
        usersList[msg.sender] = 1;

    }

    // Modifiers

    modifier onlyOwner() {
        require(usersList[msg.sender] == 1);
        _;
     }

    modifier onlyDoctor() {
        require(usersList[msg.sender] == 2);
        _;
     }

    modifier onlyStrategyProvider() {
        require(usersList[msg.sender] == 3);
        _;
     }

    // Functions

    function addStrategyProvider(address _strategyProvider) public onlyOwner {
         usersList[_strategyProvider] = 3;
    }


    function addIPFSStrategy(bytes32 IPFSStrategy) public onlyStrategyProvider {
        IPFSHashToStrategyProviderTo[IPFSStrategy] == msg.sender;
        IPFSStrategyList.push(IPFSStrategy);
    }


    // Add new doctor to list
    function addDoctor(address _doctorAddress) public onlyOwner {
        usersList[_doctorAddress] = 2;
        doctorsQty++;
    }


    function createCase(address _patient, bytes32 _strategyIPFSHash) onlyDoctor {
        require(IPFSHashToStrategyProviderTo[_strategyIPFSHash] != 0x0);
        bytes32 caseHash = keccak256(msg.sender, _patient);
        cases[caseHash] = Case(_patient, msg.sender,  _strategyIPFSHash, now, 0);

    }

    function updateCaseByPatient(address _doctor, bytes32 actionHash) {
        bytes32 caseHash = keccak256(_doctor, msg.sender);
        require(cases[caseHash].patient == msg.sender);
        cases[caseHash].lastAction = actions.push(Action(caseHash, actionHash, now)) - 1;

    }

    function updateCaseByDoctor(address _patient, bytes32 actionHash) {
        bytes32 caseHash = keccak256(msg.sender, _patient);
        require(cases[caseHash].doctor == msg.sender);
        cases[caseHash].lastAction = actions.push(Action(caseHash, actionHash, now)) - 1;

    }

    function getCase(address _doctor, address _patient) public view
        returns (
            bytes32 _IPFSHash,
            uint256 _dateExecuted
            )
        {
        bytes32 caseHash = keccak256(_doctor, _patient);
        _IPFSHash = actions[cases[caseHash].lastAction].IPFSHash;
        _dateExecuted = actions[cases[caseHash].lastAction].dateExecuted;

        }

    function getIPFSStrategyQty() public view returns (uint256) {
        return IPFSStrategyList.length;
    }

    function getIPFSStrategyHashById(uint uid) public view returns (bytes32){
        require(uid < getIPFSStrategyQty());
        return IPFSStrategyList[uid];
    }


}
