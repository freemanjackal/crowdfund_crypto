
import EmbarkJS from 'Embark/EmbarkJS';
import CrowdFund from 'Embark/contracts/CrowdFund';
import React from 'react';
import ReactDOM from 'react-dom';
import { Form, FormGroup, FormControl, HelpBlock, Button, Col, Label, ControlLabel, Checkbox, ProgressBar, InputGroup, Alert, Image} from 'react-bootstrap';
 
class CampaignDetails extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        campaign: props.idCampaign,
        contribution: 0
        
      }
    }

    handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    this.setState({
      contribution: value
    });
  }

    handleContribution(e){
      console.log("contribution");
      console.log(this.props.idCampaign["id"]);
      console.log(this.props.idCampaign);

      e.preventDefault();

     if (EmbarkJS.isNewWeb3()) {
        CrowdFund.methods.sendFunds(this.props.idCampaign["id"]).send({from: web3.eth.defaultAccount, gas: 3000000, value: this.state.contribution}).then((res)=> {
          this.props.idCampaign[10] = parseFloat(this.props.idCampaign[10]) + parseFloat(this.state.contribution); 
          this.forceUpdate()

        });


  
        } else {
            alert("not supported");

      }
    }
  
  addComment(){

    
  }
  withdraw(e){
      e.preventDefault();
      console.log(web3.eth.accounts[0])
      console.log(web3.eth.defaultAccount)
      //0xB8D851486d1C953e31A44374ACa11151D49B8bb3
     if (EmbarkJS.isNewWeb3()) {
        CrowdFund.methods.withDraw(this.props.idCampaign["id"]).send({from: web3.eth.defaultAccount, gas: 3000000}).then((res)=> {
          this.forceUpdate()

        });


  
        } else {
            alert("not supported");

      }

  }

    render(){
      let button;
      if(web3.eth.defaultAccount === this.props.idCampaign["beneficiaryAddr"]){
          button = <Button id="withDraw" type="submit" className="btn btn-danger"  onClick={(e)=>this.withdraw(e)}>Withdraw funds</Button>;

      } else {
          button = '';
      }
      
       return (

        this.props.idCampaign == -1 ?
          <React.Fragment>
              <Alert bsStyle="warning">Please select a crowdfunding campaign to see its details and contribute if you wish so.</Alert>
          </React.Fragment>
      :  

          <React.Fragment>

      {
          this.props.idCampaign["state"] == 2 ?
          <React.Fragment>
              <Alert bsStyle="warning">This campaign is closed, please do no send funds to it.</Alert>
          </React.Fragment>
          : ''
        }

            <div className="container-fluid">
            {button}

  <div className="row content">
    

    <Image className="imgBrief" className="col-sm-4" src={this.props.idCampaign.src}/>

    <div className="col-sm-9">
    <div className="col-sm-12 sidenav upper">
      <h1>{this.props.idCampaign[0]}</h1>
            
    </div>
    <div className="col-sm-12 ">
          <ProgressBar max={parseInt(this.props.idCampaign[2])} now={parseInt(this.props.idCampaign[10])} label={parseInt(this.props.idCampaign[10])}/> 
    </div>
      <div className="col-sm-12">
      <h3>Campaign duration</h3>
      <h5><span className="glyphicon glyphicon-time"></span> {this.props.idCampaign[5]}</h5>
      <h3><span>Crowdfunding description</span></h3>
      <p>{this.props.idCampaign[3]}</p>
      </div>
      <div className="col-sm-12">
      <Form inline>

            <FormGroup className="col-sm-12 inputs" >
                <InputGroup>
                <InputGroup.Addon>Eth</InputGroup.Addon>
                  <FormControl type="text" name="contribution" placeholder="Contribute with Eth" onChange={(e) => this.handleInputChange(e)}/>
                  <InputGroup.Button><Button className="btn btn-success eth" disabled={this.props.idCampaign["state"]==2} type="submit" onClick={(e) => this.handleContribution(e)}>Send contribution</Button></InputGroup.Button>
                  

                </InputGroup>

            </FormGroup>

            

      </Form>
    </div>
      <div className="col-sm-12">

      <h4>Leave a Comment:</h4>
      <form role="form">
        <div className="form-group inputs">
          <textarea className="form-control" rows="3" required></textarea>
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
      
      <p><span className="badge">2</span> Comments:</p>
      </div>
      
      <div className="row">
        <div className="col-sm-2 text-center">
        </div>
        <div className="col-sm-10">
          <h4>Anja <small>Sep 29, 2015, 9:12 PM</small></h4>
          <p>Keep up the GREAT work! I am cheering for you!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
                
      </div>
    </div>
  </div>
</div>
      </React.Fragment>
      );
    }
  
}
  export default CampaignDetails;