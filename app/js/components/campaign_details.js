
import EmbarkJS from 'Embark/EmbarkJS';
import CrowdFund from 'Embark/contracts/CrowdFund';
import React from 'react';
import { Form, FormGroup, FormControl, HelpBlock, Button, Col, Label, ControlLabel, Checkbox } from 'react-bootstrap';
 
class CampaignDetails extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        campaign: props.idCampaign
        
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
      <ul className="nav nav-pills nav-stacked">
        <li className="active"><a href="#section1">Home--{this.state.campaign[1]}</a></li>
      </ul>
      
    </div>

    <div className="col-sm-9">
           
      <h4><small>Goal: {this.props.idCampaign[2]}</small></h4>
      <h2>Campaign duration</h2>
      <h5><span className="glyphicon glyphicon-time"></span> Post by John Doe, Sep 24, 2015.</h5>
      <h5><span className="label label-success">Crowdfunding description</span></h5>
      <p>{this.props.idCampaign[3]}</p>

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