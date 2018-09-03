import EmbarkJS from 'Embark/EmbarkJS';
import CrowdFund from 'Embark/contracts/CrowdFund';
import React from 'react';
import { Form, FormGroup, FormControl, HelpBlock, Button, Col, Label, ControlLabel, Checkbox, Image } from 'react-bootstrap';
import "../../css/font-awesome.min.css";
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
     
    getCampaigns(){
      var len = 0;
      if (EmbarkJS.isNewWeb3()) {
        CrowdFund.methods.len().call().then((res)=> this.setLenCampaigns(res));
        for(let i = 0; i < this.len; i ++)
          CrowdFund.methods.fundings(i).call().then((res)=> {
            this._addToCampaign(res)})
        
      } else {
        
      }
    }

    setLenCampaigns(len){

      let longitud = parseInt(len)
      if(this.state.campaigns_number != longitud)
       for(let i = this.state.campaigns_number; i < len; i ++){
          CrowdFund.methods.fundings(i).call().then((res)=> {
            res["id"] = i;
            this._addToCampaign(res)
          })
            
            this.state.campaigns_number ++;
        }
    }

    getImg(hash) {
        let _url = EmbarkJS.Storage.getUrl(hash);
        return _url;

    }

  
    _addToCampaign(campaigns){
      campaigns['src'] = this.getImg(campaigns[11])//"./blue2.jpg";
      console.log(campaigns)
      this.state.campaigns.push(campaigns);
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
      return (
          this.state.campaigns_number == 0 ?
                <h3>No campaigns created yet</h3>    

            :    
      <React.Fragment>
      
          <h3>All Campaigns </h3>
          
          <div sm={12} >
          {
            this.state.campaigns.map((item, i) => 
            <div  key={i} className="ousettt col-sm-3 col-md-3">
              <Image className="imgBrief" src={this.state.campaigns[i].src}/>

              <p >{item[0].toUpperCase()}</p>
              <p >{item[1].toUpperCase()}</p>
              
              <Button type="submit" className="btn btn-success" value={item}  onClick={()=>this.changeActiveTabe(item)}>View details</Button>
              

            </div>
            )
          }
          </div>  

      </React.Fragment>
      );
    }
  
}
  export default Campaigns;