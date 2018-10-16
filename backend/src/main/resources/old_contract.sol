pragma solidity ^0.4.10;


contract DigitalCare {

    mapping (address => int) usersList;
    
    struct Case {
        address patient;
        address doctor;
        bytes32 strategyIPFSHash;
        bytes32 lastStateIPFSHash;
    }

    mapping (bytes32 => Case) public cases;

    function DigitalCare() public {
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

    // Add new doctor to list
    function addDoctor(address _doctorAddress) public onlyOwner {
        usersList[_doctorAddress] = 2;
    }

    function createCase(address _patient, bytes32 _strategyIPFSHash) public {
        bytes32 caseHash = keccak256(msg.sender, _patient);
        cases[caseHash] = Case(_patient, msg.sender,  _strategyIPFSHash, 0);
    }
    
    function updateCaseByPatient(address _doctor, bytes32 _actionHash) public {
        bytes32 caseHash = keccak256(_doctor, msg.sender);
        require(msg.sender == cases[caseHash].patient);
        cases[caseHash].lastStateIPFSHash = _actionHash;
    }


}
