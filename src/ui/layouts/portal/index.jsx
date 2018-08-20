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
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';


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
  // onScrollHandle(e){
  //   return;
  //   console.log(e.srcElement.scrollTop);
  //   var scrollTop = e.srcElement.scrollTop;
  //   var header = document.querySelector('#header');
  //   var dialog = document.querySelector('#dialog');
  //   if(scrollTop > 0){
  //     header.style.position='fixed';
  //     dialog.style.marginTop = header.clientHeight + 'px';
  //   } else{
  //     header.style.position='static';
  //     dialog.style.marginTop = 0;
  //   }
  // }
  scrollTo(id){
    var target = document.getElementById(id);
    var menus = document.querySelectorAll('.nav-item>.nav-link');
    for(var i=0;i<menus.length;i++){
      var menu = menus[i]
      menu.classList.remove('active');
      if( menu.getAttribute("data") && id === menu.getAttribute("data").toLowerCase()){
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
  menuItemClick(id){
    // console.log(e);
    // var target = e.nativeEvent.srcElement;
    // console.log(target);
    // // alert(target.parentElement.getAttribute("data"));
    // var id = target.parentElement.getAttribute("data").toLowerCase();
    this.scrollTo(id.toLowerCase());
    // console.log(target)

  }
  componentWillReceiveProps(nextProps){
    if(this.props.appLanguage!==nextProps.appLanguage){
      const {intl} = nextProps;
      var title = intl.formatMessage({id: 'app.portal.title'});
      document.title = title;
    }
  }
  onMenuSelectLanguage(e){
    var key = e.key;
    this.props.appAction.switchLanguage(key)
  }
  onDropdownVisibleChange(){

  }
  render() {
    var self = this;
    const {intl} = this.props;
    var languages = intl.formatMessage({id: 'app.languages'});
    var carouselItems = intl.formatMessage({id: 'app.portal.home.carousel.items'});
    var qaItems = intl.formatMessage({id: 'app.portal.home.qa.items'});
    var usercaseItems = intl.formatMessage({id: 'app.portal.usercase.items'});
    var featureItems = intl.formatMessage({id: 'app.portal.feature.items'});
    var installItems = intl.formatMessage({id: 'app.portal.install.items'});
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
                    <a className="nav-link active" href="javascript:void(-1)" data='Home' onClick={this.menuItemClick.bind(this,"Home")}>
                      <FormattedMessage
                        id='app.portal.header.menu.home'
                        description='app.portal.header.menu.home'
                        defaultMessage='Home'
                        />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="javascript:void(-1)" data='Usercase' onClick={this.menuItemClick.bind(this,"Usercase")}>
                      <FormattedMessage
                        id='app.portal.header.menu.usercase'
                        description='app.portal.header.menu.usercase'
                        defaultMessage='Usercase'
                        />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="javascript:void(-1)" data='Features' onClick={this.menuItemClick.bind(this,"Features")}>

                      <FormattedMessage
                        id='app.portal.header.menu.features'
                        description='app.portal.header.menu.features'
                        defaultMessage='Features'
                        />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="javascript:void(-1)" data='Install' onClick={this.menuItemClick.bind(this,"Install")}>

                      <FormattedMessage
                        id='app.portal.header.menu.install'
                        description='app.portal.header.menu.install'
                        defaultMessage='Install'
                        />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="mailto:viewportgroup@outlook.com">

                      <FormattedMessage
                        id='app.portal.header.menu.contact'
                        description='app.portal.header.menu.contact'
                        defaultMessage='Contact'
                        />
                    </a>
                  </li>
                  <Dropdown
                      overlayClassName='dropDownInDrawer'
                      trigger={['click']}
                      overlay={
                         <Menu mode='inline' onSelect={this.onMenuSelectLanguage.bind(this)} selectedKeys={[this.props.appLanguage]}>

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
                    <li className="nav-item">
                      <a className="nav-link" href="javascript:void(-1)">
                        <FormattedMessage
                          id='app.drawer.language'
                          description='app.drawer.language'
                          defaultMessage='Language'
                          />
                      </a>
                    </li>
                  </Dropdown>
                </ul>
              </div>
            </nav>
          </header>
          <div id='home' className="d-md-flex flex-md-equal w-100" style={{ minHeight: window.innerHeight - 80 }}>
            <div className='col-md-8'>
              <Carousel  infiniteLoop={true} autoPlay={false} interval={10000} transitionTime={1000} showThumbs={false} selectedItem={0} showStatus={false}>
                {
                  // <div className='vhCenter' style={{ margin: '0 auto', width: '100%', height: '100%'}}>
                  //   <div>
                  //       <img src="images/internet.jpg" style={{width: '80%', height:'auto', display:'inline-block', verticalAlign: 'top'}} />
                  //       <img src="images/internet_attachment.jpg" style={{width: '20%', height: 'auto', display:'inline-block', verticalAlign: 'top'}}/>
                  //   </div>
                  //   <p className="legend font-weight-bold" style={{ marginBottom: 10 }}>
                  //     <a style={{ color: 'white', textDecoration: 'none' }} href='javascript:void(-1)' onClick={this.openNew.bind(this,'https://www.opte.org/the-internet/')}>
                  //       THE INTERNET(2015 from opte.org)<br/> WWW is just a small part of Internet
                  //     </a>
                  //   </p>
                  // </div>
                }
                {
                  carouselItems.map(function(item){
                    var title = item.split(" || ")[0];
                    var jumpUrl = item.split(" || ")[2];
                    var picUrl = item.split(" || ")[1];
                    return (
                      <div className='vhCenter' style={{ margin: '0 auto', width: '100%', height: '100%'}}>
                        <img src={picUrl} style={{width: '80%', height:'auto', WebkitBorderRadius: '5px 5px' }}/>
                        <p className="legend font-weight-bold" style={{ marginBottom: 10 }}>
                          <a  style={{ color: 'white', textDecoration: 'none' }} href='javascript:void(-1)' onClick={self.openNew.bind(this,jumpUrl)}>
                            {title}
                          </a>
                        </p>
                      </div>
                    )
                  })
                }


              </Carousel>
            </div>
            <div className="col-md-4">
              <div style={{ paddingLeft: 10, textALign:'left',color: '#00fd55', fontSize: '1rem', width: '100%' }}>
                <h4 className="font-italic" >
                  <FormattedMessage
                    id='app.portal.home.qa.title'
                    description='app.portal.home.qa.title'
                    defaultMessage='Q/A'
                    />
                </h4>
                <Typing key={"QA_"+this.props.app && this.props.appLanguage} loop={false} speed={50} className='features' onFinishedTyping={() => {}}>
                  <ul>
                    {
                      qaItems.map(function(item,i){
                        if(i===qaItems.length-1){
                          var itemArray= item.split('||');
                          return (
                            <li>
                              <span className='checkmark'> &gt;</span>
                              {itemArray[0]}{itemArray[1]}
                              <Backspace count={itemArray[1].length} delay={750} />
                              {itemArray[2]}
                              <br/>
                              <br/>
                              <div style={{ fontSize: '3rem', cursor: 'pointer' }} onClick={()=>{self.scrollTo('install')}}>--></div>
                              <Delay ms={30000} />
                            </li>
                          )
                        }
                        return (
                              <li>
                                <span className='checkmark'> &gt;</span>
                                {item}
                                <Delay ms={2000} />
                              </li>

                        )
                      })
                    }


                  </ul>
                </Typing>
              </div>
            </div>
          </div>
          <div id='usercase'>


            {
              usercaseItems.filter(function(d,i){return i%2==0}).map(function(o,row){

                var col1 = usercaseItems[row*2];

                var col1UI =    <div className={(row%2==0? "bg-dark":"bg-light") +  " mr-md-1 pt-1 px-1 pt-md-3 px-md-3 text-center "+(row%2==0? "text-white":"")+" overflow-hidden"}>
                                  <div className="my-3 py-3">
                                    <h2 className="display-5">{col1.split(' || ')[1]}</h2>
                                  </div>
                                  <div className={(row%2==0? "bg-light":"bg-dark") +  " box-shadow mx-auto"} style={{width: '90%', height: 400, borderRadius: '21px 21px 0 0'}}>
                                    <div className='vhCenter' style={{ width: '100%', height: '100%'}}>
                                      {
                                        col1.split(' || ')[2]?

                                          col1.split(' || ')[0]==='video'?
                                              <video controls="controls" src={col1.split(' || ')[2]} style={{ width: '100%', height: 'auto' }}/>
                                              :
                                              <img src={col1.split(' || ')[2]} style={{ width: '100%', height: 'auto' }}/>
                                          :
                                          null

                                      }

                                    </div>
                                  </div>
                                </div>;
                var col2UI = null;
                if(row*2+1<usercaseItems.length){
                    var col2 = usercaseItems[row*2+1];
                    col2UI = <div className={(row%2==0? "bg-light":"bg-dark") +  " mr-md-1 pt-1 px-1 pt-md-3 px-md-3 text-center "+(row%2==0? "":"text-white")+" overflow-hidden"}>
                                <div className="my-3 py-3">
                                  <h2 className="display-5">{col2.split(' || ')[1]}</h2>
                                </div>
                                <div className={(row%2==0? "bg-dark":"bg-light") +  " box-shadow mx-auto"} style={{width: '90%', height: 400, borderRadius: '21px 21px 0 0'}}>
                                  <div className='vhCenter' style={{ width: '100%', height: '100%'}}>
                                    {
                                      col2.split(' || ')[2]?

                                        col2.split(' || ')[0]==='video'?
                                            <video controls="controls" src={col2.split(' || ')[2]} style={{ width: '100%', height: 'auto' }}/>
                                            :
                                            <img src={col2.split(' || ')[2]} style={{ width: '100%', height: 'auto' }}/>
                                        :
                                        null

                                    }

                                  </div>
                                </div>
                              </div>;
                }else{
                  col2UI = <div className="mr-md-1 pt-1 px-1 pt-md-3 px-md-3 text-center text-white overflow-hidden">
                           </div>;
                }
                return (
                  <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
                    {
                      col1UI
                    }
                    {
                      col2UI
                    }
                  </div>
                )
              })
            }

          </div>

          <div id='features'>
            <Carousel infiniteLoop={true} autoPlay={true} interval={10000} transitionTime={1000} showThumbs={false} selectedItem={0} showStatus={true}>
              {
                featureItems.map(function(item){
                  var url = item.split(' || ')[2];
                  var type = item.split(' || ')[0];
                  var title = item.split(' || ')[1];
                  return (
                    <div className='vhCenter' style={{ margin: '0 auto', width: '100%', height: '100%'}}>
                      <div>
                          {
                            type==='video'?
                            <video controls="controls" src={url} style={{width: '80%', height:'auto', display:'inline-block', verticalAlign: 'top'}}/>
                            :
                            <img src={url} style={{width: '80%', height:'auto', display:'inline-block', verticalAlign: 'top'}} />
                          }
                      </div>
                      <p className="legend font-weight-bold" style={{ marginBottom: 10 }}>
                        {title}
                      </p>
                    </div>

                  )
                })
              }
            </Carousel>
          </div>
          <div id='install' style={{ backgroundColor: 'white'}}>
            <div className='container'  style={{ backgroundColor: 'black'}}>
              <List>
                {
                  installItems.map(function(item,i){
                    var icon = item.split(" || ")[0];
                    var name = item.split(" || ")[1];
                    var label = item.split(" || ")[2];
                    var installUrl = item.split(" || ")[3];
                    var picUrl = item.split(" || ")[4];
                    return (
                      <ExtensiveListItem
                        headerStyle={{
                          top: 11,
                          left: 30
                        }}
                        header={
                          <div className='row'>
                            <img src={icon} style={{ width: 30, height: 30 }}/>
                            <div style={{ fontSize: 18, marginLeft: 10, lineHeight: '30px'}}>{name}</div>
                          </div>
                        }
                        extensive={i===0}
                        bodyStyle={{
                          minHeight: 100,
                          paddingTop: 20,
                          paddingBottom: 20,
                          borderTop: '1px solid black'
                        }}
                        body={
                          <div className='container'>
                            <div className='vhCenter'>
                              <div className="btn btn-lg btn-danger" onClick={self.openNew.bind(this,installUrl)}>
                                {label}
                              </div>
                            </div>
                            <div className='vhCenter' style={{ marginTop: 20 }}>
                              <img src={picUrl} style={{ width: '90%', height: 'auto'}}/>
                            </div>
                          </div>
                        }
                      >

                      </ExtensiveListItem>
                    )
                  })
                }



              </List>
            </div>
          </div>
          <footer className="container-fluid" style={{ paddingTop: 20 }}>
            <div className="row" style={{ color: 'white' }}>
              <div className="col-4 col-md">
                <div className='font-italic'>
                  <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg>
                  <span style={{ marginLeft: 10, fontSize: 16, lineHeight: '16px', display: 'inline-block',verticalAlign:'top' }}>

                      <FormattedMessage
                        id='app.portal.footer.title'
                        description='app.portal.footer.title'
                        defaultMessage='ViewportGroup'
                        />
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem' }}>
                  <FormattedMessage
                    id='app.portal.footer.desc'
                    description='app.portal.footer.desc'
                    defaultMessage='Browse the Internet efficient, speed the action of fetching information'
                    />

                </p>
                <small className="mb-3 text-muted">© 2018 ViewportGroup, Inc </small>
              </div>
              <div className="col-4 col-md">
                <h5>

                  <FormattedMessage
                    id='app.portal.footer.donation'
                    description='app.portal.footer.donation'
                    defaultMessage='donations are appreciated!'
                    />
                </h5>
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
                <h5>

                  <FormattedMessage
                    id='app.portal.footer.resouces'
                    description='app.portal.footer.resouces'
                    defaultMessage='resources'
                    />
                </h5>
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

export default connect(state => ({ appLanguage: state.app.appLanguage }), dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
}))(injectIntl(PortalIndex))
