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
     
    getCampaigns(comp){
      var len = 0;
      if (EmbarkJS.isNewWeb3()) {
        CrowdFund.methods.len().call().then((res)=> this.setLenCampaigns(res));
        for(let i = 0; i < this.len; i ++)
          CrowdFund.methods.fundings(i).call().then((res)=> this._addToCampaign(res))
        
      } else {
        
      }
    }

    setLenCampaigns(len){
      console.log(typeof(len ))

      let longitud = parseInt(len)
      if(this.state.campaigns_number != longitud)
       for(let i = this.state.campaigns_number; i < len; i ++){
          CrowdFund.methods.fundings(i).call().then((res)=> this._addToCampaign(res))
          
            this.state.campaigns_number ++;
        }
    }
  
    _addToCampaign(campaigns){
      this.state.campaigns.push(campaigns);
      //console.log(this.state.campaigns.length);
     // this.setState({logs: this.state.logs});
    }
    viewDetails(e){
      alert("details")
    }
    //onClick={this.props.changeActiveTab}
    changeActiveTabe(e){
      console.log("child " + e[0]+ e[1])
      this.props.changeActiveTab(e);
    }

    render(){
      return (<React.Fragment>
          <h3>All Campaigns </h3>
          <Form horizontal>
            

          

            
          </Form>
          <div className="">
          {
            this.state.campaigns.map((item, i) => 
            <Col sm={3} key={i}>
            <div key={i}>
              <p >{item[0]}</p>
              <p >{item[1]}</p>
              
              <Button type="submit" className="btn btn-success" value={item}  onClick={()=>this.changeActiveTabe(item)}>View details</Button>
              
            </div>
            </Col>
            )
          }
          </div>   
      </React.Fragment>
      );
    }
  
}
  export default Campaigns;