pragma solidity ^0.4.10;


contract DigitalCare {

    bytes32 strategyIPFSHash;

    function setCase(bytes32 _strategyIPFSHash) public {
        strategyIPFSHash = _strategyIPFSHash;
        }
    
    function getCase() public returns (bytes32) {
        return strategyIPFSHash;
    }


}

