import React from 'react';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import './index.styl';

import ethUtil from 'ethereumjs-util'
import keythereum from 'browserify_keythereum'
import { getKeyStores,addKeyStore,getSelectAddress, setSelectAddress, getKeyStore, clearAll, getSelectNetwork, setSelectNetwork} from '../../../utils/storage'
import { getTimeDurationStringV2 } from '../../../utils/time'
import Tabs, { Tab } from '../../../components/tab'

import { FormattedMessage } from 'react-intl';
import LicenseModal from '../licenseModal'
import LoginModal from '../loginModal'
import ExitModal from '../exitModal'
import {injectIntl} from 'react-intl';
import moment from 'moment'
// import Units from '../../../utils/ethereumjs-units';
var Web3 = require('web3');

class ButtonGroup extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount(){

  }
  onMenuSelectViewLayout(e){
    var key = e.key;
    var self = this;
    if(key === '2dGrid' || key === '2dFlow'){
      this.props.appAction.switchLayout(key)
    }
  }
  onMenuSelectLanguage(e){
    var key = e.key;
    this.props.appAction.switchLanguage(key)
  }
  onDropdownVisibleChange(){

  }
  render(){
    const {intl} = this.props;
    var languages = intl.formatMessage({id: 'app.languages'});
    //console.log(this.props.location,'location');
    var viewswitchUI = this.props.location.pathname=='/'?
                        <Dropdown
                              overlayClassName='dropDownInDrawer'
                              trigger={['click']}
                              overlay={
                                 <Menu mode='inline' onSelect={this.onMenuSelectViewLayout.bind(this)} selectedKeys={[this.props.app.viewLayout]}>
                                   <MenuItem key='2dGrid'>
                                     <FormattedMessage
                                       id='app.drawer.viewswitch.2dGrid'
                                       description='app.drawer.viewswitch.2dGrid'
                                       defaultMessage='2dGrid'
                                       />
                                   </MenuItem>
                                   <MenuItem key='2dFlow'>
                                     <FormattedMessage
                                       id='app.drawer.viewswitch.2dFlow'
                                       description='app.drawer.viewswitch.2dFlow'
                                       defaultMessage='2dFlow'
                                       />
                                   </MenuItem>
                                 </Menu>
                              }
                              animation="slide-up"
                              onVisibleChange={this.onDropdownVisibleChange.bind(this)}
                            >
                             <div  className='col col-6 drawerEnteranceButton'>
                                <div  className='vhCenter'><i className="fa fa-street-view fa-fw"></i></div>
                                <div  className='vhCenter'  style={{marginTop: 10}}>
                                   <FormattedMessage
                                     id='app.drawer.viewswitch'
                                     description='app.drawer.viewswitch'
                                     defaultMessage='ViewSwitch'
                                     />
                                </div>
                             </div>
                          </Dropdown>
                      : null;
    var configUI = this.props.location.pathname=='/'?
                      <div className='col col-6 drawerEnteranceButton' onClick={()=>{window.open(window.location.protocol + '//' + window.location.host + window.location.pathname + '#/config','config')}}>
                    <div className='vhCenter'><i className="fa fa-desktop fa-fw"></i></div>
                    <div className='vhCenter' style={{marginTop: 10}}>
                      <FormattedMessage
                        id='app.drawer.config'
                        description='app.drawer.config'
                        defaultMessage='Config'
                        />
                    </div>
                  </div>
                      : null;
    var languageUI = <Dropdown
                        overlayClassName='dropDownInDrawer'
                        trigger={['click']}
                        overlay={
                           <Menu mode='inline' onSelect={this.onMenuSelectLanguage.bind(this)} selectedKeys={[this.props.app.appLanguage]}>

                             {
                               languages.split('/').map(function(language,i){
                                 var v = language.split(',')[1];
                                 var text = language.split(',')[0];
                                 return   <MenuItem key={v}>{text}</MenuItem>
                               })
                             }

                           </Menu>
                        }
                        animation="slide-up"
                        onVisibleChange={this.onDropdownVisibleChange.bind(this)}
                      >
                       <div  className='col col-6 drawerEnteranceButton'>
                          <div  className='vhCenter'><i className="fa fa-language fa-fw"></i></div>
                          <div  className='vhCenter'  style={{marginTop: 10}}>
                             <FormattedMessage
                               id='app.drawer.language'
                               description='app.drawer.language'
                               defaultMessage='Language'
                               />
                          </div>
                       </div>
                    </Dropdown>;
    var portalUI = <div  className='col col-6 drawerEnteranceButton'  onClick={()=>{window.open(window.location.protocol + '//' + window.location.host + window.location.pathname + '#/portal','portal')}}>
                    <div  className='vhCenter'><i className="fa fa-sitemap fa-fw"></i></div>
                    <div  className='vhCenter'  style={{marginTop: 10}}>
                      <FormattedMessage
                        id='app.drawer.portal'
                        description='app.drawer.portal'
                        defaultMessage='Portal'
                        />
                    </div>
                  </div>
    return (
      <div>
        <div className='row'>
          {viewswitchUI}
          {configUI}
          {languageUI}
          {portalUI}
        </div>
        <br/>
        <br/>
        <div className='vhCenter'>
          <img src='images/logo.jpg' style={{ width: 80, height: 80, WebkitBorderRadius: '50% 50%' }}/>
        </div>
        <br/>
        <br/>
      </div>
    )
  }
}
class PanelHome extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      errorInfo: null,
      addresses: [],
      // selectAddress: null,
      // balance: undefined
    };
  }
  componentDidMount(){
    var self = this;
    var keyStores = getKeyStores();
    var addressArray =  keyStores.map(function(item){
                          return {
                            type: item.type,
                            address: item.keystore.address
                          }
                        });
    this.setState({
      addresses: addressArray
    });
    // self.triggerUpdateBalance();
    // self._trigger = setInterval(function(){
    //   self.triggerUpdateBalance();
    // },30000);


  }
  componentWillUnmount(){
    var self = this;
    if(self._trigger){
      window.clearInterval(self._trigger);
    }
  }
  // switchAddress(address){
  //
  //   self.props.appAction.tokenSet(address);
  //   ethereumAPI.switchAccount(address);
  //   self.triggerUpdateBalance();
  //
  // }
  // triggerUpdateBalance(){
  //   var self = this;
  //   var address = getSelectAddress();
  //   if(address){
  //     if(address!==self.props.app.token){
  //       self.props.appAction.tokenSet(address);
  //     }
  //     ethereumAPI.getBalance(address,function(e,result){
  //       if(e){
  //         self.props.appAction.tokenBalanceSet(null);
  //
  //       }else{
  //         self.props.appAction.tokenBalanceSet(ethereumAPI.fromWei(result.toString(),'ether'));
  //       }
  //     });
  //   }
  //
  // }

  logout(){
  }
  onMenuSelect(e){
    var key = e.key;
    var self = this;
    if(key === 'logout'){
      self.props.appAction.showModal(
        ExitModal,
        {
          style: {
            width: '40%'
          },
          intl: self.props.intl,
          appAction: self.props.appAction,
          selectAddress: self.props.app.token,
          selectAddressKeystore: getKeyStore(self.props.app.token),
          hasClose: true,
          closeModal: ()=>{self.props.appAction.hideModal()},
          exitCallback: function(){
            clearAll();
            self.props.appAction.tokenSet(null);
            self.props.switchPanel('login');
          }

        }
      )
    }
  }
  onDropdownVisibleChange(){

  }
  render(){
    var self = this;
    return (
      <div>
        <ButtonGroup appAction={this.props.appAction}  app={this.props.app} intl={this.props.intl} location={this.props.location}/>
        <Dropdown
           overlayClassName='dropDownInDrawer'
           trigger={['click']}
           overlay={
              <Menu mode='inline' onSelect={this.onMenuSelect.bind(this)} selectedKeys={this.state.addresses.map(function(item){return item.address})}>
                {
                  this.state.addresses.map(function(item){
                    return <MenuItem key={item.address}>{'0x'+item.address + '('+ item.type+')'}</MenuItem>;
                  })
                }
                <Divider />
                <MenuItem key='logout'>
                  <FormattedMessage
                    id='app.drawer.login.logout'
                    description='app.drawer.login.logout'
                    defaultMessage='logout'
                    />

                </MenuItem>



              </Menu>
           }
           animation="slide-up"
           onVisibleChange={this.onDropdownVisibleChange.bind(this)}
         >
          <div style={{ width: 200, textAlign:'center', margin: '0 auto', overflow: 'hidden',whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            onDoubleClick={(e)=>{
              // document.getElementById('ethAddress').focus();
              document.execCommand("copy")
              e.preventDefault();
              e.stopPropagation();
              this.props.appAction.toast(self.props.intl.formatMessage({id: 'app.global.copy'}))
            }}
          >
              {"0x"+self.props.app.token}
          </div>
         </Dropdown>
         <br/>
        <div style={{ width: 200, textAlign:'center', margin: '0 auto', overflow: 'hidden',whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: '1.75rem', marginTop: '1rem' }}>
          {!self.props.app.tokenBalance ? '...' : self.props.app.tokenBalance}ETH
        </div>
      </div>
    )
  }
}



class PanelLogin extends React.Component{
  showLogin(e){
    var self = this;
    self.props.appAction.showModal(
      LoginModal,
      {
        style: {
          width: '40%'
        },
        intl: self.props.intl,
        appAction: self.props.appAction,
        switchPanel: self.props.switchPanel,
        hasClose: true,
        closeModal: ()=>{self.props.appAction.hideModal()},
        exitCallback: function(){

        }

      }
    )

  }
  render(){

    return (
      <div>
        <div className="container">
          <ButtonGroup appAction={this.props.appAction}  app={this.props.app} intl={this.props.intl} location={this.props.location}/>
          <p className='vhCenter btn-lg'  style={{ margin: 0, padding: 0 , textAlign:'center'}} onClick={this.showLogin.bind(this)}>
            <FormattedMessage
              id='app.drawer.login.title'
              description='app.drawer.login.title'
              defaultMessage='Register/Login'
              />
          </p>

        </div>
      </div>
    )
  }

}

class Drawer extends React.Component{
  static defaultProps = {
    checkBlanceFrequency: 30 * 1000,
    checkLicenseFrequency: 4 * 60 * 1000,
    unLoginFreeTime:  3 * 24 * 60 * 60 * 1000, // 1h as unit
    loginFreeTime: 7 * 24 * 60 * 60 *1000 //
  }
  constructor(props) {
    super(props);
    this.state = {
      metamask: false,
      panel: null,
      license: null,
      licenseInfo: null,
      licenseDuration: null,
      licenseCode: null,
      isCustomer: false
    };
  }
  componentDidMount(){
     var self = this;
     var keyStores = getKeyStores();

     if(keyStores.length > 0){
       // this.setState({
       //   panel: 'home'
       // })
       self.switchPanel("home");
     }else{
       // this.setState({
       //   panel: 'login'
       // });
       self.switchPanel("login");
       // this.props.appAction.tokenSet(null);
     }
     // self._checkBlance();
     // self._checkLicenseInfoV2();
     setInterval(()=>{
       self._checkLicenseInfoV2();
     },self.props.checkLicenseFrequency)
     setInterval(()=>{
       self._checkBlance();
     },self.props.checkBlanceFrequency)
  }
  _fetchCustomerAndLicenseInfo(cb){
    var self = this;
    var appId = self.props.app.appContractInfo.appId;
    ethereumAPI.getLicenseInfo( appId, getSelectAddress()).then(function(returnValues){
      cb(null,returnValues)
    }).catch(function(e){
      cb(e)
    });
  }
  openLicenseModal(license,licenseInfo, licenseCode,licenseDuration,isCustomer, forceOpen){
    var self = this;
    self.setState({
      license: license,
      licenseInfo: licenseInfo,
      licenseCode: licenseCode,
      licenseDuration: licenseDuration,
      isCustomer: isCustomer
    },function(){
        if(licenseCode === 1 || licenseCode === 4|| licenseCode === 7 || forceOpen){
          if(!self.props.app.modal.ui)
          self.props.appAction.showModal(LicenseModal, {
             style: {
               width: 900
             },
             licenseInfo: licenseInfo,
             licenseCode: licenseCode,
             licenseDuration: licenseDuration,
             switchPanel: self.switchPanel.bind(self),
             hasClose: true,
             closeModal: ()=>{self.props.appAction.hideModal()},
             appAction: self.props.appAction,
             app: self.props.app,
             intl: self.props.intl
           });
        }

    })
  }
  _checkBlance(){
    var self = this;
    var token = self.props.app.token;
    if(token){
      ethereumAPI.getBalance(token,function(e,result){
        if(e){
          self.props.appAction.tokenBalanceSet(null);
        }else{
          self.props.appAction.tokenBalanceSet(ethereumAPI.fromWei(result.toString(),'ether'));
        }
      });
    }
  }
  _checkLicenseInfoV2(forceOpen=false){
    var self = this;
    var token = self.props.app.token;
    var license = false;
    var licenseInfo = null;
    var licenseCode = null;
    var licenseDuration = null;
    var isCustomer = null;
    var l = Date.now();
    if(token){
      self._fetchCustomerAndLicenseInfo(function(e,returnValues){
        if(!e && returnValues.isCustomer){
          var {  licenseId,   licenseValidateTime,  licenseStartTime,  licenseValidate} = returnValues;
          isCustomer = returnValues.isCustomer;
          license = licenseValidate;
          licenseDuration = getTimeDurationStringV2(licenseValidateTime,self.props.intl.formatMessage({id: 'app.timeunits'}));
          licenseInfo =  moment(licenseStartTime * 1000).format('YYYY-MM-DD HH:mm:ss') +' -- ' + moment(licenseStartTime*1000 + licenseValidateTime*1000 ).format('YYYY-MM-DD HH:mm:ss');
          if(license===false){
            licenseCode = 7;
          }
          self.openLicenseModal(license,licenseInfo,licenseCode,licenseDuration,isCustomer,forceOpen);
        }else{
          extensionAPI.getInstalledTime(function(installedTime){
            console.log(installedTime,"getInstalledTime");
            if(!installedTime || !typeof installedTime ==='number')return;
            var freeTime = self.props.loginFreeTime;
            licenseDuration = getTimeDurationStringV2(freeTime / 1000,self.props.intl.formatMessage({id: 'app.timeunits'}));
            licenseInfo =  moment(installedTime).format('YYYY-MM-DD HH:mm:ss') +' -- ' + moment(installedTime + freeTime ).format('YYYY-MM-DD HH:mm:ss');

            if(l> installedTime + freeTime){
              license = false;
              licenseCode = 4;
            }else if(l> installedTime + freeTime * 0.5){
              license = true;
              licenseCode = 5;
            }else {
              license = true;
              licenseCode = 6;
            }
            self.openLicenseModal(license,licenseInfo,licenseCode,licenseDuration,isCustomer,forceOpen);
          })
        }

      })
    }else{
      extensionAPI.getInstalledTime(function(installedTime){
        console.log(installedTime,"installedTime");
        if(!installedTime || !typeof installedTime ==='number')return;
        var freeTime = self.props.unLoginFreeTime;
        licenseInfo =  moment(installedTime).format('YYYY-MM-DD HH:mm:ss') +' -- ' + moment(installedTime + freeTime ).format('YYYY-MM-DD HH:mm:ss');
        licenseDuration = getTimeDurationStringV2(freeTime/1000,self.props.intl.formatMessage({id: 'app.timeunits'}));
        if(l> installedTime + freeTime){
          license = false;
          licenseCode = 1;
        }else if(l> installedTime + freeTime * 0.5){
          license = true;
          licenseCode = 2;
        }else {
          license = true;
          licenseCode = 3;
        }
        self.openLicenseModal(license,licenseInfo,licenseCode,licenseDuration,isCustomer,forceOpen);
      })
    }
  }

  switchPanel(panel){
    var self = this;
    this.setState({
      panel: panel,
      license: null,
      licenseInfo: null,
      licenseDuration: null,
      licenseCode: null,
      isCustomer: false
    },function(){
      self._checkLicenseInfoV2();
      if(self.props.app.token){
        self._checkBlance();
        ethereumAPI.listenEvent("NewCustomer", {  _applior: "0x" + self.props.app.token, _appId: self.props.app.appContractInfo.appId }, function(returnValues){
          // alert("NewCustomer");
          self._checkLicenseInfoV2();
        },function(e){
          self.props.appAction.toast(e.message);
        });
        ethereumAPI.listenEvent("UpdateCustomer",{  _applior: "0x" + self.props.app.token, _appId: self.props.app.appContractInfo.appId }, function(returnValues){
            // alert("UpdateCustomer");
          self._checkLicenseInfoV2();
        },function(e){
          self.props.appAction.toast(e.message);
        });
      }


    });

  }
  onMenuSelectNetwork(e){
    var self = this;
    var key = e.key;
    var networks = self.props.app.appWeb3AllPrivders;
    for(var i=0;i<networks.length;i++){
      if(key == networks[i].provider){
          setSelectNetwork(networks[i]);
          self.props.appAction.switchNetwork(networks[i]);
          ethereumAPI.init(networks[i].provider,networks[i].contractAddress)
          self._checkBlance();
          self._checkLicenseInfoV2();
          // window.location.reload();
          break;
      }
    }

  }
  onDropdownVisibleChange(){

  }
  render(){
    const {intl} = this.props;
    var networks = this.props.app.appWeb3AllPrivders;

    var licenseTitle = intl.formatMessage({id: 'app.modal.license.title'});
    var self = this;
    return (
      <div className='myDrawer withColumn' style={{ color: 'white', height: '100%'}}>

        {
          this.state.panel === 'login'?
          <PanelLogin appAction={this.props.appAction} switchPanel={this.switchPanel.bind(this)}  app={this.props.app} intl={this.props.intl} location={this.props.location}/>
          : null
        }
        {
          this.state.panel === 'home'?
          <PanelHome appAction={this.props.appAction} switchPanel={this.switchPanel.bind(this)}  app={this.props.app} intl={this.props.intl} location={this.props.location}/>
          : null
        }

        {
          this.state.license !== null?
          <div style={{ marginTop: 30, padding: 5 }}>
            <div>
              {licenseTitle}:
              <Dropdown
                 overlayClassName='dropDownInDrawer'
                 trigger={['click']}
                 overlay={
                    <Menu mode='inline' onSelect={this.onMenuSelectNetwork.bind(this)} selectedKeys={[this.props.app.appWeb3Provider]}>

                      {
                        networks.map(function(network,i){
                          return   <MenuItem style={{ width: 200 }} key={network.provider}>{network.name}</MenuItem>
                        })
                      }

                    </Menu>
                 }
                 animation="slide-up"
                 onVisibleChange={this.onDropdownVisibleChange.bind(this)}
               >

                 <span style={{ display: 'inline-block', marginLeft: 10, marginTop: 8, width: 12, height: 12, marginRight: 10 , WebkitBorderRadius:"50% 50%", backgroundColor: 'rgb(233, 21, 80)',overflow: 'hidden'}}></span>

              </Dropdown>
            </div>
            <div style={{ marginTop: 10  }}>
              <span style={{ fontSize: 14}}>{this.state.licenseInfo}</span>
              <div>
                <span style={{ display: 'inline-block', width: 60 }}>VIP:</span>
                <span>
                  {
                    this.state.isCustomer ?
                    <span>Y</span>
                    :
                   <span>
                     <span style={{ color: "rgb(233, 21, 80)"}}>N</span>
                     <button  onClick={(e)=>{
                       if(!self.props.app.modal.ui)
                       self._checkLicenseInfoV2(true);
                       // self.props.appAction.showModal(LicenseModal, {
                       //    style: {
                       //      width: 900
                       //    },
                       //    licenseInfo: self.state.licenseInfo,
                       //    licenseCode: self.state.licenseCode,
                       //    licenseDuration: self.state.licenseDuration,
                       //    switchPanel: self.switchPanel.bind(self),
                       //    hasClose: true,
                       //    closeModal: ()=>{self.props.appAction.hideModal()},
                       //    appAction: self.props.appAction,
                       //    app: self.props.app,
                       //    intl: self.props.intl
                       //  });
                      }}
                      className='btn-danger btn btn-sm'
                      style={{
                        marginLeft: 20,
                        padding: "0 5px",
                        fontSize: 13
                      }}>
                        {intl.formatMessage({id: 'app.modal.license.update'})}
                      </button>
                    </span>
                   }
                </span>
              </div>
              <div>
                <span style={{ display: 'inline-block', width: 60 }}>Status:</span>
                <span style={{ }}>
                  {
                    this.state.license === true? <i className='fa fa-check' style={{ width: 16, height: 16, verticalAlign: 'middle'}}/>:null
                  }
                  {
                    this.state.license === false? <i className='fa fa-times' aria-hidden="true" style={{ color: "rgb(233, 21, 80)", width: 16, height: 16, verticalAlign: 'middle'}}/>:null
                  }
                </span>
              </div>

            </div>
          </div>
          :
          null
        }
        <div className='withColumnLeftAuto' style={{ position: 'relative', marginBottom: 20, marginRight: 20 }} >
          <div style={{ position: 'absolute',width: '100%', bottom: 10, cursor: 'pointer',textAlign: 'right'  }} onClick={(e)=>{window.open("https://kiwiirc.com/client/irc.freenode.net/viewport")}}>
            <img src='images/irc_2.png' style={{ width: 20, height: 20}}/>
            <span style={{ marginLeft: 10, fontStyle: 'italic', fontSize:13 }}>anonymous chat!</span>
          </div>
        </div>

      </div>
    )
  }
}
export default  injectIntl(Drawer)
