
import EmbarkJS from 'Embark/EmbarkJS';
import CrowdFund from 'Embark/contracts/CrowdFund';
import React from 'react';
import { Form, FormGroup, FormControl, HelpBlock, Button, Col, Label, ControlLabel, Checkbox } from 'react-bootstrap';
 
class CampaignDetails extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        
        
      }
    }
  
  

    render(){
      return (<React.Fragment>
            <div className="container-fluid">
  <div className="row content">
    <div className="col-sm-3 sidenav">
      <h4>John's Blog</h4>
      <ul className="nav nav-pills nav-stacked">
        <li className="active"><a href="#section1">Home</a></li>
      </ul>
      <div className="input-group">
        <FormControl type="text" name="duration" placeholder="campaign duration" onChange={(e) => this.handleInputChange(e)}/>
        <span className="input-group-btn">
          <button className="btn btn-default" type="button">
            <span className="glyphicon glyphicon-search"></span>
          </button>
        </span>
      </div>
    </div>

    <div className="col-sm-9">
           
      <h4><small>RECENT POSTS</small></h4>
      <h2>Officially Blogging</h2>
      <h5><span className="glyphicon glyphicon-time"></span> Post by John Doe, Sep 24, 2015.</h5>
      <h5><span className="label label-success">Lorem</span></h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

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