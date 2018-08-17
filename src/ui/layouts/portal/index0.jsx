import React from 'react';
import Layout from '../../components/layout'
import Header from '../../components/header'
import Content from '../../components/content'
import List,{ExtensiveListItem} from '../../components/list'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appAction from '../appAction'

import { hashHistory } from 'react-router';
import Typing,{ Backspace, Delay, Reset, Speed } from 'react-typing-animation';

import css from './index.styl'
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

import { FormattedMessage } from 'react-intl';


class ETHModal extends React.Component{
  render(){
    return (
      <div className='vhCenter' style={{ height: 250, padding: 10 }} onClick={()=>{this.props.appAction.hideModal()}}>
        <div className='modal_close'>x</div>
        <img src='images/eth.png' style={{ width: 200, height: 200 }}/>
      </div>
    )
  }
}
class PortalIndex extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    const {intl} = this.props;

    var title = intl.formatMessage({id: 'app.portal.title'});
    document.title = title;
  }
  openNew(url){
    window.open(url);
  }

  scrollTo(id){
    var target = document.getElementById(id);
    var menus = document.querySelectorAll('.nav-item>.nav-link');
    for(var i=0;i<menus.length;i++){
      var menu = menus[i]
      menu.classList.remove('active');
      if(id === menu.innerText.toLowerCase()){
        if(i===0){
          document.querySelector('.scrollContent>div').scrollTop=0;
        } else {
          target.scrollIntoView();
          document.querySelector('.scrollContent>div').scrollTop-=80
        }
        menu.classList.add('active');
      }
    }
  }
  menuItemClick(e){
    var target = e.nativeEvent.target;
    var id = target.innerText.toLowerCase();
    this.scrollTo(id);
    // console.log(target)

  }
  // componentWillReceiveProps(nextProps){
  //   if(this.props.app.appLanguage!==nextProps.app.appLanguage){
  //     const {intl} = nextProps;
  //     var title = intl.formatMessage({id: 'app.portal.title'});
  //     document.title = title;
  //   }
  // }
  render() {
    var self = this;

    return (
      <Layout className='portalIndex' bgColor='black'>
        <Content style={{ width: '100%', height: '100%' }}>

          <header id='header' style={{ position: 'sticky' , top: 0, width: '100%', zIndex: 9999 }}>
            <nav className="navbar navbar-expand-md navbar-dark" style={{  height: 80, backgroundColor: 'black', opacity: 1 }}>
              <a className="navbar-brand font-italic" href="javascript:void(-1)" style={{ fontSize: '1.25rem'}}>
                <svg xmlns="https://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg>
               <span style={{ marginLeft: 10, fontSize: 24, lineHeight: '36px', display: 'inline-block',verticalAlign:'top' }}>
                 <FormattedMessage
                   id='app.portal.header.title'
                   description='app.portal.header.title'
                   defaultMessage='Viewport(s)'
                   />
               </span>
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav justify-content-end" style={{ width: '100%', fontSize: '20px', marginRight: 100 }}>
                  <li className="nav-item">
                    <a className="nav-link active" href="javascript:void(-1)" onClick={this.menuItemClick.bind(this)}>Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="javascript:void(-1)" onClick={this.menuItemClick.bind(this)}>Usercase</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="javascript:void(-1)" onClick={this.menuItemClick.bind(this)}>Features</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="javascript:void(-1)" onClick={this.menuItemClick.bind(this)}>Install</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="mailto:viewportgroup@outlook.com">Contact</a>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
          <div id='home' className="d-md-flex flex-md-equal w-100" style={{ minHeight: window.innerHeight - 80 }}>
            <div className='col-md-8'>
              <Carousel infiniteLoop={true} autoPlay={false} interval={10000} transitionTime={1000} showThumbs={false} selectedItem={0} showStatus={false}>
                <div className='vhCenter' style={{ margin: '0 auto', width: '100%', height: '100%'}}>
                  <div>
                      <img src="images/internet.jpg" style={{width: '80%', height:'auto', display:'inline-block', verticalAlign: 'top'}} />
                      <img src="images/internet_attachment.jpg" style={{width: '20%', height: 'auto', display:'inline-block', verticalAlign: 'top'}}/>
                  </div>
                  <p className="legend font-weight-bold" style={{ marginBottom: 10 }}>
                    <a style={{ color: 'white', textDecoration: 'none' }} href='javascript:void(-1)' onClick={this.openNew.bind(this,'https://www.opte.org/the-internet/')}>
                      THE INTERNET(2015 from opte.org)<br/> WWW is just a small part of Internet
                    </a>
                  </p>
                </div>
                <div className='vhCenter' style={{ margin: '0 auto', width: '100%', height: '100%'}}>
                  <img src="images/www.jpg" style={{width: '80%', height:'auto', WebkitBorderRadius: '5px 5px' }}/>
                  <p className="legend font-weight-bold" style={{ marginBottom: 10 }}>
                    <a  style={{ color: 'white', textDecoration: 'none' }} href='javascript:void(-1)' onClick={this.openNew.bind(this,'https://internet-map.net/')}>
                      World Wide Web(2012 from internet-map.net)<br/> The Indexed Web contains at least 4.61 billion pages (Friday, 15 June, 2018) from worldwidewebsize.com.
                    </a>
                  </p>
                </div>
                <div className='vhCenter' style={{ margin: '0 auto', width: '80%', height: '100%'}}>
                  <img src="images/ipfs.jpeg" style={{width: '100%', height:'auto', WebkitBorderRadius: '5px 5px'}}/>
                  <p className="legend font-weight-bold" style={{ marginBottom: 10 }}>
                    <a  style={{ color: 'white', textDecoration: 'none' }} href='javascript:void(-1)' onClick={this.openNew.bind(this,'https://medium.com/@ConsenSys/an-introduction-to-ipfs-9bba4860abd0')}>
                      IPFS(2017)
                      <br/>Will the distributing be the next generation of web?
                    </a>
                  </p>
                </div>
              </Carousel>
            </div>
            <div className="col-md-4">
              <div style={{ paddingLeft: 10, textALign:'left',color: '#00fd55', fontSize: '1rem', width: '100%' }}>
                <h4 className="font-italic" >
                  Q/A
                </h4>
                <Typing loop={false} speed={50} className='features' onFinishedTyping={() => {}}>
                  <ul>
                    <li>
                      <span className='checkmark'> &gt;</span>
                      Q：How big is Internet and how many webs exists in Internet?
                    </li>
                    <Delay ms={2000} />
                    <li>
                      <span className='checkmark'> &gt;</span>
                      A：boundless and still growing, get detail answer from left charts.
                    </li>
                    <Delay ms={2000} />
                    <li>
                      <span className='checkmark'> &gt;</span>
                      Q：What is the next generation of web, IPFS?
                    </li>
                    <Delay ms={2000} />
                    <li>
                      <span className='checkmark'> &gt;</span>
                      A：distributing-webs might bring evaluation, but further speed information-generation-rate.
                    </li>
                    <Delay ms={2000} />
                    <li>
                      <span className='checkmark'> &gt;</span>
                      Q：How much time did you spend in web-world?
                    </li>
                    <Delay ms={2000} />
                    <li>
                      <span className='checkmark'> &gt;</span>
                      A：maybe up to 6 hours per day.
                    </li>
                    <Delay ms={2000} />
                    <li>
                      <span className='checkmark'> &gt;</span>
                      Q：How to decrease it ?
                    </li>
                    <Delay ms={2000} />
                    <li>
                      <span className='checkmark'> &gt;</span>
                      A：keep far away from Interenet?
                      <Backspace count={29} delay={750} />
                      kidding, Interenet is a great creation/tool,
                      try install browser extension viewport,
                      which could open multi-viewports(webs) in one tab to
                      browse the Internet efficient and speed the action of fetching information,
                      especially useful in super-screen of conference/hall
                      <br/>
                      <br/>
                      <div style={{ fontSize: '3rem', cursor: 'pointer' }} onClick={()=>{this.scrollTo('install')}}>--></div>
                    </li>
                    <Delay ms={30000} />
                  </ul>
                </Typing>
              </div>
            </div>
          </div>
          <div id='usercase'>
            <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
              <div className="bg-dark mr-md-1 pt-1 px-1 pt-md-3 px-md-3 text-center text-white overflow-hidden">
                <div className="my-3 py-3">
                  <h2 className="display-5">World Cup 2018 muti-group</h2>
                </div>
                <div className="bg-light box-shadow mx-auto" style={{width: '90%', height: 400, borderRadius: '21px 21px 0 0'}}>
                  <div className='vhCenter' style={{ width: '100%', height: '100%'}}>
                    <video controls="controls" src='images/usecase/worldcup2018_cn.mp4' style={{ width: '100%', height: 'auto' }}/>
                  </div>
                </div>

              </div>
              <div className="bg-light mr-md-1 pt-1 px-1 pt-md-3 px-md-3 text-center overflow-hidden">
                <div className="my-3 p-3">
                  <h2 className="display-5">Kinds of Map comparison</h2>
                </div>
                <div className="bg-dark box-shadow mx-auto" style={{width: '90%', height: 400, borderRadius: '21px 21px 0 0'}}>
                  <div className='vhCenter' style={{ width: '100%', height: '100%'}}>
                    <img src='images/usecase/map.png' style={{ width: '100%', height: 'auto' }}/>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
              <div className="bg-light mr-md-1 pt-1 px-1 pt-md-3 px-md-3 text-center overflow-hidden">
                <div className="my-3 p-3">
                  <h2 className="display-5">Muti-cartoons track</h2>
                </div>
                <div className="bg-dark box-shadow mx-auto" style={{width: '90%', height: 400, borderRadius: '21px 21px 0 0'}}>

                  <div className='vhCenter' style={{ width: '100%', height: '100%'}}>
                    <video controls="controls" src='images/usecase/cartoons.mp4' style={{ width: '100%', height: 'auto' }}/>
                  </div>
                </div>
              </div>
              <div className="bg-dark mr-md-1 pt-1 px-1 pt-md-3 px-md-3 text-center text-white overflow-hidden">
                <div className="my-3 py-3">
                  <h2 className="display-5">WebCamera and WebChat</h2>
                </div>
                <div className="bg-light box-shadow mx-auto" style={{width: '90%', height: 400, borderRadius: '21px 21px 0 0'}}>
                  <div className='vhCenter' style={{ width: '100%', height: '100%'}}>
                    <video controls="controls" src='images/usecase/camera.mp4' style={{ width: '100%', height: 'auto' }}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">

              <div className="bg-primary mr-md-1 pt-1 px-1 pt-md-3 px-md-3 text-center text-white overflow-hidden">
                <div className="my-3 py-3">
                  <h2 className="display-5">What is more?</h2>
                </div>
                <div className="bg-light box-shadow mx-auto" style={{width: '90%', height: 400, borderRadius: '21px 21px 0 0'}}></div>
              </div>
              <div className="mr-md-1 pt-1 px-1 pt-md-3 px-md-3 text-center text-white overflow-hidden">
              </div>
            </div>
          </div>

          <div id='features'>
          <Carousel infiniteLoop={true} autoPlay={true} interval={10000} transitionTime={1000} showThumbs={false} selectedItem={0} showStatus={true}>
            <div className='vhCenter' style={{ margin: '0 auto', width: '100%', height: '100%'}}>
              <div>
                  <img src="images/features/add_view.png" style={{width: '80%', height:'auto', display:'inline-block', verticalAlign: 'top'}} />
              </div>
              <p className="legend font-weight-bold" style={{ marginBottom: 10 }}>
                Add View to the stage
              </p>
            </div>
            <div className='vhCenter' style={{ margin: '0 auto', width: '100%', height: '100%'}}>
              <div>
                  <img src="images/features/set_view.png" style={{width: '80%', height:'auto', display:'inline-block', verticalAlign: 'top'}} />
              </div>
              <p className="legend font-weight-bold" style={{ marginBottom: 10 }}>
                Set the url for your selection view by right click on it
              </p>
            </div>
            <div className='vhCenter' style={{ margin: '0 auto', width: '100%', height: '100%'}}>
              <div>
                  <img src="images/features/remove_view.png" style={{width: '80%', height:'auto', display:'inline-block', verticalAlign: 'top'}} />
              </div>
              <p className="legend font-weight-bold" style={{ marginBottom: 10 }}>
                Remove/Reload the view from stage by right click on it
              </p>
            </div>
            <div className='vhCenter' style={{ margin: '0 auto', width: '100%', height: '100%'}}>
              <div>
                  <img src="images/features/max_view.png" style={{width: '80%', height:'auto', display:'inline-block', verticalAlign: 'top'}} />
              </div>
              <p className="legend font-weight-bold" style={{ marginBottom: 10 }}>
                Max the view  by double-left-click on it
              </p>
            </div>

            <div className='vhCenter' style={{ margin: '0 auto', width: '100%', height: '100%'}}>
              <div>
                  <img src="images/features/control_media_in_view.png" style={{width: '80%', height:'auto', display:'inline-block', verticalAlign: 'top'}} />
              </div>
              <p className="legend font-weight-bold" style={{ marginBottom: 10 }}>
                Control meida in selection-view by double-left-click on it
              </p>
            </div>

            <div className='vhCenter' style={{ margin: '0 auto', width: '100%', height: '100%'}}>
              <div>
                  <img src="images/features/more_layout.png" style={{width: '80%', height:'auto', display:'inline-block', verticalAlign: 'top'}} />
              </div>
              <p className="legend font-weight-bold" style={{ marginBottom: 10 }}>
                More Layout
              </p>
            </div>

            <div className='vhCenter' style={{ margin: '0 auto', width: '100%', height: '100%'}}>
              <div>
                  <img src="images/features/control_panel.png" style={{width: '80%', height:'auto', display:'inline-block', verticalAlign: 'top'}} />
              </div>
              <p className="legend font-weight-bold" style={{ marginBottom: 10 }}>
                Control Panel
              </p>
            </div>

          </Carousel>
          </div>
          <div id='install' style={{ backgroundColor: 'white'}}>
            <div className='container'  style={{ backgroundColor: 'black'}}>
              <List>
                <ExtensiveListItem
                  headerStyle={{
                    top: 11,
                    left: 30
                  }}
                  header={
                    <div className='row'>
                      <img src='images/install/chrome_flat.png' style={{ width: 30, height: 30 }}/>
                      <div style={{ fontSize: 18, marginLeft: 10, lineHeight: '30px'}}>Chrome</div>
                    </div>
                  }
                  extensive={true}
                  bodyStyle={{
                    minHeight: 100,
                    paddingTop: 20,
                    paddingBottom: 20,
                    borderTop: '1px solid black'
                  }}
                  body={
                    <div className='container'>
                      <div className='vhCenter'>
                        <div className="btn btn-lg btn-danger" onClick={this.openNew.bind(this,'https://chrome.google.com/webstore/detail/viewport/npgjahajhclmlbijjeekjaodgmokngpp')}>
                          Install Chrome Extension
                        </div>
                      </div>
                      <div className='vhCenter' style={{ marginTop: 20 }}>
                        <img src='images/install/chrome_installed.png' style={{ width: '90%', height: 'auto'}}/>
                      </div>
                    </div>
                  }
                >

                </ExtensiveListItem>

                <ExtensiveListItem
                  headerStyle={{
                    top: 11,
                    left: 30
                  }}
                  header={
                    <div className='row'>
                      <img src='images/install/opera_flat.png' style={{ width: 30, height: 30 }}/>
                      <div style={{ fontSize: 18, marginLeft: 10, lineHeight: '30px'}}>Opera</div>
                    </div>
                  }
                  extensive={false}
                  bodyStyle={{
                    minHeight: 100,
                    paddingTop: 20,
                    paddingBottom: 20,
                    borderTop: '1px solid black'
                  }}
                  body={
                    <div className='container'>
                      <div className='vhCenter'>
                        <div className="btn btn-lg btn-danger disabled">
                          Install Opera Extension
                        </div>
                      </div>
                      <div className='vhCenter'  style={{ marginTop: 20 }}>
                        <img src='images/install/opera_installed.png' style={{ width: '90%', height: 'auto'}}/>
                      </div>
                    </div>
                  }
                >

                </ExtensiveListItem>
                <ExtensiveListItem
                  headerStyle={{
                    top: 11,
                    left: 30
                  }}
                  header={
                    <div className='row'>
                      <img src='images/install/firefox_flat.png' style={{ width: 30, height: 30 }}/>
                      <div style={{ fontSize: 18, marginLeft: 10, lineHeight: '30px'}}>Firefox</div>
                    </div>
                  }
                  extensive={false}
                  bodyStyle={{
                    minHeight: 100,
                    paddingTop: 20,
                    paddingBottom: 20,
                    borderTop: '1px solid black'
                  }}
                  body={
                    <div className='container'>
                      <div className='vhCenter'>
                        <div className="btn btn-lg btn-danger" onClick={this.openNew.bind(this,'https://addons.mozilla.org/zh-CN/firefox/addon/viewportgroup/')}>
                          Install Firefox Extension
                        </div>
                      </div>
                      <div className='vhCenter'  style={{ marginTop: 20 }}>
                        <img src='images/install/firefox_installed.png' style={{ width: '90%', height: 'auto'}}/>
                      </div>
                    </div>
                  }
                >

                </ExtensiveListItem>
              </List>
            </div>
          </div>
          <footer className="container-fluid" style={{ paddingTop: 20 }}>
            <div className="row" style={{ color: 'white' }}>
              <div className="col-4 col-md">
                <div className='font-italic'>
                  <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg>
                  <span style={{ marginLeft: 10, fontSize: 16, lineHeight: '16px', display: 'inline-block',verticalAlign:'top' }}>ViewportGroup</span>
                </div>
                <p style={{ fontSize: '0.8rem' }}>
                  Browse the Internet efficient, speed the action of fetching information
                </p>
                <small className="mb-3 text-muted">© 2018 ViewportGroup, Inc </small>
              </div>
              <div className="col-4 col-md">
                <h5>donations are appreciated!</h5>
                <ul className="list-unstyled text-small" style={{ fontSize: '0.8rem' }}>
                  <li>ETH:
                    <span id='ethAddress' onDoubleClick={()=>{
                      // document.getElementById('ethAddress').focus();
                      document.execCommand("copy")
                      this.props.appAction.toast('already copyed to clipboard')
                    }}>
                      0x31bf67f8e79fb5c04500b1579580139a018cfc32
                    </span>
                  </li>
                  <li>
                      <img src='images/eth.png' onClick={()=>{
                        this.props.appAction.showModal(ETHModal, {
                          style: {
                            width: 300
                          },
                          // hasClose: true,
                          appAction: this.props.appAction
                        });
                      }} style={{ width: 80, height: 80 }}/>
                  </li>
                </ul>
              </div>
              <div className="col-4 col-md">
                <h5>resources</h5>
                <ul className="list-unstyled text-small" style={{ fontSize: '0.8rem' }}>
                  <li style={{ cursor: 'pointer' }} onClick={this.openNew.bind(this,"https://github.com/viewportgroup/web-extension")}>Git Hub</li>
                </ul>
              </div>

            </div>
          </footer>
        </Content>
      </Layout>
    );
  }
}
import {injectIntl} from 'react-intl';

export default connect(state => ({ app: state.app }), dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
}))(injectIntl(PortalIndex))
