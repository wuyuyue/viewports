import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import LoginModal from '../loginModal'
import TransactionModal from '../transactionModal'
import { getSelectAddress } from '../../../utils/storage'
import ethereumAPI from '../../../utils/ethereumAPI'

import { getTimeDurationStringV2 } from '../../../utils/time.js'


class LicenseModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      appLicenseOfflines: [],
      // appToOwner: null
    }
  }
  componentDidCatch(e){
    //console.log(e)
  }
  componentDidMount(){
    var self = this;
    var appId = self.props.app.appContractInfo.appId;
    // ethereumAPI.appToOwner(appId).then(function(returnValues){
    //   //console.log(returnValues,"appToOwner");
    //   self.setState({
    //     appToOwner: returnValues
    //   });
    // });
    ethereumAPI.getAppLicenseList(appId).then(function(returnValues){
      var appLicenseOfflines = [];
      var licenseFees = returnValues[0];
      var licenseValidateTimes = returnValues[1];
      var licenseOfflines = returnValues[2];
      for(var i=0;i<licenseFees.length;i++){
        appLicenseOfflines.push({
          id: i,
          fee: licenseFees[i],
          validateTime: licenseValidateTimes[i],
          offline: licenseOfflines[i]
        })
      }
      self.setState({
        appLicenseOfflines: appLicenseOfflines,
      })
    });
  }
  buy(licenseId,licenseFee){
    var self = this;
    const {intl} = self.props;
    var applylicensepSuccessLabel = intl.formatMessage({id: 'app.modal.license.licensetypes.apply.success'});

    var appId = self.props.app.appContractInfo.appId;
    var method = ethereumAPI.applyLicense(appId,licenseId);
    var from = "0x" +getSelectAddress();
    var to = self.props.app.appContractInfo.address;
    var amount = licenseFee;
    //console.log(amount);

    method.estimateGas({
        // gasPrice: '20000000000',
        gas: 5000000,
        value: amount,
        from: from,
        // to: to,
        // data: method.encodeABI()
      },function(err, gas){
        if(err){
          self.props.appAction.toast(err.message);
        }else{
          self.props.appAction.showTransaction({
            from: from,
            to: to,
            amount: ethereumAPI.fromWei(amount,"ether"),
            data:  method.encodeABI(),
            gasUnits: Math.max(gas*1.1,21000),
            callback: function(e,hash){
              // alert(e);
                if(e){
                  self.props.appAction.toast(e.message);
                }else{
                  self.props.switchPanel("home");
                  self.props.appAction.hideTransaction();
                  self.props.appAction.toast(applylicensepSuccessLabel)
                  self.props.appAction.showModal(
                    TransactionModal,
                    {
                      style: {
                        width: "60%"
                      },
                      intl: self.props.intl,
                      appAction: self.props.appAction,
                      hash: hash,
                      hasClose: true,
                      closeModal: ()=>{self.props.appAction.hideModal()},
                    }
                  )
                }
            }
          })

        }
      }
    );
  }
  render(){
    var self = this;
    const {intl} = this.props;
    // var applylicensepSuccessLabel = intl.formatMessage({id: 'app.modal.applylicense.success'});
    var licenseTitleLabel = intl.formatMessage({id: 'app.modal.license.title'});
    var licenseCode = this.props.licenseCode;
    var licenseInfo = this.props.licenseInfo;
    var licenseDuration = this.props.licenseDuration;
    var licenseCodeLabel = intl.formatMessage({id: 'app.modal.license.code' + licenseCode});
    var appId = self.props.app.appContractInfo.appId;
    // var appToOwner = self.state.appToOwner;
    return (
      <div style={{ padding: 10 }}>

        <div style={{  marginTop: 10,  textAlign: 'left', color: "rgb(233, 21, 80)" }}> {licenseTitleLabel} : {licenseInfo} ({licenseDuration}) </div>
        <div style={{  marginTop: 10 }}>{licenseCodeLabel}</div>
        {
          licenseCode < 4 ?
          <div  style={{ textAlign: 'right' }}>
            <button
              style={{ width: 100 }}
              type="button" className="btn btn-danger" onClick={(e)=>{
                //console.log(e);
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
              }}>
              Login
            </button>
          </div>
          :
          <div className="input-group mb-3 withRow " style={{maxHeight:400, overflowY: 'auto',marginTop: 10 }}>
              <table className="table table-bordered withRowLeftAuto">
                <thead className="thead-light">
                  <tr>
                    <th className='tdCenter' style={{ width: 300 }}>
                        id
                    </th>
                    <th className='tdCenter' style={{ width: 150 }}>
                      <FormattedMessage
                        id='app.modal.license.licensetypes.table.header.fee'
                        description='app.modal.license.licensetypes.table.header.fee'
                        defaultMessage='fee'
                        />
                    </th>
                    <th className='tdCenter' style={{ width: 300 }}>
                        <FormattedMessage
                          id='app.modal.license.licensetypes.table.header.validatetime'
                          description='app.modal.license.licensetypes.table.header.validatetime'
                          defaultMessage='validatetime'
                          />
                    </th>
                    <th className='tdCenter' style={{ width: 300 }}>
                        <FormattedMessage
                          id='app.modal.license.licensetypes.table.header.state'
                          description='app.modal.license.licensetypes.table.header.state'
                          defaultMessage='onSale'
                          />
                    </th>
                    <th className='tdCenter' style={{ width: 300 }}>
                        <FormattedMessage
                          id='app.modal.license.licensetypes.table.header.buy'
                          description='app.modal.license.licensetypes.table.header.buy'
                          defaultMessage='buy'
                          />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    self.state.appLicenseOfflines.map(function(license,i){
                      //console.log(license);
                      if(license.offline)return null;
                      return (
                        <tr key={i}>
                          <td className='tdCenter'>
                            {license.id}
                          </td>
                          <td className='tdCenter'>
                            { ethereumAPI.fromWei(license.fee,"ether")} ETH
                          </td>
                          <td className='tdCenter'>
                            {getTimeDurationStringV2(license.validateTime,self.props.intl.formatMessage({id: 'app.timeunits'}))}
                          </td>
                          <td className='tdCenter'>
                            {
                              license.offline==true?
                              <FormattedMessage
                                id='app.modal.license.licensetypes.table.header.state.closed'
                                description='app.modal.license.licensetypes.table.header.state.closed'
                                defaultMessage='offline'
                                />
                              :
                              <FormattedMessage
                                id='app.modal.license.licensetypes.table.header.state.opened'
                                description='app.modal.license.licensetypes.table.header.state.opened'
                                defaultMessage='online'
                                />
                            }
                            {
                              license.offline == true?
                                <i className='fa fa-toggle-off'/>
                                :
                                <i className='fa fa-toggle-on'/>
                            }
                          </td>
                          <td className='tdCenter'>
                            {
                              !license.offline?
                              <button style={{ width: 100 }} type="button" className="btn btn-danger"
                                onClick={()=>{
                                  var licenseId = license.id;
                                  var licenseFee = license.fee;
                                  self.buy(licenseId,licenseFee);

                                }}
                              >
                                <FormattedMessage
                                  id='app.modal.license.licensetypes.table.header.buy'
                                  description='app.modal.license.licensetypes.table.header.buy'
                                  defaultMessage='buy'
                                  />
                               </button>
                               :
                               "/"
                            }

                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
          </div>


        }
      </div>
    )
  }
}
export default  injectIntl(LicenseModal)
