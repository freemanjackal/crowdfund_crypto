import EmbarkJS from 'Embark/EmbarkJS';
import CrowdFund from 'Embark/contracts/CrowdFund';
import React from 'react';
import { Form, FormGroup, FormControl, HelpBlock, Button, Col, Label, ControlLabel, Checkbox } from 'react-bootstrap';
 
class Blockchain extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        name: "",
        description: "",
        beneficiary: "",
        coordinator: "",
        goal: 0,
        beneficiaryAddr: "",
        duration: "",
        openDate: "",
      }
    }
  
    handleChange(e){
      this.setState({valueSet: e.target.value});
    }
  
  handleInputChange(event) {
    const target = event.target;
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event){
      event.preventDefault();

     if (EmbarkJS.isNewWeb3()) {
        CrowdFund.methods.createCampaign(this.state.name, this.state.description, this.state.beneficiary, this.state.coordinator,
      this.state.goal, this.state.beneficiaryAddr, this.state.duration, this.state.openDate).send({from: web3.eth.defaultAccount, gas:4000000}).then(function(){

      });

  
        } else {
            alert("es kaa");

      }
    }
    setValue(e){
      e.preventDefault();
      return;
      var value = parseInt(this.state.valueSet, 10);
  
      // If web3.js 1.0 is being used
      if (EmbarkJS.isNewWeb3()) {
        //SimpleStorage.methods.set(value).send({from: web3.eth.defaultAccount});
        this._addToLog("SimpleStorage.methods.set(value).send({from: web3.eth.defaultAccount})");
      } else {
       // SimpleStorage.set(value);
        this._addToLog("#blockchain", "SimpleStorage.set(" + value + ")");
      }
    }
  
    get(e){
      e.preventDefault();
      
      if (EmbarkJS.isNewWeb3()) {
        let cc = CrowdFund.methods.len().call().then(function(res){
           //console.log(res);
        });
        console.log("cc*****************************************************************************" )
        //console.log(String(CrowdFund.methods.getFund(0)));
        console.log("555555555555555555555555555555555555555555555555555555555555")
        //console.log(JSON.parse(CrowdFund.methods.getFund(0)));
        console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
        CrowdFund.methods.fundings(0).call().then(function(res){
          console.log(res[0])
        })
       


        //console.log(JSON.parse(cc[0]) )
          //.then(_value => this.setValue(e))
      } else {
        /*SimpleStorage.get()
          .then(_value => this.setState({valueGet: _value}));
        this._addToLog("SimpleStorage.get()");*/
      }
    }
  
    _addToLog(txt){
      //this.state.logs.push(txt);
     // this.setState({logs: this.state.logs});
    }
  //string name, string description, string beneficiary, string coordinator,
//    uint goal, address beneficiaryAddr, uint32 duration, uint32 openDate) public {

    render(){
      return (<React.Fragment>
          <h3> Fill the data</h3>
          <Form horizontal>
            <FormGroup controlId="name">
              <Col componentClass={ControlLabel} sm={2}>
              Name
              </Col>
                <Col sm={3}>
                <FormControl name="name" type="text" placeholder="Name" onChange={(e) => this.handleInputChange(e)}/>
              </Col>
              </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                    Descrption
                </Col>
                <Col sm={3}>
                    <FormControl name="description" type="textarea" placeholder="Description" onChange={(e) => this.handleInputChange(e)}/>
                </Col>
            </FormGroup>

            <FormGroup controlId="beneficiary">
                <Col componentClass={ControlLabel} sm={2}>
                    Bneficiary name
                </Col>
                <Col sm={3}>
                    <FormControl type="text" name="beneficiary" placeholder="beneficiary name" onChange={(e) => this.handleInputChange(e)}/>
                </Col>
            </FormGroup>
            <FormGroup controlId="coordinator">
                <Col componentClass={ControlLabel} sm={2}>
                    Coordinator
                </Col>
                <Col sm={3}>
                    <FormControl type="text" name="coordinator" placeholder="coordinator name" onChange={(e) => this.handleInputChange(e)}/>
                </Col>
            </FormGroup>
            <FormGroup controlId="goal">
                <Col componentClass={ControlLabel} sm={2}>
                    Goal campaign
                </Col>
                <Col sm={3}>
                    <FormControl type="text" name="goal" placeholder="hope to raise" onChange={(e) => this.handleInputChange(e)}/>
                </Col>
            </FormGroup>
            <FormGroup controlId="addrbenef">
                <Col componentClass={ControlLabel} sm={2}>
                    Eth beneficiary address
                </Col>
                <Col sm={3}>
                    <FormControl type="text" name="beneficiaryAddr" placeholder="Eth address" onChange={(e) => this.handleInputChange(e)}/>
                </Col>
            </FormGroup>
            <FormGroup controlId="duration">
                <Col componentClass={ControlLabel} sm={2}>
                    Duration  of campaign
                </Col>
                <Col sm={3}>
                    <FormControl type="text" name="duration" placeholder="campaign duration" onChange={(e) => this.handleInputChange(e)}/>
                </Col>
            </FormGroup>
            <FormGroup controlId="open">
                <Col componentClass={ControlLabel} sm={2}>
                    Open date
                </Col>
                <Col sm={3}>
                    <FormControl type="text" name="openDate" placeholder="open date" onChange={(e) => this.handleInputChange(e)}/>
                </Col>
            </FormGroup>

            
            <FormGroup>
                <Col smOffset={2} sm={3}>
                  <Button type="submit" onClick={(e) => this.handleSubmit(e)}>Create Campaign</Button>
                </Col>

                <Col smOffset={2} sm={3}>
                  <Button type="submit" onClick={(e) => this.get(e)}>get length</Button>
                </Col>
            </FormGroup>

          </Form>;          
      </React.Fragment>
      );
    }
  
}
  export default Blockchain;