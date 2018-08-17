import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import css from './app.styl'
import Loading from '../components/loading'
import Toast from '../components/toast'
import Modal from '../components/modal'

import { hashHistory } from 'react-router';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appAction from './appAction'
import Joyride from 'react-joyride';
import './common/react-joyride.css'
import { IntlProvider, addLocaleData } from 'react-intl';
import { FormattedMessage } from 'react-intl';

import enLocaleData from 'react-intl/locale-data/en';
import zhLocaleData from 'react-intl/locale-data/zh';

addLocaleData(enLocaleData);
addLocaleData(zhLocaleData);



import zh_CN from '../../locale/zh_CN.js';
import en_US from '../../locale/en_US.js';

// import "babel-polyfill";

// import {renderToString} from 'react-dom/server'

function chooseLocale(language){
  var obj = en_US;
  if(language.indexOf('zh')>-1){
    obj= zh_CN;
  }else if(language.indexOf('en')>-1){
    obj= en_US;
  }
  return obj;
}


class AnimationOnPage extends React.Component {
  shouldComponentUpdate(nextProps, nextState) { // hack hash history twice render bug on react-router 3.0
    return this.props.location.pathname!== nextProps.location.pathname;
  }
  render() {
    var pageUI = this.props.children;
    return pageUI;
  }
}

class App extends React.Component {
  componentDidMount() {
    var self = this;
    self.props.appAction.resize(window.innerWidth,window.innerHeight);

    window.addEventListener('resize',function(){
      self.props.appAction.resize(window.innerWidth,window.innerHeight);
    },false)

    let lastLocation = ''; // hack hash history twice render bug on react-router 3.0
    this.unlisten = hashHistory.listen(location => {
      if (lastLocation !== location.pathname) {
        lastLocation = location.pathname;
      }
    });
    var self = this;
    self.props.appAction.listenUpdateViewList();
    window.addEventListener('load',function(){
      console.log('onload');
      if(self.props.app.views===null){
        self.props.appAction.queryViewList();
      }
    }, false);

    window.addEventListener('keydown',function(event){
      if(event.keyCode === 27) {
        self.props.appAction.hideModal();
      }
    }, false);

    // global.open('background.html')
    // this.props.appAction.showModal(MyModal, {
    //   appAction: this.props.appAction
    // })
  }
  onKeyUpHandler(e){

  }
  componentWillUnmount () {
    if (this.unlisten) {
      this.unlisten();
    }
  }
  render() {
    var modalUI = null;
    var modalUIShow = false;
    var modalUIStyle = {};
    var maskTopPoz = 0;
    if (this.props.app.modal.ui !== null) {
      if (this.props.app.modal.uiProps && this.props.app.modal.uiProps.maskTopPoz) {
        maskTopPoz = this.props.app.modal.uiProps.maskTopPoz;
      }
      modalUI = React.createElement(this.props.app.modal.ui, this.props.app.modal.uiProps, null);
      modalUIShow = true;
      modalUIStyle = this.props.app.modal.uiProps.style;
    }
    return (
      <IntlProvider locale={this.props.app.appLanguage} messages={chooseLocale(this.props.app.appLanguage)}>
        <div className='root'>

          <AnimationOnPage location={this.props.location}>{this.props.children}</AnimationOnPage>

          <Toast toastMessage={this.props.app.toast}/>
          <Loading show={this.props.app.showLoading}/>
          <Modal style={modalUIStyle} show={modalUIShow} maskTopPoz={maskTopPoz} hasClose={false}>
            {modalUI}
          </Modal>
          <Joyride
            offsetParentSelector='.layout'
            key={this.props.app.joyride.key}
            ref={c => (this.joyride = c)}
            // callback={this.callback}
            locale={{
              back: (<span><FormattedMessage
                id='app.joyride.back'
                description='app.joyride.back'
                defaultMessage='Back'
                /></span>),
              close: (<span><FormattedMessage
                id='app.joyride.close'
                description='app.joyride.close'
                defaultMessage='Close'
                /></span>),
              last: (<span><FormattedMessage
                id='app.joyride.last'
                description='app.joyride.last'
                defaultMessage='Get'
                /></span>),
              next: (<span><FormattedMessage
                id='app.joyride.next'
                description='app.joyride.next'
                defaultMessage='Next'
                /></span>),
              skip: (<span><FormattedMessage
                id='app.joyride.skip'
                description='app.joyride.skip'
                defaultMessage='Skip'
                /></span>)
            }}
            {...this.props.app.joyride}
          />
        </div>
      </IntlProvider>

    );
  }
}
export default connect(
  (state) => ({
    app: state.app
  }),
  dispatch => ({
    appAction: bindActionCreators(appAction, dispatch)
  })
 )(App)
