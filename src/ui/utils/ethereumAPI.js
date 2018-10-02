var Web3 = require('web3');
// var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));
var Tx = require('ethereumjs-tx');

import { getSelectAddress, getKeyStore } from './storage';

var web3js;
// var metamaskWeb3;
var licenseContractABI = require('../../../portal/LicenseV4.json').abi;
var licenseContract;
var ethereumAPI={
  init(provider,licenseContractAddress){
    // if(typeof web3 !=='undefined' &&  web3.currentProvider){
    //   console.log("metamask3");
    //   web3js = new Web3(web3.currentProvider);
    // }else{
      web3js = new Web3(provider);
    // }
    licenseContract = new web3js.eth.Contract(licenseContractABI, licenseContractAddress, {
        gasPrice: '6300000000' // default gas price in wei, 6.3 gwei in this case
    });
  },
  createAccount(password){
    var account = web3js.eth.accounts.create();
    var keystore =  account.encrypt(password);
    account = null;
    return keystore;
  },
  decrypt(keystore, password){
    try{
      web3js.eth.accounts.decrypt(keystore, password);
      return true;
    }catch(e){
      //console.log(e);
      return false;
    }
  },
  encrypt(privateKey, password){
    try{
      return web3js.eth.accounts.encrypt(privateKey, password);
    }catch(e){
      //console.log(e);
      return e;
    }
  },
  fromWei: function(value, unit){
    return web3js.utils.fromWei(value,unit);
  },
  toWei: function(value, unit){
    return web3js.utils.toWei(value,unit);
  },
  BN: Web3.utils.BN,
  gasPrice: function(cb){
    web3js.eth.getGasPrice(function(e, result){
      cb(e,result);
    })
  },
  getBalance: function(address, cb){
    web3js.eth.getBalance(address,function(e,result){
      cb(e,result);
    })
  },
  getTransaction(hash){
    return web3js.eth.getTransaction(hash);
  },
  getTransactionReceipt(hash){
    return web3js.eth.getTransactionReceipt(hash);
  },
  sendTransaction(txObj,password,cb){
    var self = this;
    var { gasPrice,gasLimit,from,to,value,data } = txObj; // gasPrice unit GWEI, value unit ether, data is JSON
    web3js.eth.getTransactionCount(from).then(function(number){
      try{
        var rawTx = {
          nonce: '0x'+number.toString(16),//随机数
         //gasPrice和gasLimit如果不知道怎么填，可以参考etherscan上的任意一笔交易的值
          gasPrice: "0x"+ new self.BN(self.toWei(gasPrice, "GWEI")).toString(16),
          gasLimit: "0x"+new self.BN(gasLimit).toString(16),
          // gasPrice: '0x09184e72a000',
          // gasLimit: '0x2710',
          to: to,//接受方地址或者合约地址
          value: "0x" + new self.BN(self.toWei(value, "ether")).toString(16),//发送的金额，这里是16进制，实际表示发送256个wei
          data: data
        };

        var tx = new Tx(rawTx);
        // alert(web3js.eth.accounts.decrypt(getKeyStore(getSelectAddress()), password).privateKey);
        // //console.log(web3js.eth.accounts.decrypt(getKeyStore(getSelectAddress()), password).privateKey);
        tx.sign(new Buffer(web3js.eth.accounts.decrypt(getKeyStore(getSelectAddress()), password).privateKey.substr(2), 'hex'));

        var serializedTx = tx.serialize();

        // //console.log(serializedTx.toString('hex'));
        // 0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f

        web3js.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'),function(err,hash){
          cb(err,hash);
        })
      }catch(e){
        //console.log(e);
        cb(e);
      }
    });



  },

  switchAccount(account){
    licenseContract.options.from = account;
  },
  listenEvent(event, filter={}, successCb, failCb){
    licenseContract.events[event]({
      filter: filter
    })
    .on("data", function(event) {
       //console.log(event.returnValues);
       successCb(event.returnValues);
    }).on('error',function(e){
       //console.log(e);
       failCb(e);
    });
  },
  listenPastEvent(event,filter={}){
    return licenseContract.getPastEvents(event, { fromBlock: 6403953, toBlock: 'latest', filter: filter });
  },
  listenAllEvents(filter={}, successCb, failCb){
    licenseContract.events.allEvents({ fromBlock: 6403953, toBlock: 'latest', filter: filter })
    .on("data", function(event) {
      // alert("da");
       // //console.log(event.returnValues);
       successCb(event);
    }).on('error',function(e){
       //console.log(e);
       failCb(e);
    });;
  },
  paused() {
    return licenseContract.methods.paused().call();
  },
  appFee() {
    return licenseContract.methods.appFee().call();
  },
  appToOwner(appId) {
    return licenseContract.methods.appToOwner(appId).call();
  },
  getAllApps() {
    return licenseContract.methods.getAllApps().call();
  },
  getYourApps() {
    return licenseContract.methods.getYourApps().call();
  },
  getAppBrief(appId){
    return licenseContract.methods.getAppBrief(appId).call();
  },
  getAppLicenseList(appId){
    return licenseContract.methods.getAppLicenseList(appId).call();
  },
  getAppCustomerList(appId){
    return licenseContract.methods.getAppCustomerList(appId).call();
  },
  getLicenseInfo(appId,fromAddress){
    // if(appId==13){
    //   alert(fromAddress);
    // }
    return licenseContract.methods.getLicenseInfo(appId).call({from: fromAddress});
  },

  estimateGas(options){
    return web3js.eth.estimateGas(options);
  },
  createApp(name,licenseFees,licenseValidateTimes){
    return licenseContract.methods.createApp(name,licenseFees,licenseValidateTimes);
  },
  createFreeApp(name){
    // alert(web3js.eth.estimateGas);
    return licenseContract.methods.createFreeApp(name)
          // .send()
          // .on("receipt", function(receipt) {
          //   alert(receipt);
          //   // $("#txStatus").text("成功生成了 " + name + "!");
          //   // // 事务被区块链接受了，重新渲染界面
          //   // getZombiesByOwner(userAccount).then(displayZombies);
          // })
          // .on("error", function(error) {
          //   alert(error);
          //   // 告诉用户合约失败了
          //   // $("#txStatus").text(error);
          // });
  },
  applyLicense(appId,licenseId){
    return licenseContract.methods.applyLicense(appId,licenseId)
  },
  setAppLicenseOnlineStates(appId,licenseIds,licenseOfflines){
    return licenseContract.methods.setAppLicenseOnlineStates(appId,licenseIds,licenseOfflines);
  },

  // setAppFee(appFee){
  //   return licenseContract.methods.setAppFee(appFee);
  // },
}
// window.addEventListener('load', function() {
//
//   // Checking if Web3 has been injected by the browser (Mist/MetaMask)
//   if (typeof web3 !== 'undefined') {
//     // Use Mist/MetaMask's provider
//     web3js = new Web3(web3.currentProvider);
//   } else {
//     // Handle the case where the user doesn't have Metamask installed
//     // Probably show them a message prompting them to install Metamask
//     web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
//   }
//
//   // Now you can start your app & access web3 freely:
//   ethereumAPI.startApp()
//
// });
window.ethereumAPI = ethereumAPI;
export default ethereumAPI;
