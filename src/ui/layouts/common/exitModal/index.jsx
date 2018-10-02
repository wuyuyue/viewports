import React from 'react';
import { FormattedMessage } from 'react-intl';

export default class ExitModal extends React.Component{
  render(){
    return (
      <div>
        <p className='text-danger btn-lg'>
          <FormattedMessage
            id='app.modal.exitmodal.title'
            description='app.modal.exitmodal.title'
            defaultMessage='save your private info before exit!!'
            />
        </p>

        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">
            <FormattedMessage
              id='app.modal.exitmodal.label.address'
              description='app.modal.exitmodal.label.address'
              defaultMessage='address'
              />
          </label>
          <input disabled type="text" className="form-control" id="exampleFormControlInput1" value={'0x' + this.props.selectAddress}/>
        </div>
        <div className="form-group">
           <label htmlFor="exampleFormControlTextarea1">
             <FormattedMessage
               id='app.modal.exitmodal.label.keystore'
               description='app.modal.exitmodal.label.keystore'
               defaultMessage='keystore'
               />
           </label>
           <textarea disabled className="form-control" id="exampleFormControlTextarea1" rows="3" value={JSON.stringify(this.props.selectAddressKeystore)}>
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
                id='app.modal.exitmodal.button.exit'
                description='app.modal.exitmodal.button.exit'
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
                id='app.modal.exitmodal.button.cancle'
                description='app.modal.exitmodal.button.cancle'
                defaultMessage='Cancle'
                />
            </button>
          </div>
        </div>
      </div>
    )
  }
}
