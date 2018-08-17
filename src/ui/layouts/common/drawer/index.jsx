import React from 'react';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import './index.styl';

import ethUtil from 'ethereumjs-util'
import keythereum from 'browserify_keythereum'
import { getKeyStores,addKeyStore,getSelectAddress, setSelectAddress, getKeyStore, clearAll } from '../../../utils/storage'
import Tabs, { Tab } from '../../../components/tab'

import { FormattedMessage } from 'react-intl';

import {injectIntl} from 'react-intl';

var Web3 = require('web3');
class ExitModal extends React.Component{
  render(){
    return (
      <div>
        <p className='text-warning text-uppercase btn-lg'>
          <FormattedMessage
            id='app.drawer.login.exitmodal.title'
            description='app.drawer.login.exitmodal.title'
            defaultMessage='save your private info before exit!!'
            />
        </p>

        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">
            <FormattedMessage
              id='app.drawer.login.exitmodal.label.address'
              description='app.drawer.login.exitmodal.label.address'
              defaultMessage='address'
              />
          </label>
          <input disabled type="text" className="form-control" id="exampleFormControlInput1" value={'0x' + this.props.selectAddress}/>
        </div>
        <div className="form-group">
           <label htmlFor="exampleFormControlTextarea1">
             <FormattedMessage
               id='app.drawer.login.exitmodal.label.keystore'
               description='app.drawer.login.exitmodal.label.keystore'
               defaultMessage='keystore'
               />
           </label>
           <textarea disabled className="form-control" id="exampleFormControlTextarea1" rows="3">
             {JSON.stringify(this.props.selectAddressKeystore)}
           </textarea>
        </div>
        <div className='row'>
          <div className='col-6' style={{ textAlign: 'right' }}>
            <button
              onClick={
                (e)=>{
                  this.props.appAction.hideModal();
                  this.props.exitCallback();
                }
              }
              style={{ width: 100 }}
              type="button" className="btn btn-danger">
              <FormattedMessage
                id='app.drawer.login.exitmodal.button.exit'
                description='app.drawer.login.exitmodal.button.exit'
                defaultMessage='Exit'
                />
            </button>
          </div>
          <div className='col-6'>
            <button
              onClick={
                (e)=>{
                  this.props.appAction.hideModal();
                }
              }
              style={{ width: 100 }}
              type="button" className="btn btn-secondary">
              <FormattedMessage
                id='app.drawer.login.exitmodal.button.cancle'
                description='app.drawer.login.exitmodal.button.cancle'
                defaultMessage='Cancle'
                />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

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
    console.log(this.props.location,'location');
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
      selectAddress: null,
      balance: undefined
    };
  }
  componentDidMount(){

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
    var address = getSelectAddress();
    this.switchAddress(address);
  }
  switchAddress(address){
    var self = this;
    self.setState({
      selectAddress: address
    },function(){
      self.props.appAction.tokenSet(address);

      var web3 = new Web3();
      web3.setProvider(new web3.providers.HttpProvider('https://api.myetherapi.com/eth'));
      web3.eth.getBalance(address,function(e,result){
        if(e){
          self.setState({
            balance: null
          })
        }else{
          self.setState({
            balance: web3.fromWei(result.toString(), 'ether')
          });
        }

      })



    })
  }
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
          selectAddress: self.state.selectAddress,
          selectAddressKeystore: getKeyStore(self.state.selectAddress),
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
          <div style={{ width: 200, textAlign:'center', margin: '0 auto', overflow: 'hidden',whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>0x{this.state.selectAddress}</div>
         </Dropdown>
         <br/>
        <div style={{ width: 200, textAlign:'center', margin: '0 auto', overflow: 'hidden',whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: '1.75rem', marginTop: '1rem' }}>{this.state.balance === undefined ? '...': this.state.balance === null? '--' : this.state.balance}ETH</div>
      </div>
    )
  }
}


