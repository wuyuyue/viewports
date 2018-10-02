import React from 'react';
import { FormattedMessage } from 'react-intl';
import ethereumAPI from '../../../utils/ethereumAPI'

import './index.styl';

export default class TransactionModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      transaction: null
    }
  }
  componentDidCatch(e){
    //console.log(e);
  }
  componentDidMount(){
    var self = this;
    self.load();
    self._timer = setInterval(()=>{
      if(!self.state.transaction){
        self.load();
      }else{
        window.clearInterval(self._timer);
      }
    },1000)
  }
  componentWillUnmount(){
    var self = this;
    if(self._timer){
      window.clearInterval(self._timer);
    }
  }
  componentWillReceiveProps(nextProps){
      if(nextProps.hash && nextProps.hash != this.props.hash){
        this.load();
      }
  }
  open(){
    window.open("https://etherscan.io/tx/"+ this.props.hash)
  }
  load(){
    var self = this;
    ethereumAPI.getTransactionReceipt(this.props.hash).then(function(t){
      // if(t)
      self.setState({
        transaction: t
      })
    })
  }
  render(){
    var self = this;
    var t = self.state.transaction;
    var keys = t && Object.keys(t) || [];
    const {intl} = self.props;
    let titleLabel = intl.formatMessage({id: 'app.modal.transactionmodal.title'});
    let pendingLabel = intl.formatMessage({id: 'app.modal.transactionmodal.pending'});

    return (
      <div style={{  padding: 20 }}>
        <div className='modal_close' onClick={()=>{this.props.appAction.hideModal()}}>x</div>
        <p className='text-danger btn-lg' style={{textAlign: 'center'}}>
          {titleLabel}
        </p>
        <p className='btn-lg hash' style={{textAlign: 'center', cursor: 'pointer'}} onClick={self.open.bind(self)}>
          {self.props.hash}
        </p>

        <div style={{ height: 400 , overflowY: "auto", overflowX:"hidden",  padding: 20}}>

          {
            t?
            keys.map(function(key,i){
              return (
                <div className='mb-3 row withRow' key={i}>
                  <div style={{width: 150}}>{key}</div>
                  <div className='withRowLeftAuto' style={{wordBreak: "break-all" }}>
                    {
                       JSON.stringify(t[key])
                    }
                  </div>
                </div>
              )
            })
            :
            <div className="vhCenter">
              {pendingLabel}
            </div>
          }
        </div>
      </div>
    )
  }
}
