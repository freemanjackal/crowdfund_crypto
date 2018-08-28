pragma solidity ^0.4.2;

import "./MathLib.sol";
import "./Ownable.sol";


/**
 * @title FundVault
 * @dev This contract is used for storing funds while a crowdsale
 * is in progress. Supports refunding the money if crowdsale fails,
 * and forwarding it if crowdsale is successful.
 */
contract FundVault is Ownable, MathLib {
 // using MathLib for uint256;

  
  address public crowdContract;
  mapping (uint => mapping (address => uint256)) public deposited;
  //address public wallet;
  //State public state;

  event Closed();
  event RefundsEnabled();
  event FundWtihDrew(address indexed beneficiary, uint256 weiAmount);
  event Refunded(address indexed beneficiary, uint256 weiAmount);


  function deposit(uint campaign) public payable {
    //require(state == State.Active);
    deposited[campaign][msg.sender] = safeAdd(deposited[campaign][msg.sender], msg.value);
  }



  function enableRefunds(uint campaig) onlyCrowdFund public {
    
    emit RefundsEnabled();
  }

  function refundV(uint campaign, address beneficiary) onlyCrowdFund public {
    require(deposited[campaign][beneficiary] > 0);
    //state = State.Refunding;
    beneficiary.transfer(deposited[campaign][beneficiary]);
    uint refunded = deposited[campaign][beneficiary];
    deposited[campaign][beneficiary] = 0;
    emit Refunded(beneficiary, refunded);
  }

  function withDrawFund(address beneficiary, uint amount) onlyCrowdFund  {
    //require(state == State.Closed);
  //  uint256 depositedValue = deposited[investor];
  //  deposited[investor] = 0;
    beneficiary.transfer(amount);
    emit FundWtihDrew(beneficiary, amount);
  }

  modifier onlyCrowdFund() { 
     require (msg.sender == crowdContract); 
     _; 
   }
    
  
}