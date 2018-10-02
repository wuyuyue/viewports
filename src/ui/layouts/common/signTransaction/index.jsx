import React from 'react';
import { FormattedMessage } from 'react-intl';

import ethereumAPI from '../../../utils/ethereumAPI'
import { getSelectAddress } from '../../../utils/storage'

var BN = ethereumAPI.BN;

import TransactionModal from '../transactionModal/index.jsx'
class SignTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._initState(props);
  }
  // componentWillReceiveProps(nextProps){
  //   var self = this;
  //   //console.log(nextProps);
  //   // alert(nextProps.data!== this.props.data);
  //   if(nextProps.data!== this.props.data){
  //     if(nextProps.amount!== this.props.amount){
  //       self.setState({
  //         amount: nextProps.amount
  //       },function(){
  //         self.reCaculateFee();
  //       });
  //     }
  //     if(nextProps.gasUnits!== this.props.gasUnits){
  //       self.setState({
  //         gasUnits: nextProps.gasUnits
  //       },function(){
  //         self.reCaculateFee();
  //       });
  //     }
  //     if(nextProps.gasUnitPrice!== this.props.gasUnitPrice){
  //       self.setState({
  //         gasUnits: nextProps.gasUnitPrice
  //       },function(){
  //         self.reCaculateFee();
  //       });
  //     }
  //   }
  //
  // }
  componentDidMount(){
    //alert("in");
    var self = this;
    self._fetchLatestGasPrice();
  }
  _fetchLatestGasPrice(){
    var self = this;
    ethereumAPI.gasPrice(function(e,result){
      if(!e){
        // console.log(result,"_fetchLatestGasPrice");
        // console.log(ethereumAPI.fromWei(result.toString(),'gwei'));
        self.setState({
          gasUnitPrice: ethereumAPI.fromWei(result.toString(),'gwei')
        })
      }

    })
  }
  _initState(props){
    //console.log(ethereumAPI,"_initState");
    var gasUnits =  props.data && props.data.gasUnits || "21000";
    var gasUnitPrice =   props.data && props.data.gasUnitPrice || "6.2";
    var amount =  props.data && props.data.amount|| "0";
    gasUnits = new BN(gasUnits);
    gasUnitPrice = new BN(ethereumAPI.toWei(gasUnitPrice,'gwei'));
    amount = new BN(ethereumAPI.toWei(amount,'ether'));

    var transactionFee = gasUnits.mul(gasUnitPrice);
    var totalFee = transactionFee.add(amount);
    // alert(amount);
    return {
      amount: ethereumAPI.fromWei(amount,'ether') ,
      gasUnits: gasUnits.toString(10),
      gasUnitPrice: ethereumAPI.fromWei(gasUnitPrice,'gwei'),
      transactionFee: ethereumAPI.fromWei(transactionFee,'ether'),
      totalFee: ethereumAPI.fromWei(totalFee,'ether')
    }
  }
  reCaculateFee(){
    var gasUnits = new BN(this.state.gasUnits);
    var gasUnitPrice = new BN(ethereumAPI.toWei(this.state.gasUnitPrice,'gwei'));
    var amount = new BN(ethereumAPI.toWei(this.state.amount,'ether'));

    var transactionFee = gasUnits.mul(gasUnitPrice);
    var totalFee = transactionFee.add(amount);

    this.setState({
      transactionFee: ethereumAPI.fromWei(transactionFee,'ether'),
      totalFee: ethereumAPI.fromWei(totalFee,'ether')
    });
  }
  triggerUpdateBalance(){
    var self = this;
    var address = getSelectAddress();
    ethereumAPI.getBalance(address,function(e,result){
      if(e){
        self.props.appAction.tokenBalanceSet(null);

      }else{
        self.props.appAction.tokenBalanceSet(ethereumAPI.fromWei(result.toString(),'ether'));
      }
    });
  }
  render() {
    var self = this;
    if(self.props.show ===false) return null;
    var data = self.props.data;
    var fromAddr = data && data.from || "";
    if(fromAddr){
      fromAddr = fromAddr.substr(2,6) + "..." + fromAddr.substr(fromAddr.length-4,4);
    }
    var toAddr = data && data.to || "";
    if(toAddr){
      toAddr = toAddr.substr(2,6) + "..." + toAddr.substr(toAddr.length-4,4);
    }
    var sendingData = data.data || "";

    const {intl} = self.props;
    let titleLabel = intl.formatMessage({id: 'app.transaction.title'});
    let amountLabel = intl.formatMessage({id: 'app.transaction.label.amount'});
    let amountErrorLabel = intl.formatMessage({id: 'app.transaction.input.amount.error'});
    let gasLimitLabel = intl.formatMessage({id: 'app.transaction.label.gaslimit'});
    let gasPriceLabel = intl.formatMessage({id: 'app.transaction.label.gasprice'});
    let maxTransactionFeeLabel = intl.formatMessage({id: 'app.transaction.label.maxtransactionfee'});
    let maxTotalLabel = intl.formatMessage({id: 'app.transaction.label.maxtotal'});

    let dataIncludedLabel = intl.formatMessage({id: 'app.transaction.label.dataincluded'});
    let safeLabel = intl.formatMessage({id: 'app.transaction.label.safe'});
    let passwordLabel = intl.formatMessage({id: 'app.transaction.input.password'});
    let passwordErrorLabel = intl.formatMessage({id: 'app.transaction.input.password.error'});

    let resetLabel = intl.formatMessage({id: 'app.transaction.button.reset'});
    let submitLabel = intl.formatMessage({id: 'app.transaction.button.submit'});
    let successLabel = intl.formatMessage({id: 'app.transaction.success'});
    let failLabel = intl.formatMessage({id: 'app.transaction.fail'});



    return (
      <div className='modal'>
        <div className='modal_content vhCenter' style={{ marginTop: 0 ,backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <div  style={{ width: 600}}>
            <div>
              <p className='text-danger btn-lg' style={{textAlign: 'center'}}>
                {titleLabel}
              </p>

              <div className='input-group mb-3'>
                <div className='col-5' style={{padding: 0}}>
                  <div className='input-group widthRow'>
                    <div className='withRowLeftAuto vhCenter' alt={data && data.from}>
                      {fromAddr}
                    </div>
                    <div style={{ width: 50, height: 50, WebkitBorderRadius: '50% 50%', backgroundColor: 'blue'}}>

                    </div>
                  </div>
                </div>
                <div className='col-2 input-group vhCenter' style={{padding: 0}}>
                  ->
                </div>
                <div className='col-5' style={{padding: 0}}>
                  <div className='input-group widthRow'>
                    <div style={{ width: 50, height: 50, WebkitBorderRadius: '50% 50%', backgroundColor: 'yellow'}}>

                    </div>
                    <div className='withRowLeftAuto vhCenter' alt={data && data.to}>
                      {toAddr}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{backgroundColor: 'rgb(236,236,236)', marginLeft: -10, marginRight: -10, padding: 10 }}>
                <div className='input-group mb-1 widthRow'>
                    <div style={{ width: 200 }}>{amountLabel}</div>

                    <div className='withRowLeftAuto' style={{ textAlign: 'right' }}>
                      <div className='input-group withRow'>
                        <div className='withRowLeftAuto'>
                          <input type="number" style={{width: '100%'}} ref="amount"  value={this.state.amount} max={6654755} min={0} step={0.1} onChange={(e)=>{if(self.refs.amount.value && !isNaN(self.refs.amount.value))self.setState({amount: self.refs.amount.value},function(){self.reCaculateFee();});}} />
                        </div>
                        <span style={{textAlign:'right', width: 50, display: 'inline-block'}}>ETH</span>
                      </div>
                    </div>
                </div>
                <div className='input-group mb-1 widthRow'>
                    <div style={{ width: 200 }}>{gasLimitLabel}</div>
                    <div className='withRowLeftAuto' style={{ textAlign: 'right' }}>
                      <div className='input-group withRow'>
                        <div className='withRowLeftAuto'>
                          <input type="number" style={{width: '100%'}} ref="gasUnits"  value={this.state.gasUnits} max={6654755} min={21000} onChange={(e)=>{if(self.refs.gasUnits.value && !isNaN(self.refs.gasUnits.value))self.setState({gasUnits: self.refs.gasUnits.value},function(){self.reCaculateFee();});}} />
                        </div>
                        <span style={{textAlign:'right', width: 50, display: 'inline-block'}}>UNITS</span>
                      </div>
                    </div>
                </div>
                <div className='input-group mb-1 widthRow'>
                    <div style={{ width: 200 }}>{gasPriceLabel}</div>
                    <div className='withRowLeftAuto' style={{ textAlign: 'right' }}>
                      <div className='input-group withRow'>
                        <div className='withRowLeftAuto'>
                          <input type="number" style={{width: '100%'}} ref="gasUnitPrice" min={1} value={this.state.gasUnitPrice} onChange={(e)=>{if(self.refs.gasUnitPrice.value && !isNaN(self.refs.gasUnitPrice.value))self.setState({gasUnitPrice: self.refs.gasUnitPrice.value},function(){self.reCaculateFee();});}}/>
                        </div>
                        <span style={{textAlign:'right', width: 50, display: 'inline-block'}}>GWEI</span>
                      </div>
                    </div>
                </div>
                <div className='input-group mb-1 widthRow'>
                    <div style={{ width: 200 }}>{maxTransactionFeeLabel}</div>
                    <div className='withRowLeftAuto' style={{ textAlign: 'right' }}>{this.state.transactionFee} ETH</div>
                </div>
              </div>
              <div className='input-group mb-3 widthRow'>
                  <div style={{ width: 200 }}>{maxTotalLabel}</div>
                  <div className='withRowLeftAuto' style={{ textAlign: 'right' }}>{this.state.totalFee} ETH</div>
              </div>
              <div className='mb-3' style={{textAlign: 'right'}}>
                {dataIncludedLabel}: {sendingData.length} bytes
              </div>
              <div className='mb-3'>
                {safeLabel}
              </div>
              <div className='mb-3'>
                <input type="password" style={{width: '100%'}} placeholder={passwordLabel} ref="password"/>
              </div>
              <div className='input-group mb-3'>
                <div style={{textAlign:'right', width: '100%'}}>

                  <button
                    onClick={
                      (e)=>{
                        self.refs.password.value="";
                        self.setState(self._initState(self.props),function(){
                          self._fetchLatestGasPrice();
                        });
                      }
                    }
                    style={{ width: 100 }}
                    type="button" className="btn btn-warning">
                    {resetLabel}
                  </button>
                  <button
                    onClick={
                      (event)=>{

                            //   alert(new BN(result.toString()));
                            // alert(ethereumAPI.toWei(self.state.totalFee,"ether"));
                            // var address = getSelectAddress();
                            var tokenBalance = self.props.app.tokenBalance;
                              if(new BN(ethereumAPI.toWei(tokenBalance,"ether")).lt(new BN(ethereumAPI.toWei(self.state.totalFee,"ether"))) ){
                                  self.props.appAction.toast(amountErrorLabel);
                              } else{
                                if(!self.refs.password.value){
                                  self.props.appAction.toast(passwordErrorLabel);
                                } else {
                                  self.props.appAction.showLoading();
                                  ethereumAPI.sendTransaction({
                                     gasPrice: self.state.gasUnitPrice,
                                     gasLimit: self.state.gasUnits,
                                     from: data.from,
                                     to: data.to,
                                     value: self.state.amount,
                                     data: sendingData
                                  },self.refs.password.value, function(err,hash){
                                    self.triggerUpdateBalance();
                                    self.props.appAction.hideLoading();
                                    if(self.props.data.callback){
                                      self.props.data.callback(err,hash);
                                    }else {
                                      if(err){
                                        self.props.appAction.toast(failLabel + err);
                                      }else{
                                        self.props.appAction.hideTransaction();
                                        self.props.appAction.toast(successLabel + hash)
                                        self.props.appAction.showModal(
                                          TransactionModal,
                                          {
                                            style: {
                                              width: '60%'
                                            },
                                            intl: intl,
                                            appAction: self.props.appAction,
                                            hash: hash,
                                            hasClose: true
                                          }
                                        )
                                      }
                                    }
                                  })
                                }
                              }

                            // var tokenBalance = self.props.app.tokenBalance;

                          }


                    }
                    style={{ width: 100, marginLeft: 20 }}
                    type="button" className="btn btn-danger">
                    {submitLabel}
                  </button>
                </div>
              </div>
            </div>
            <div className='modal_close' style={{ display: 'block' }} onClick={()=>{self.props.appAction.hideTransaction()}}>x</div>
          </div>
        </div>
      </div>

    );
  }
}

import {injectIntl} from 'react-intl';
export default  injectIntl(SignTransaction)
