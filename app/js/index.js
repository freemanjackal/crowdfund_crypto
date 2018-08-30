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
    //this.child = React.createRef();
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
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


  _renderStatus(title, available){
    let className = available ? 'pull-right status-online' : 'pull-right status-offline';
    return <React.Fragment>
      {title} 
      <span className={className}></span>
    </React.Fragment>;
  }

  handleSelect(key){
    if(key == 2)
      this.child.getCampaigns(this.child);
    
  }

  render(){
    return (
      <div><h3>Contribute to make a better world </h3>
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" onSelect={this.handleSelect}>
        <Tab eventKey={1} title="Create crowdfuning campaign">
          <Blockchain />
        </Tab>
        <Tab eventKey={2} title="List of campaigns" >
         <Campaigns ref={instance => { this.child = instance; }}/>
        </Tab>
        <Tab eventKey={3} title="Campaign details" >
         <CampaignDetails/>
        </Tab>
      </Tabs>
    </div>);
  }
}

ReactDOM.render(<App></App>, document.getElementById('dapp'));
