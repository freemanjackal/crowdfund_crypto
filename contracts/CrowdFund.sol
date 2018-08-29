pragma solidity ^0.4.2;
pragma experimental ABIEncoderV2;

import "./MathLib.sol";
import "./Ownable.sol";

//import "./FundVault.sol";


/**
 * @title 
 * 
 */
contract CrowdFund is  Ownable, MathLib{

enum State { Active, Claiming, Closed, Refunding, Refunded }
enum Validation { Normal, Validating, Valid, Invalid }
struct Fund {
    string name;
    string beneficiary;
//    string coordinator;
    uint goal;
   // Util details;
    string description;
    address beneficiaryAddr;
    uint32 duration;
    uint32 openDate;
    string state;
    string validState;
    mapping (uint => Contributor) contributors;

  }

  /*struct Util{
    string description;
    address beneficiaryAddr;
    uint32 duration;
    uint32 openDate;
    string state;
    string validState;
  }*/
  struct Contributor {
        address addr;
        uint amount;
    }


  Fund[] public fundings;



  // refund vault used to hold funds while crowdsale is running
 // FundVault public vault;

  event CrowdFundCreated(string name, uint goal, uint32 duration);

  function constructor( )  public {
    
    //vault = new FundVault(ethVaultAddr); // addr where funds will be forwarded after ico finalized and sofcapt(goal) is reached
  }


  
  /*function claimfund(uint campaign) public {
    require(isFinalized);
    require(msg.sender == fundings[campaign].beneficiaryAddr);

    vault.withDrawFund(msg.sender, uint amount);
  }*/
  function goalReached(uint campaign) public returns (bool) {

    //return fundings[campaign].amount >= fundings[campaign].goal;
  }

  // crowdfunding campaign finalization 
  function finalize(uint campaign) internal {
     // fundings[campaign].details.state = State.Closed;
   
  }


  function sendFunds(uint campaign)  {
   // vault.deposit.value(msg.value)(msg.sender);
   //require(fundings[campaign].details.state == State.Active);
   //require(fundings[campaign].details.validState == Validation.Normal);
   deposit(campaign);
  }

  function requestValidation(uint campaign) public{
    require(msg.value >= 0.01 ether);
    //require(fundings[campaign].details.validState == Validation.Normal);
    //require(fundings[campaign].details.state == State.Active);
    //fundings[campaign].details.validState = Validation.Validating;
  }

  function refund(uint campaign){
    //require(fundings[campaign].details.validState == Validation.Invalid);
    //vault.refund(campaign, msg.sender);
    refundV(campaign, msg.sender);

    //fundings[campaign].details.state = State.Refunded;
  }

  function withDraw(uint campaign) public  {
    Fund fund = fundings[campaign];
    //require(fund.details.state == State.Claiming);
    require(msg.sender == fund.beneficiaryAddr);
    //require(fund.amount > 0);
    //withDrawFund(fund.beneficiaryAddr, fund.amount);
    finalize(campaign);
  }

  function validateCampaign(uint campaign, bool state) external onlyOwner{
   //   require(fundings[campaign].details.validState == Validation.Validating);
      if(state == false){
     //   fundings[campaign].details.validState = Validation.Invalid;
       // fundings[campaign].details.state = State.Refunding;
      }
      else{
        //fundings[campaign].details.validState = Validation.Valid;
      }
  }

  function createCampaign(string name, string description, string beneficiary, string coordinator,
    uint goal, address beneficiaryAddr, uint32 duration, uint32 openDate) public {

    //fundings.push(Fund(name, beneficiary, coordinator, 0, goal));
   /* fundings.push(Fund(name, beneficiary, coordinator, 0, goal, Util(description, beneficiaryAddr, duration, 
                 openDate, "Active", "Validation.Normal")));*/

    fundings.push(Fund(name, beneficiary, goal, description, beneficiaryAddr, duration, 
                 openDate, "Active", "Validation.Normal"));             
    emit CrowdFundCreated(name, goal, duration);

  }

  function getFund(uint index) view public returns(Fund){
    return fundings[index];
  }
  /////vault contract

  function len() public constant returns(uint){
    return fundings.length;
  }

  function refundV(uint cc, address ss ){

  }

  function withDrawFund(address dd, uint amoo){

  }

  function deposit(uint campaign){

  }

}