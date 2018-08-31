import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab } from 'react-bootstrap';

import EmbarkJS from 'Embark/EmbarkJS';
import Blockchain from './components/blockchain';
import Campaigns from './components/list_campaigs';
import CampaignDetails from './components/campaign_details';
//import Whisper from './components/whisper';
//import Storage from './components/storage';

//import './dapp.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.handleSelect = this.handleSelect.bind(this);
    this.idCampaign = "1111111111";
    this.state = {
      key: 1,
      idC: "-1111111111111"
     // whisperEnabled: false,
      //storageEnabled: false
    }
  }

  componentDidMount(){ 
    EmbarkJS.onReady(() => {
      if (EmbarkJS.isNewWeb3()) {
        EmbarkJS.Messages.Providers.whisper.getWhisperVersion((err, version) => { 
          if(!err)
              this.setState({whisperEnabled: true})
            else
              console.log(err);
        });
      } else {
        if (EmbarkJS.Messages.providerName === 'whisper') {
          EmbarkJS.Messages.getWhisperVersion((err, version) => {
            if(!err)
              this.setState({whisperEnabled: true})
            else
              console.log(err);
          });
        }
      }

      this.setState({
        storageEnabled: true
      });
    });
  }

  changeActiveTab(val){

    this.handleSelect(3);
    this.state.idC = val;
    //console.log("chhh" + String(val));

    //console.log("changed" + String(val.target.value));
    //console.log("tr en 0" + String(val.target.value[0]));
    //console.log("tr en 1" + String(val.target.value[1]));
  }


  _renderStatus(title, available){
    let className = available ? 'pull-right status-online' : 'pull-right status-offline';
    return <React.Fragment>
      {title} 
      <span className={className}></span>
    </React.Fragment>;
  }

  handleSelect(key){
    this.setState({ key })
    if(key == 2)
      this.child.getCampaigns(this.child);
    
  }

  submitIpfs(){
    EmbarkJS.Storage.saveText("hello world")
  .then(function(hash) {console.log(hash)})
  .catch(function(err) {
      if(err){
        console.log("IPFS saveText Error => " + err.message);
      }
  });
  }

  render(){
    return (
      <div><h3>Contribute to make a better world </h3>{this.state.idC[0]} {this.state.idC.name} {this.state.idC[2]} {this.state.idC[3]} {this.state.idC[4]} {this.state.idC[5]}
      <Tabs id="uncontrolled-tab-example" activeKey={this.state.key} onSelect={this.handleSelect}>
        <Tab eventKey={1} title="Create crowdfuning campaign">
          <Blockchain />
        </Tab>
        <Tab eventKey={2} title="List of campaigns" >
         <Campaigns ref={instance => { this.child = instance; }} changeActiveTab={(val)=>this.changeActiveTab(val)}/>
        </Tab>
        <Tab eventKey={3} title="Campaign details" >
         <CampaignDetails idCampaign={this.state.idC}/>
        </Tab>
      </Tabs>
    </div>);
  }
}

ReactDOM.render(<App></App>, document.getElementById('dapp'));
