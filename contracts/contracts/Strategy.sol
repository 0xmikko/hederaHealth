pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";

import "./Case.sol";
import "./Government.sol";

    /*
     * @title OptionInterface
     *
     * @dev The Whitelist contract has a whitelist of addresses, and provides basic authorization control functions.
     * This simplifies the implementation of "user permissions".
     *
     * @author: Mikhail Lazarev (mikael.lazarev@tokenstarter.io)
     *
     */

contract Strategy is Ownable {

    using SafeMath for uint256;

    uint8 constant public PLANNED = 1;
    uint8 constant public EXECUTED = 2;
    uint8 constant public CANCELLED = 3;

    // Variables
    address public government;
    address public strategyHolder;
    string public providerName;

    struct Action {
        address caseAddress;
        uint8 status;
        string action;
        uint256 datePlanned;
        uint256 dateExecuted;
        uint256 qty;
    }

    Action[] public actions;

    mapping (uint => address) public actionsOwnerHashes;
    mapping (address => bool) public registeredCases;

	constructor(string _providerName, address _strategyHolder)
        public
    {
        providerName = _providerName;
        government = msg.sender;
        strategyHolder = _strategyHolder;

    }

    modifier onlyStrategyHolder() {
        require(msg.sender == strategyHolder);
        _;
    }

    modifier onlyRegisteredCases() {
        require(registeredCases[msg.sender]);
        _;
    }

    // Only goverment could register cases
    function addRegisterCase(address _case) public onlyOwner {
        registeredCases[_case] = true;
    }

    function addNextAction(
        address _case,
        string _action,
        uint256 _datePlanned,
        uint256 _dateExecute)
        public
        onlyStrategyHolder
        returns (uint)

        {
        uint newActionId = actions.push(Action(_case, PLANNED, _action, _datePlanned, _dateExecute, 0)) - 1;
        return newActionId;
        }

    function submitAction(uint _actionId) public returns (bool) {
        require(_actionId < actions.length, "Action does not exist.");
        require(actions[_actionId].caseAddress == msg.sender, "Case has no permission to change that");
        require(actions[_actionId].status == PLANNED, "You can't approve not planned actions");
        actions[_actionId].status = EXECUTED ;
    }

    function getActionById(uint _actionId) public view
        returns (
            address _case,
            uint8 _status,
            string _action,
            uint256 _datePlanned,
            uint256 _dateExecuted,
            uint256 _qty
        ) {

            require(_actionId < actions.length, "Action does not exist.");

            _case = actions[_actionId].caseAddress;
            _status = actions[_actionId].status;
            _action = actions[_actionId].action;
            _datePlanned = actions[_actionId].datePlanned;
            _dateExecuted = actions[_actionId].dateExecuted;
            _qty = actions[_actionId].qty;


    }
}