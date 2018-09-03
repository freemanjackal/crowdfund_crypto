import EmbarkJS from 'Embark/EmbarkJS';
import CrowdFund from 'Embark/contracts/CrowdFund';
import React from 'react';
import FieldGroup from './fieldgroup.js';
import { Form, FormGroup, FormControl, HelpBlock, Button, Col, Label, ControlLabel, Image} from 'react-bootstrap';
import { AlertList, Alert, AlertContainer } from "react-bs-notifier"; 

class Blockchain extends React.Component {

    constructor(props) {
      super(props);
      //window.URL.createObjectURL("img");
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
        imageHash: "",
        src: "",
        alerts: [],
        timeout: 5,
        
      }
    }
  
    handleChange(e){
      this.setState({valueSet: e.target.value});
    }

  //set type and message as parameters
  notifications(){
    const newAlert ={
      id: (new Date()).getTime(),
      type: 'success',
      headline: 'Success!',
      message: "The crowdfunding campaign was created successfully",


    };

    this.setState({
      alerts : [...this.state.alerts, newAlert]
    });
  }
   onAlertDismissed(alert) {
    const alerts = this.state.alerts;

    // find the index of the alert that was dismissed
    const idx = alerts.indexOf(alert);

    if (idx >= 0) {
      this.setState({
        // remove the alert from the array
        alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
      });
    }
  }
  handleN(e){
    e.preventDefault();

    this.notifications();
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
                    console.log(hash);
                    this.getImg(hash);
                  })
          .catch(function(err) {
              if(err){
              console.log("IPFS saveText Error => " + err);
            }
          });
      })
  }

  getImg(hash) {

    let _url = EmbarkJS.Storage.getUrl(this.state.imageHash);
    this.setState({src: _url})

}

  handleSubmit(event){
      event.preventDefault();

      
     if (EmbarkJS.isNewWeb3()) {
      if (this.checkFields()){
      if(this.isAddress(this.state.beneficiaryAddr))
        CrowdFund.methods.createCampaign(this.state.name, this.state.description, this.state.beneficiary, this.state.coordinator,
      this.state.goal, this.state.beneficiaryAddr, this.state.duration, this.state.openDate, this.state.imageHash).send({from: web3.eth.defaultAccount, gas:4000000}).then(()=>{
            this.notifications();
            this.clean();
      });
      else
        alert("no addr")
      } else{
        alert("You need to fill name, beneficiary, beneficiaryAddr and goal to proceed")
      }
  
        } else {
            alert("not supported");

      }
    }

    clean(){
      console.log("lean");
      //this.state = defaultState;
      this.setState({
        name: "",
        description: "",
        beneficiary: "",
        coordinator: "",
        goal: 0,
        beneficiaryAddr: "",
        duration: "",
        openDate: "",
        fileUpload: null,
        imageHash: "",
        src: ""
      });
    }

    isAddress(address){
     return web3.utils.isAddress(address);
    }

    checkFields(){
      if(this.state.name === "" || this.state.beneficiary === "" || this.state.beneficiaryAddr === "" ||
        this.state.goal == 0 )
        return false;
      return true;
    }



    render(){
      return (<React.Fragment>
        <AlertList
          alerts={this.state.alerts}
          timeout={this.state.timeout}
          onDismiss={this.onAlertDismissed.bind(this)}
        />
          <div className="offset-sm-2">
              <h3 className="float-center text-center"> Start your campaign</h3>
          </div>
          <Form id="needsValidation" ref="needsValidation">
          <div inline="true">
            <FieldGroup id="formControlsFile" type="file" className="col-sm-12" label="File" accept=".jpg" help="Select an image to upload for the campaign" onChange={(e) => this.addFile(e)}/>   

              
            <FormGroup controlId="name" className="col-sm-12">
              <div className="col-sm-5">
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <FormControl name="name" required className="col-sm-3" type="text" value ={this.state.name} placeholder="Name" onChange={(e) => this.handleInputChange(e)}/>
              </div>

              <div controlId="beneficiary" className="col-sm-5">
                <Col componentClass={ControlLabel} sm={8}>
                    Bneficiary name
                </Col>
                    <FormControl type="text" name="beneficiary" required value={this.state.beneficiary} placeholder="beneficiary name" onChange={(e) => this.handleInputChange(e)}/>
              </div>
            </FormGroup>

            <FormGroup controlId="descrption" className="col-sm-12">
              <div className="col-sm-10">

                <Col componentClass={ControlLabel} sm={2}>
                    Descrption
                </Col>
                    <FormControl name="description" value={this.state.description} componentClass="textarea" placeholder="Description" onChange={(e) => this.handleInputChange(e)}/>
              </div>
            </FormGroup>
            

            
            
            <FormGroup className="col-sm-12">
              <div className="col-sm-5">

                <Col componentClass={ControlLabel} sm={8}>
                    Goal campaign
                </Col>
                <FormControl type="text" name="goal" required value={this.state.goal} placeholder="Hope to crowdfund" onChange={(e) => this.handleInputChange(e)}/>
              </div>
              <div className="col-sm-5">

                <Col componentClass={ControlLabel} sm={12}>
                    Eth beneficiary address
                </Col>
                    <FormControl type="text" required name="beneficiaryAddr" value={this.state.beneficiaryAddr} placeholder="Eth address" onChange={(e) => this.handleInputChange(e)}/>
              </div>
            </FormGroup>
            <FormGroup className="col-sm-12">
              <div className="col-sm-5">
                <Col componentClass={ControlLabel} sm={8}>
                    Open date
                </Col>
                    <FormControl type="text" name="openDate" placeholder="open date" value={this.state.openDate}onChange={(e) => this.handleInputChange(e)}/>
              </div>  
              <div className="col-sm-5">
                <Col componentClass={ControlLabel} sm={12}>
                    Duration  of campaign
                </Col>
                    <FormControl type="text" name="duration" placeholder="campaign duration" value={this.state.duration} onChange={(e) => this.handleInputChange(e)}/>
                </div>
            </FormGroup>
            

            
            <FormGroup className="col-sm-12">
              <div className="col-sm-5">

                  <Button type="submit" className="btn btn-success" onClick={(e) => this.handleSubmit(e)}>Create Campaign</Button>
              </div>    
            </FormGroup>
            
            <div className="col-sm-12 last">
            </div>
          </div>
            
          </Form>        
      </React.Fragment>
      );
    }
  
}
  export default Blockchain;