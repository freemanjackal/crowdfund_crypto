import EmbarkJS from 'Embark/EmbarkJS';
import CrowdFund from 'Embark/contracts/CrowdFund';
import React from 'react';
import FieldGroup from './fieldgroup.js';
import { Form, FormGroup, FormControl, HelpBlock, Button, Col, Label, ControlLabel} from 'react-bootstrap';
 
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
        fileUpload: null,
        imageHash: ""
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
  

  submitFileIpfs(event){
    event.preventDefault();
    
    EmbarkJS.Storage.uploadFile(this.state.fileUpload)
      .then(function(hash) {console.log(hash)})
      .catch(function(err) {
          if(err){
            console.log("IPFS saveText Error => " + err);
          }
      });
      
  }

  addFile(event){
    event.preventDefault();
    this.setState({ fileUpload: [event.target] }, ()=>{
        EmbarkJS.Storage.uploadFile(this.state.fileUpload)
          .then((hash)=> {
                    this.setState({imageHash: hash})
                    console.log(EmbarkJS.Storage.getUrl(hash))
                  })
          .catch(function(err) {
              if(err){
              console.log("IPFS saveText Error => " + err);
            }
          });
      })
      //console.log("file")
  }

  handleSubmit(event){
      event.preventDefault();

     if (EmbarkJS.isNewWeb3()) {
        CrowdFund.methods.createCampaign(this.state.name, this.state.description, this.state.beneficiary, this.state.coordinator,
      this.state.goal, this.state.beneficiaryAddr, this.state.duration, this.state.openDate, this.state.imageHash).send({from: web3.eth.defaultAccount, gas:4000000}).then(function(){

      });

  
        } else {
            alert("not supported");

      }
    }


  
    _addToLog(txt){
      //this.state.logs.push(txt);
     // this.setState({logs: this.state.logs});
    }

            //<FieldGroup id="formControlsFile" type="file" label="File" help="Select an image to upload for the campaign"/>   
/*<FormGroup>
                <ControlLabel htmlFor="fileUpload" style={{ cursor: "pointer" }}><h3><Label bsStyle="success">Add file</Label></h3>
                    <FormControl id="fileUpload" type="file" accept=".txt" onChange={this.addFile} style={{ display: "none" }}/>
                </ControlLabel>
            </FormGroup>
            
            <Form inline>
                <FormGroup>
                    <FormControl
                        type="file"
                        onChange={(e) => this.addFile(e)} />
                    <Button bsStyle="primary" onClick={(e) => this.submitFileIpfs(e)}>Upload</Button>
                    <HelpBlock>generated hash: <span className="fileHash">{this.state.fileHash}</span></HelpBlock>
                </FormGroup>
            </Form>
        //    <FieldGroup id="formControlsFile" type="file" label="File" accept=".jpg" help="Select an image to upload for the campaign" onChange={(e) => this.addFile(e)}/>   
*/

    render(){
      return (<React.Fragment>
          <h3> Fill the data</h3>
          

          <Form horizontal>
              <FieldGroup id="formControlsFile" type="file" label="File" accept=".jpg" help="Select an image to upload for the campaign" onChange={(e) => this.addFile(e)}/>   

              
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
                    <FormControl name="description" componentClass="textarea" placeholder="Description" onChange={(e) => this.handleInputChange(e)}/>
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

            </FormGroup>
            <FormGroup>
                <Col smOffset={2} sm={3}>
                  <Button type="submit" onClick={(e) => this.submitFileIpfs(e)}>submit ipfs</Button>
                </Col>

            </FormGroup>

          </Form>        
      </React.Fragment>
      );
    }
  
}
  export default Blockchain;