class LoginModal extends React.Component{
  render(){
    const {intl} = this.props;
    var createLabel = intl.formatMessage({id: 'app.drawer.login.create.tabtitle'});
    var importLabel = intl.formatMessage({id: 'app.drawer.login.import.tabtitle'});
    return (
      <div className='loginModal'>
        <p className='vhCenter text-uppercase btn-lg'>
          <FormattedMessage
            id='app.drawer.login.title'
            description='app.drawer.login.title'
            defaultMessage='Register/Login'
            />
        </p>
        <Tabs headerWidthUnit='fixed'>
          <Tab title={createLabel}>
            <PanelLoginSubCreate appAction={this.props.appAction} switchPanel={this.props.switchPanel.bind(this)} intl={this.props.intl}/>
          </Tab>
          <Tab title={importLabel}>
            <PanelLoginSubImport appAction={this.props.appAction} switchPanel={this.props.switchPanel.bind(this)} intl={this.props.intl}/>
          </Tab>
        </Tabs>
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
          <p className='vhCenter text-uppercase btn-lg' style={{ color: 'white' }} onClick={this.showLogin.bind(this)}>
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
class PanelLoginSubCreate extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      errorInfo: null
    };
  }
  newAccount(e){
    var password1 = this.refs.password1.value;
    var password2 = this.refs.password2.value;

    const {intl} = this.props;
    var password1Error = intl.formatMessage({id: 'app.drawer.login.create.input.password1.error'});
    var password2Error = intl.formatMessage({id: 'app.drawer.login.create.input.password2.error'});

    if(password1.length < 8 || password2.length < 8){
      this.setState({
        errorInfo: password1Error
      });
      return;
    }
    if(password1 !== password2){
      this.setState({
        errorInfo: password2Error
      });
      return;
    }

    var dk = keythereum.create();
    var options = {
      kdf: "pbkdf2",
      cipher: "aes-128-ctr",
      kdfparams: {
          c: 262144,
          dklen: 32,
          prf: "hmac-sha256"
      }
    };
    var self = this;
    self.props.appAction.showLoading();
    keythereum.dump(password1, dk.privateKey, dk.salt, dk.iv, options,function(keyObject){
      password1 = null;
      password2 = null;
      dk = null;
      self.props.appAction.hideLoading();
      addKeyStore('webgen', keyObject);
      setSelectAddress(keyObject.address);
      self.props.appAction.hideModal();
      self.props.switchPanel('home');
    });

  }
  render(){
    const {intl} = this.props;

    var password1PlaceHolder = intl.formatMessage({id: 'app.drawer.login.create.input.password1'});
    var password2PlaceHolder = intl.formatMessage({id: 'app.drawer.login.create.input.password2'});
    return (
      <div style={{ marginTop: 5 }}>
        <div className="container">
          <p className='vhCenter mx-auto' >
            <FormattedMessage
              id='app.drawer.login.create.title'
              description='app.drawer.login.create.title'
              defaultMessage='Set a lock for your account, which is based on Ethereum'
              />
          </p>
          <div className="input-group mb-3">
            <input autoFocus ref='password1' type="password" className="form-control" placeholder={password1PlaceHolder}/>
          </div>
          <div className="input-group mb-3">
            <input ref='password2' type="password" className="form-control"  placeholder={password2PlaceHolder}/>
          </div>
          {
            this.state.errorInfo? <div className='input-group mb-3 vhCenter'  style={{ color: 'red' }}>{this.state.errorInfo}</div>: null
          }
          <div className="input-group mb-3">
            <div className='col col-6 vhCenter' style={{ paddingLeft:0 }}>
              <button type="button" className="btn btn-warning btn-lg col-12" onClick={this.newAccount.bind(this)}>
                <FormattedMessage
                  id='app.drawer.login.create.button.create'
                  description='app.drawer.login.create.button.create'
                  defaultMessage='Create'
                  />
              </button>
            </div>
            <div className='col col-6 vhCenter' style={{ paddingRight:0 }}>
              <button type="button" className="btn btn-warning btn-lg  col-12"  onClick={(e)=>{this.props.appAction.hideModal();}}>
                <FormattedMessage
                  id='app.drawer.login.create.button.cancle'
                  description='app.drawer.login.create.button.cancle'
                  defaultMessage='Cancle'
                  />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
class PanelLoginSubImport extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      errorInfo: null,
      fileName: null,
      keystore: null
    };
  }
  onUploadFile(e){
    var self = this;
    var files =this.refs.keystoreFile.files;
    const {intl} = this.props;
    var fileError = intl.formatMessage({id: 'app.drawer.login.import.input.file.error.invalid'});
    if (files && files.length > 0) {
      var file = files[0];
      self.setState({
        fileName: file.name
      })
      var reader = new FileReader();
      reader.onload = function(e) {
        var text = e.target.result;
        try{
          var keyObject = JSON.parse(text);
          self.setState({
            keystore: keyObject,
            errorInfo: null
          });
        }catch(e){
          self.setState({
            errorInfo: fileError,
            fileName: null
          });
        }



      }
      reader.readAsText(file);
    }
  }
  importAccount(e){
    var self = this;
    const {intl} = this.props;
    var passwordError = intl.formatMessage({id: 'app.drawer.login.import.input.password.error'});
    var fileError = intl.formatMessage({id: 'app.drawer.login.import.input.file.error.empty'});



    if(self.state.fileName === null || self.state.keystore === null) {
      self.setState({
        errorInfo: fileError,
      });
      return;
    }
    var password = self.refs.password.value;
    if(!password) {
      self.setState({
        errorInfo: passwordError,
      });
      return;
    }
    var keyObject = self.state.keystore;
    self.props.appAction.showLoading();
    keythereum.recover(password,keyObject,function(pk){
      password = null;
      self.props.appAction.hideLoading();
      if(pk instanceof Error){
        self.setState({
          errorInfo: pk.toString()
        });
      } else{
        addKeyStore('importKeystore', keyObject);
        setSelectAddress(keyObject.address);
        self.props.appAction.hideModal();
        self.props.switchPanel('home');
      }
    });


  }
  render(){
    const {intl} = this.props;

    var passwordPlaceHolder = intl.formatMessage({id: 'app.drawer.login.import.input.password'});
    return (
      <div style={{ marginTop: 5 }}>
        <div className="container">
          <p className='vhCenter mx-auto'>
            <FormattedMessage
              id='app.drawer.login.import.title'
              description='app.drawer.login.import.title'
              defaultMessage='import your keystore, which is a json file'
              />
          </p>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FormattedMessage
                  id='app.drawer.login.import.label.keystore'
                  description='app.drawer.login.import.label.keystore'
                  defaultMessage='keystore'
                  />
              </span>
            </div>
            <div className="custom-file">
              <input ref='keystoreFile' type="file" className="custom-file-input" id="inputGroupFile01" onChange={this.onUploadFile.bind(this)}/>
              <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.fileName === null ? 'choose':this.state.fileName}</label>
            </div>
          </div>
          <div className="input-group mb-3">
            <input autoFocus ref='password' type="password" className="form-control" placeholder={passwordPlaceHolder}/>
          </div>

          {
            this.state.errorInfo? <div className='input-group mb-3 vhCenter'  style={{ color: 'red' }}>{this.state.errorInfo}</div>: null
          }
          <div className="input-group mb-3 vhCenter">
            <div className='col col-6 vhCenter' style={{ paddingLeft:0 }}>

              <button type="button" className="btn btn-warning btn-lg col-12" onClick={this.importAccount.bind(this)}>
                <FormattedMessage
                  id='app.drawer.login.import.button.import'
                  description='app.drawer.login.import.button.import'
                  defaultMessage='Import'
                  />
              </button>
            </div>
            <div className='col col-6 vhCenter'  style={{ paddingRight:0 }}>

              <button type="button" className="btn btn-warning btn-lg col-12"  onClick={(e)=>{this.props.appAction.hideModal();}}>
                <FormattedMessage
                  id='app.drawer.login.import.button.cancle'
                  description='app.drawer.login.import.button.cancle'
                  defaultMessage='Cancle'
                  />
              </button>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
class Drawer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      metamask: false,
      panel: null
    };
  }
  componentDidMount(){

     var keyStores = getKeyStores();
     if(keyStores.length > 0){
       this.setState({
         panel: 'home'
       })
     }else{
       this.setState({
         panel: 'login'
       });
       this.props.appAction.tokenSet(null);
     }
  }


  switchPanel(panel){
    this.setState({
      panel: panel
    })
  }
  render(){
    return (
      <div className='myDrawer' style={{ color: 'white '}}>

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

      </div>
    )
  }
}
export default  injectIntl(Drawer)
