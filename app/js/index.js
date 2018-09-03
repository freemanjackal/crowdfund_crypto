import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, ProgressBar, Row, Col, Nav, NavItem,PageHeader } from 'react-bootstrap';

import EmbarkJS from 'Embark/EmbarkJS';
import Blockchain from './components/blockchain';
import Campaigns from './components/list_campaigs';
import CampaignDetails from './components/campaign_details';
import Carousel from './components/carousel';

import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, PinterestShareButton, RedditShareButton, } from 'react-share';
import { FacebookShareCount,  RedditShareCount} from 'react-share';
import { FacebookIcon,  TwitterIcon, RedditIcon} from 'react-share';

import Footer from './components/footer';

//import Whisper from './components/whisper';
//import Storage from './components/storage';

import '../css/dapp.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.fchild = React.createRef();

    this.handleSelect = this.handleSelect.bind(this);
    this.idCampaign = "";
    this.state = {
      key: "1",
      idC: "-1"
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

    this.handleSelect("3");
    this.state.idC = val;
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
      this.child.getCampaigns();
    if(key == 1)
      this.fchild.clean();
    
  }
//first test
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
      <React.Fragment>
      
      <div>
      <PageHeader className="text-center ">
            Contribute to make a better world. <small>Your world.</small>
       <div className="divface">     
      <FacebookShareButton className="face" children={<FacebookIcon size={35}/>} url="http://fundtheworld.crypto"/>
      <TwitterShareButton className="faces" children={<TwitterIcon size={35}/>} url="http://fundtheworld.crypto"/>
      <RedditShareButton className="faces" children={<RedditIcon size={35}/>} url="http://fundtheworld.crypto"/>
      </div>
      </PageHeader>
      
      
      <Tab.Container id="left-tabs-example" activeKey={this.state.key} onSelect={this.handleSelect} defaultActiveKey="1">
  <Row className="clearfix">
    <Col sm={2}>
      <Nav bsStyle="pills" stacked >
        <NavItem eventKey="1">Create crowdfuning campaign</NavItem>
        <NavItem eventKey="2">Campaigns created</NavItem>
        <NavItem eventKey="3" disabled></NavItem>
      </Nav>
    </Col>
    <Col sm={8}>
      <Tab.Content animation>
        <Tab.Pane eventKey="1"><Blockchain ref={instance => { this.fchild = instance; }}/></Tab.Pane>
        <Tab.Pane eventKey="2"><Campaigns ref={instance => { this.child = instance; }} changeActiveTab={(val)=>this.changeActiveTab(val)}/></Tab.Pane>
        <Tab.Pane eventKey="3"><CampaignDetails idCampaign={this.state.idC}/></Tab.Pane>

      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>;
    </div>

  <Footer/>
      </React.Fragment>

    );
  }
}

ReactDOM.render(<App></App>, document.getElementById('dapp'));
