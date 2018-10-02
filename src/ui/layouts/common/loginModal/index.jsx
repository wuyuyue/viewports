import React from 'react';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import './index.styl';

import ethUtil from 'ethereumjs-util'
import keythereum from 'browserify_keythereum'
import { getKeyStores,addKeyStore,getSelectAddress, setSelectAddress, getKeyStore, clearAll, getSelectNetwork, setSelectNetwork} from '../../../utils/storage'
import Tabs, { Tab } from '../../../components/tab'

import { FormattedMessage } from 'react-intl';
import LicenseModal from '../licenseModal'
import {injectIntl} from 'react-intl';
import moment from 'moment'
// import Units from '../../../utils/ethereumjs-units';
var Web3 = require('web3');
// var web3 = new Web3();
// web3.setProvider(new web3.providers.HttpProvider('https://api.myetherapi.com/eth'));
class LoginModal extends React.Component{
  switchPanel(panel){
    var self = this;
    if(panel==='home'){
      // hashHistory.replace("/");
      self.props.appAction.tokenSet(getSelectAddress());
      self.props.switchPanel(panel);
      self.props.appAction.hideModal();
    }

  }
  render(){
    const {intl} = this.props;
    // var createLabel = intl.formatMessage({id: 'app.drawer.login.create.tabtitle'});
    // var importLabel = intl.formatMessage({id: 'app.drawer.login.import.tabtitle'});
    var createLabel = intl.formatMessage({id: 'app.login.create.tabtitle'});
    var keystoreLabel = intl.formatMessage({id: 'app.login.keystore.tabtitle'});
    var privatekeyLabel = intl.formatMessage({id: 'app.login.privatekey.tabtitle'});
    return (
      <div className='loginModal'>
        <p className='vhCenter btn-lg' style={{ margin: 0, padding: 0 , textAlign:'center'}}>
          <FormattedMessage
            id='app.drawer.login.title'
            description='app.drawer.login.title'
            defaultMessage='Register/Login'
            />
        </p>
        <Tabs headerWidthUnit='fixed' style={{ backgroundColor: 'white'}}>
          <Tab title={createLabel}>
            <PanelLoginSubCreate appAction={this.props.appAction} switchPanel={this.switchPanel.bind(this)} intl={this.props.intl}/>
          </Tab>
          <Tab title={keystoreLabel}>
            <PanelLoginSubKeystore appAction={this.props.appAction} switchPanel={this.switchPanel.bind(this)} intl={this.props.intl}/>
          </Tab>
          <Tab title={privatekeyLabel}>
            <PanelLoginSubPrivatekey appAction={this.props.appAction} switchPanel={this.switchPanel.bind(this)} intl={this.props.intl}/>
          </Tab>
        </Tabs>
      </div>
    )
  }
}
// class PanelLogin extends React.Component{
//   showLogin(e){
//     var self = this;
//     self.props.appAction.showModal(
//       LoginModal,
//       {
//         style: {
//           width: '40%'
//         },
//         intl: self.props.intl,
//         appAction: self.props.appAction,
//         switchPanel: self.props.switchPanel,
//         hasClose: true,
//         closeModal: ()=>{self.props.appAction.hideModal()},
//         exitCallback: function(){
//
//         }
//
//       }
//     )
//
//   }
//   render(){
//
//     return (
//       <div>
//         <div className="container">
//           <ButtonGroup appAction={this.props.appAction}  app={this.props.app} intl={this.props.intl} location={this.props.location}/>
//           <p className='vhCenter btn-lg'  style={{ margin: 0, padding: 0 , textAlign:'center'}} onClick={this.showLogin.bind(this)}>
//             <FormattedMessage
//               id='app.drawer.login.title'
//               description='app.drawer.login.title'
//               defaultMessage='Register/Login'
//               />
//           </p>
//
//         </div>
//       </div>
//     )
//   }
//
// }

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
    var password1Error = intl.formatMessage({id: 'app.login.create.input.password1.error'});
    var password2Error = intl.formatMessage({id: 'app.login.create.input.password2.error'});

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
    var self = this;
    self.props.appAction.showLoading();
    var keyObject = ethereumAPI.createAccount(password1);
    self.props.appAction.hideLoading();
    addKeyStore('webgen', keyObject);
    setSelectAddress(keyObject.address);
    this.props.switchPanel('home');


  }
  clear(){
      var self = this;
      self.refs.password1.value = "";
      self.refs.password2.value = "";
      self.setState({
        errorInfo: null
      })
  }
  render(){
    const {intl} = this.props;

    var password1PlaceHolder = intl.formatMessage({id: 'app.login.create.input.password1'});
    var password2PlaceHolder = intl.formatMessage({id: 'app.login.create.input.password2'});
    return (
      <div style={{ marginTop: 5 }}>
        <div className="container">
          <p className='vhCenter mx-auto' >
            <FormattedMessage
              id='app.login.create.title'
              description='app.login.create.title'
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
                  id='app.login.create.button.create'
                  description='app.login.create.button.create'
                  defaultMessage='Create'
                  />
              </button>
            </div>
            <div className='col col-6 vhCenter' style={{ paddingRight:0 }}>
              <button type="button" className="btn btn-warning btn-lg  col-12"  onClick={(e)=>{this.clear();}}>
                <FormattedMessage
                  id='app.login.create.button.cancle'
                  description='app.login.create.button.cancle'
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
class PanelLoginSubKeystore extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      errorInfo: null,
      fileName: null,
      keystore: null
    };
  }
  clear(){
      var self = this;
      self.refs.password.value = "";
      self.refs.keystoreFile.value = [];
      self.setState({
        errorInfo: null,
        fileName: null,
        keystore: null
      });
  }
  onUploadFile(e){
    var self = this;
    var files =this.refs.keystoreFile.files;
    const {intl} = this.props;
    var fileError = intl.formatMessage({id: 'app.login.keystore.input.file.error.invalid'});
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
    var passwordEmptyError = intl.formatMessage({id: 'app.login.keystore.input.password.error.empty'});
    var passwordInvalidError = intl.formatMessage({id: 'app.login.keystore.input.password.error.invalid'});

    var fileError = intl.formatMessage({id: 'app.login.keystore.input.file.error.empty'});



    if(self.state.fileName === null || self.state.keystore === null) {
      self.setState({
        errorInfo: fileError,
      });
      return;
    }
    var password = self.refs.password.value;
    if(!password) {
      self.setState({
        errorInfo: passwordEmptyError,
      });
      return;
    }
    var keyObject = self.state.keystore;
    self.props.appAction.showLoading();

    if(ethereumAPI.decrypt(keyObject,password)){
      addKeyStore('importKeystore', keyObject);
      setSelectAddress(keyObject.address);
      self.props.switchPanel('home');
    } else{
      self.setState({
        errorInfo: passwordInvalidError
      });

    }
    self.props.appAction.hideLoading();


  }
  render(){
    const {intl} = this.props;

    var passwordPlaceHolder = intl.formatMessage({id: 'app.login.keystore.input.password'});
    return (
      <div style={{ marginTop: 5 }}>
        <div className="container">
          <p className='vhCenter mx-auto'>
            <FormattedMessage
              id='app.login.keystore.title'
              description='app.login.keystore.title'
              defaultMessage='import your keystore, which is a json file'
              />
          </p>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FormattedMessage
                  id='app.login.keystore.label.keystore'
                  description='app.login.keystore.label.keystore'
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
                  id='app.login.keystore.button.import'
                  description='app.login.keystore.button.import'
                  defaultMessage='Import'
                  />
              </button>
            </div>
            <div className='col col-6 vhCenter'  style={{ paddingRight:0 }}>

              <button type="button" className="btn btn-warning btn-lg col-12"  onClick={this.clear.bind(this)}>
                <FormattedMessage
                  id='app.login.keystore.button.cancle'
                  description='app.login.keystore.button.cancle'
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

class PanelLoginSubPrivatekey extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      errorInfo: null
    };
  }
  clear(){
      var self = this;
      self.refs.password.value = "";
      self.refs.privatekey.value = "";
      self.setState({
        errorInfo: null
      });
  }
  importAccount(e){
    var self = this;
    const {intl} = this.props;
    var passwordError = intl.formatMessage({id: 'app.login.privatekey.input.password.error'});
    var privatekeyEmptyError = intl.formatMessage({id: 'app.login.privatekey.input.privatekey.error.empty'});
    var privatekeyInvalidError = intl.formatMessage({id: 'app.login.privatekey.input.privatekey.error.invalid'});

    var privatekey = self.refs.privatekey.value;
    if(!privatekey) {
      self.setState({
        errorInfo: privatekeyEmptyError,
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

    self.props.appAction.showLoading();
    if(!privatekey.startsWith("0x")){
      privatekey="0x"+ privatekey;
    }
    var keystore = ethereumAPI.encrypt(privatekey,password);
    // //console.log(keystore);
    self.props.appAction.hideLoading();
    if(keystore instanceof Error){
      self.setState({
        errorInfo: privatekeyInvalidError,
      });
      return;
    }else{
      addKeyStore('fromprivatekey', keystore);
      setSelectAddress(keystore.address);
      self.props.switchPanel('home');
    }


  }
  render(){
    const {intl} = this.props;

    var passwordPlaceHolder = intl.formatMessage({id: 'app.login.privatekey.input.password'});
    var privatekeyPlaceHolder = intl.formatMessage({id: 'app.login.privatekey.input.privatekey'});
    return (
      <div style={{ marginTop: 5 }}>
        <div className="container">
          <p className='vhCenter mx-auto'>
            <FormattedMessage
              id='app.login.privatekey.title'
              description='app.login.privatekey.title'
              defaultMessage='import your keystore, which is a json file'
              />
          </p>
          <div className="input-group mb-3">
            <input autoFocus ref='privatekey' type="text" className="form-control" placeholder={privatekeyPlaceHolder}/>
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
                  id='app.login.privatekey.button.import'
                  description='app.login.privatekey.button.import'
                  defaultMessage='Import'
                  />
              </button>
            </div>
            <div className='col col-6 vhCenter'  style={{ paddingRight:0 }}>

              <button type="button" className="btn btn-warning btn-lg col-12"  onClick={this.clear.bind(this)}>
                <FormattedMessage
                  id='app.login.privatekey.button.cancle'
                  description='app.login.privatekey.button.cancle'
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

// class PanelLoginSubCreate extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       errorInfo: null
//     };
//   }
//   newAccount(e){
//     var password1 = this.refs.password1.value;
//     var password2 = this.refs.password2.value;
//
//     const {intl} = this.props;
//     var password1Error = intl.formatMessage({id: 'app.drawer.login.create.input.password1.error'});
//     var password2Error = intl.formatMessage({id: 'app.drawer.login.create.input.password2.error'});
//
//     if(password1.length < 8 || password2.length < 8){
//       this.setState({
//         errorInfo: password1Error
//       });
//       return;
//     }
//     if(password1 !== password2){
//       this.setState({
//         errorInfo: password2Error
//       });
//       return;
//     }
//
//     var dk = keythereum.create();
//     var options = {
//       kdf: "pbkdf2",
//       cipher: "aes-128-ctr",
//       kdfparams: {
//           c: 262144,
//           dklen: 32,
//           prf: "hmac-sha256"
//       }
//     };
//     var self = this;
//     self.props.appAction.showLoading();
//     keythereum.dump(password1, dk.privateKey, dk.salt, dk.iv, options,function(keyObject){
//       password1 = null;
//       password2 = null;
//       dk = null;
//       self.props.appAction.hideLoading();
//       addKeyStore('webgen', keyObject);
//       setSelectAddress(keyObject.address);
//       self.props.appAction.hideModal();
//       self.props.switchPanel('home');
//     });
//
//   }
//   render(){
//     const {intl} = this.props;
//
//     var password1PlaceHolder = intl.formatMessage({id: 'app.drawer.login.create.input.password1'});
//     var password2PlaceHolder = intl.formatMessage({id: 'app.drawer.login.create.input.password2'});
//     return (
//       <div style={{ marginTop: 5 }}>
//         <div className="container">
//           <p className='vhCenter mx-auto' >
//             <FormattedMessage
//               id='app.drawer.login.create.title'
//               description='app.drawer.login.create.title'
//               defaultMessage='Set a lock for your account, which is based on Ethereum'
//               />
//           </p>
//           <div className="input-group mb-3">
//             <input autoFocus ref='password1' type="password" className="form-control" placeholder={password1PlaceHolder}/>
//           </div>
//           <div className="input-group mb-3">
//             <input ref='password2' type="password" className="form-control"  placeholder={password2PlaceHolder}/>
//           </div>
//           {
//             this.state.errorInfo? <div className='input-group mb-3 vhCenter'  style={{ color: 'red' }}>{this.state.errorInfo}</div>: null
//           }
//           <div className="input-group mb-3">
//             <div className='col col-6 vhCenter' style={{ paddingLeft:0 }}>
//               <button type="button" className="btn btn-warning btn-lg col-12" onClick={this.newAccount.bind(this)}>
//                 <FormattedMessage
//                   id='app.drawer.login.create.button.create'
//                   description='app.drawer.login.create.button.create'
//                   defaultMessage='Create'
//                   />
//               </button>
//             </div>
//             <div className='col col-6 vhCenter' style={{ paddingRight:0 }}>
//               <button type="button" className="btn btn-warning btn-lg  col-12"  onClick={(e)=>{this.props.appAction.hideModal();}}>
//                 <FormattedMessage
//                   id='app.drawer.login.create.button.cancle'
//                   description='app.drawer.login.create.button.cancle'
//                   defaultMessage='Cancle'
//                   />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
// class PanelLoginSubImport extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       errorInfo: null,
//       fileName: null,
//       keystore: null
//     };
//   }
//   onUploadFile(e){
//     var self = this;
//     var files =this.refs.keystoreFile.files;
//     const {intl} = this.props;
//     var fileError = intl.formatMessage({id: 'app.drawer.login.import.input.file.error.invalid'});
//     if (files && files.length > 0) {
//       var file = files[0];
//       self.setState({
//         fileName: file.name
//       })
//       var reader = new FileReader();
//       reader.onload = function(e) {
//         var text = e.target.result;
//         try{
//           var keyObject = JSON.parse(text);
//           self.setState({
//             keystore: keyObject,
//             errorInfo: null
//           });
//         }catch(e){
//           self.setState({
//             errorInfo: fileError,
//             fileName: null
//           });
//         }
//
//
//
//       }
//       reader.readAsText(file);
//     }
//   }
//   importAccount(e){
//     var self = this;
//     const {intl} = this.props;
//     var passwordError = intl.formatMessage({id: 'app.drawer.login.import.input.password.error'});
//     var fileError = intl.formatMessage({id: 'app.drawer.login.import.input.file.error.empty'});
//
//
//
//     if(self.state.fileName === null || self.state.keystore === null) {
//       self.setState({
//         errorInfo: fileError,
//       });
//       return;
//     }
//     var password = self.refs.password.value;
//     if(!password) {
//       self.setState({
//         errorInfo: passwordError,
//       });
//       return;
//     }
//     var keyObject = self.state.keystore;
//     self.props.appAction.showLoading();
//     keythereum.recover(password,keyObject,function(pk){
//       password = null;
//       self.props.appAction.hideLoading();
//       if(pk instanceof Error){
//         self.setState({
//           errorInfo: pk.toString()
//         });
//       } else{
//         addKeyStore('importKeystore', keyObject);
//         setSelectAddress(keyObject.address);
//         self.props.appAction.hideModal();
//         self.props.switchPanel('home');
//       }
//     });
//
//
//   }
//   render(){
//     const {intl} = this.props;
//
//     var passwordPlaceHolder = intl.formatMessage({id: 'app.drawer.login.import.input.password'});
//     return (
//       <div style={{ marginTop: 5 }}>
//         <div className="container">
//           <p className='vhCenter mx-auto'>
//             <FormattedMessage
//               id='app.drawer.login.import.title'
//               description='app.drawer.login.import.title'
//               defaultMessage='import your keystore, which is a json file'
//               />
//           </p>
//           <div className="input-group mb-3">
//             <div className="input-group-prepend">
//               <span className="input-group-text">
//                 <FormattedMessage
//                   id='app.drawer.login.import.label.keystore'
//                   description='app.drawer.login.import.label.keystore'
//                   defaultMessage='keystore'
//                   />
//               </span>
//             </div>
//             <div className="custom-file">
//               <input ref='keystoreFile' type="file" className="custom-file-input" id="inputGroupFile01" onChange={this.onUploadFile.bind(this)}/>
//               <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.fileName === null ? 'choose':this.state.fileName}</label>
//             </div>
//           </div>
//           <div className="input-group mb-3">
//             <input autoFocus ref='password' type="password" className="form-control" placeholder={passwordPlaceHolder}/>
//           </div>
//
//           {
//             this.state.errorInfo? <div className='input-group mb-3 vhCenter'  style={{ color: 'red' }}>{this.state.errorInfo}</div>: null
//           }
//           <div className="input-group mb-3 vhCenter">
//             <div className='col col-6 vhCenter' style={{ paddingLeft:0 }}>
//
//               <button type="button" className="btn btn-warning btn-lg col-12" onClick={this.importAccount.bind(this)}>
//                 <FormattedMessage
//                   id='app.drawer.login.import.button.import'
//                   description='app.drawer.login.import.button.import'
//                   defaultMessage='Import'
//                   />
//               </button>
//             </div>
//             <div className='col col-6 vhCenter'  style={{ paddingRight:0 }}>
//
//               <button type="button" className="btn btn-warning btn-lg col-12"  onClick={(e)=>{this.props.appAction.hideModal();}}>
//                 <FormattedMessage
//                   id='app.drawer.login.import.button.cancle'
//                   description='app.drawer.login.import.button.cancle'
//                   defaultMessage='Cancle'
//                   />
//               </button>
//             </div>
//
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
export default  injectIntl(LoginModal)
