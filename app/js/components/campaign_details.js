
import EmbarkJS from 'Embark/EmbarkJS';
import CrowdFund from 'Embark/contracts/CrowdFund';
import React from 'react';
import { Form, FormGroup, FormControl, HelpBlock, Button, Col, Label, ControlLabel, Checkbox } from 'react-bootstrap';
 
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
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    const value = target.value;
    this.setState({
      contribution: value
    });
  }

    handleContribution(e){
      console.log("contribution");
      e.preventDefault();

     if (EmbarkJS.isNewWeb3()) {
        CrowdFund.methods.sendFunds(0).send({from: web3.eth.accounts[0], gas: 3000000, value: 2}).then((res)=> {
          console.log(this.props.idCampaign[10]);
          console.log(this.state.contribution);
          console.log(parseFloat(this.props.idCampaign[10]) + parseFloat(this.state.contribution));
          this.props.idCampaign[10] = parseFloat(this.props.idCampaign[10]) + parseFloat(this.state.contribution); 
          console.log(this.props.idCampaign[10]);
          this.forceUpdate()

        });


  
        } else {
            alert("not supported");

      }
    }
  
  addComment(){

    
  }

    render(){
      return (<React.Fragment>
            <div className="container-fluid">
  <div className="row content">
    <div className="col-sm-3 sidenav">
      <h4>{this.props.idCampaign[0]}</h4>
            
    </div>

    <div className="col-sm-9">
           
      <h4><small>Goal: {this.props.idCampaign[2]}-----------Contributed: {this.props.idCampaign[10]}</small></h4>
      <h2>Campaign duration</h2>
      <h5><span className="glyphicon glyphicon-time"></span> {this.props.idCampaign[5]}</h5>
      <h5><span className="label label-success">Crowdfunding description</span></h5>
      <p>{this.props.idCampaign[3]}</p>
      <div className="col-sm-12">
      <Form inline>

          <FormGroup controlId="open" className="col-sm-7">
                <Col componentClass={ControlLabel} sm={5}>
                    Eth contribution
                </Col>
                    <FormControl type="text" name="contribution" placeholder="Contribute with Eth" onChange={(e) => this.handleInputChange(e)}/>
            </FormGroup>

            
            <FormGroup className="col-sm-4">
                  <Button type="submit" onClick={(e) => this.handleContribution(e)}>Send contribution</Button>

            </FormGroup>  
      </Form>
    </div>
      <h4>Leave a Comment:</h4>
      <form role="form">
        <div className="form-group">
          <textarea className="form-control" rows="3" required></textarea>
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
      
      <p><span className="badge">2</span> Comments:</p>
      
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