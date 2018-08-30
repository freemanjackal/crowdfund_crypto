import EmbarkJS from 'Embark/EmbarkJS';
import CrowdFund from 'Embark/contracts/CrowdFund';
import React from 'react';
import { Form, FormGroup, FormControl, HelpBlock, Button, Col, Label, ControlLabel, Checkbox } from 'react-bootstrap';
 
class Campaigns extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        campaigns: [],
        campaigns_number: 0,
        
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
     
    getCampaigns(e){
      e.preventDefault();
      
      if (EmbarkJS.isNewWeb3()) {
        let cc = CrowdFund.methods.len().call().then(function(res){
           //console.log(res);
        });
        CrowdFund.methods.fundings(0).call().then(function(res){
          console.log(res[0]);
          _addToCampaign(res);
        })
      } else {
        
      }
    }
  
    _addToCampaign(campaigns){
      this.state.campaigns.push(campaigns);
      console.log(this.state.campaigns.length);
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
          </Form>;          
      </React.Fragment>
      );
    }
  
}
  export default Campaigns;