import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import Loading from '../../../components/loading'
import  './index.styl'

import extensionAPI  from '../../../utils/extension'

import { ContextMenu, MenuItem, ContextMenuTrigger, SubMenu } from "react-contextmenu";

import { FormattedMessage } from 'react-intl';
import {generatValidUrl,resetUrlByRules}  from '../../../utils/url'

import {getAlreadyJoyrideFlag,setAlreadyJoyrideFlag} from '../../../utils/storage'

class UrlModal extends React.Component{
  constructor(props) {
    super(props);
  }
  jumpUrl(){
    var self = this;
    this.refs.newInputUrl.value=generatValidUrl(this.refs.newInputUrl.value);
    var url=this.refs.newInputUrl.value;
    if (url){
      var updateView = {
        uuid: self.props.uuid,
        url: url
      }
      self.props.appAction.updateView(updateView);
      self.props.appAction.hideModal();
    }
  }
  onKeyDownHandler(e){
    var event = e.nativeEvent;
    if(event.keyCode === 13) {
      this.jumpUrl()
    }else if(event.keyCode === 27) {
      this.props.appAction.hideModal();
    }
  }
  componentDidMount(){
    this.props.from.style.borderColor='black';
  }
  componentWillUnmount(){
    this.props.from.style.borderColor='#eee';
  }
  render(){
    // const {intl} = this.props;
    // var createLabel = intl.formatMessage({id: 'app.drawer.login.create.tabtitle'});
    // var importLabel = intl.formatMessage({id: 'app.drawer.login.import.tabtitle'});
    var self = this;
    return (
      <div className='urlModal'>
        <div  onClick={(e)=>this.props.appAction.hideModal()} style={{width: 32, height: 32, float:'right', marginBottom: 4 }}>
          <i className='fa fa-1x fa-window-close'/>
        </div>
        <p className='vhCenter btn-lg'>
          {self.props.preUrl}
        </p>
        <div className="container">
          <div className="form-group">
            <input  type="text" className="form-control" ref='newInputUrl' placeholder='url' onKeyDown={this.onKeyDownHandler.bind(this)}/>
          </div>

        </div>
      </div>
    )
  }
}

class MiniControl extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      url: props.url
    }
  }
  componentWillReceiveProps(nextProps){
    if( nextProps.url && this.state.url !== nextProps.url){
      this.setState({url:nextProps.url});
    }
    // alert(nextProps.parentFocus + '==>' + this.props.parentFocus)
    if(nextProps.parentFocus !== this.props.parentFocus &&  nextProps.parentFocus===false){
      this.setState({open: false});
    }
  }
  onMouseOverHandler(e){
    var self = this;
    ReactDOM.findDOMNode(self.refs.miniControl).removeEventListener('mouseover',self.onMouseOverHandler.bind(self),false)
    if(self.state.open===false){
      self.setState({
        parentFocus: true,
        open: true
      },function(){
        // ReactDOM.findDOMNode(self.refs.miniHide).removeEventListener('mouseover')
        // ReactDOM.findDOMNode(self.refs.miniShow).addEventListener('mouseout',self.onMouseOutHandler.bind(self),true)
      })
    }
  }
  onMouseOutHandler(e){
    var self = this;
    ReactDOM.findDOMNode(self.refs.miniControl).addEventListener('mouseover',self.onMouseOverHandler.bind(self),false)
    //
    if(self.state.open===true){
      self.setState({
        open: false,
        parentFocus: false,
      },function(){
        // ReactDOM.findDOMNode(self.refs.miniShow).removeEventListener('mouseout')
        // ReactDOM.findDOMNode(self.refs.miniHide).addEventListener('mouseover',self.onMouseOverHandler.bind(self),false)
      })
    }
  }
  handleUrlChange(e){
    this.setState({
      url: this.refs.miniUrl.value
    })
  }
  onKeyDownHandler(e){
    var event = e.nativeEvent;
    if(event.keyCode === 13) {
      this.refs.miniUrl.value = generatValidUrl(this.refs.miniUrl.value);
      var url = this.refs.miniUrl.value;

      // alert(url+ '-->'+this.props.url);
      if(url && url!== this.props.url){
        var updateView = {
          uuid: this.props.uuid,
          url: url
        }
        this.props.appAction.updateView(updateView);
      }
    }
  }
  remove(){
    //self.props.appAction
    var self = this;
    self.props.appAction.removeView(self.props.uuid);
  }
  // componentDidMount(){
  //   var self = this;
  //   ReactDOM.findDOMNode(self.refs.miniHide).addEventListener('mouseover',self.onMouseOverHandler.bind(self),false)
  // }
  render(){
    // var style = {
    //   position: 'absolute',
    //   top: 0,
    //   height: 60,
    //   // left: 0,
    //   backgroundColor: 'transparent'
    // }
    // if(this.state.open === false ) {
    //   style.left = '50%';
    //   style.width = 100;
    // }else{
    //   style.left = '20%';
    //   style.width = '60%';
    // }
    return (
      <div className='miniControl' ref='miniControl'  onMouseOver={this.state.open? null:this.onMouseOverHandler.bind(this)} onMouseOut={this.state.open?this.onMouseOutHandler.bind(this):null} >
        {
          this.state.open ?
            <div ref='miniShow' className='row' style={{ height: '100%', margin: 0, padding: 0 }} >
                <input style={{ fontSize: 18 }} ref='miniUrl' type="text" value={this.state.url} className="form-control" id="basic-url" aria-describedby="basic-addon3" onChange={this.handleUrlChange.bind(this)} onKeyDown={this.onKeyDownHandler.bind(this)}/>
                <i className="fas fa-trash" style={{ marginLeft: -30, lineHeight: '60px',fontSize: 10, transform: this.props.transform }} onClick={this.remove.bind(this)}></i>
            </div>
              :
            <div ref='miniHide' >
              <i className='fa fa-angle-down' style={{ fontSize: 10,transform: this.props.transform }}></i>
            </div>
        }
      </div>
    )
  }
}
class IframeBase extends React.Component {
  static propTypes = {
    style: PropTypes.shape({
      width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      top: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      left: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      transform: PropTypes.string
    }),
    switchFullscreen: PropTypes.func
  }
  static defaultProps = {
    style: {
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      transform: 'none'
    },
    switchFullscreen: null
  }
  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false,
      selected: false,
      startLoad: false,
      frameId: props.framedId || null,
      url: props.url || null,
      // focus: true
    }
  }
  mouseOver(e){
    //e.target.style.border = '2px solid red'
    // this.setState({
    //   focus: true
    // })
  }
  mouseOut(e){
    // this.setState({
    //   focus: false
    // })
    // e.target.style.border = 'none';
    // this.setState({
    //   fullScreen: false
    // });
    // this.setState({
    //   fullScreen: false
    // });
  }
  focus(e){
    this.setState({
      selected: true
    });
    // e.target.style.border = '2px solid red'
  }
  blur(e){
    if(this.state.fullScreen===false){
      this.setState({
        selected: false
      });
    }
  }
  doubleClick(e){
    if(this.state.url && this.state.url!=='about:blank'){
      this.enterFullscreen();
    }
  }
  enterFullscreen(){
    var self = this;
    if(self.state.fullScreen === false) {
      self.setState({
        fullScreen: true
      },function(){
        extensionAPI.operationOnView({
          frameId: self.state.frameId,
          uuid: self.props.uuid,
          operation: 'focus'
        })
        self.props.switchFullscreen(true,self.props.uuid);

        ReactDOM.findDOMNode(self).scrollIntoView();
      })
    }
  }
  exitFullscreen(){
    var self = this;
    if(self.state.fullScreen === true) {
      self.setState({
        fullScreen: false,
        selected: false
      },function(){
        self.props.switchFullscreen(false,self.props.uuid);
        ReactDOM.findDOMNode(self).scrollIntoView();
        self.refs.container.focus();
      })
    }
  }
  messageListener(m){
    // console.log(this.state);
    var uuidFromUrl = function(url){
      var str = '#uuid='
      return url.substr(url.indexOf(str)+str.length)
    }
    if(m.data.command ==='pageExitFullScreen'){
      this.exitFullscreen();
    }
    // if(m.data.command === 'viewStartLoading'){
    //   var params = m.data.params;
    //   // console.log(m.data);
    //   //
    //   // console.log(this.state.url+'&&&' +this.state.frameId+'&&&' +params.frameId );
    //   if(uuidFromUrl(params.url) === uuidFromUrl(this.state.url) || params.frameId === this.state.frameId){
    //       this.setState({
    //         startLoad: true,
    //         frameId: params.frameId
    //       });
    //   }
    // }else if(m.data.command === 'viewEndLoading'){
    //   var params = m.data.params;
    //   // console.log(m.data);
    //   // console.log(this.state.url+'&&&' +this.state.frameId+'&&&' +params.frameId );
    //   if(uuidFromUrl(params.url) === uuidFromUrl(this.state.url) || params.frameId === this.state.frameId){
    //       this.setState({
    //         startLoad: false,
    //         frameId: params.frameId
    //       });
    //       // alert('end')
    //       // var url = params.url;
    //       // console.log(params.url,'123213213213213');
    //       // console.log(this.state.url,'123213213213213');
    //
    //       // alert(params.url.substr(0,params.url.indexOf('#uuid=')));
    //       var url = params.url
    //       if(url.indexOf('#uuid=')>0){
    //         url = url.substr(0,url.indexOf('#uuid='))
    //       }
    //
    //       var updateView = {
    //         uuid: this.props.uuid,
    //         url: url
    //       }
    //       this.props.appAction.updateView(updateView);
    //
    //   }
    // }
  }
  componentDidMount(){
    var self =this;
    // window.addEventListener('keydown',function(event){
    //   if (event.keyCode == 27) {
    //     self.exitFullscreen();
    //   }
    // }, false)

    window.addEventListener('message',this.messageListener.bind(this), false)

    window.addEventListener('focusout',function(){
      self.setState({
        selected: false
      })
    },false);
    // if(typeof chrome !== 'undefined'&&chrome.runtime){
    //   chrome.runtime.onMessage.addListener(this.messageListener.bind(this))
    // }
    // var myIframe = ReactDOM.findDOMNode(this.refs.myIframe);
    // console.log(myIframe,"%%%%%");
    // self.setState({ startLoad: true })
    // myIframe.src = self.state.url;
    // myIframe.onload = function(){
    //   self.setState({ startLoad: false })
    //
    // }
    // myIframe.onerror = function(){
    //   self.setState({ startLoad: false })
    // }

   const {intl} = this.props;
    var selector1 = '.iframeBase';
    var steps = [
      {
        title: intl.formatMessage({id: 'app.joyride.iframe.title'}),
        text: intl.formatMessage({id: 'app.joyride.iframe.text'}),
        selector: selector1,
        allowClicksThruHole: false,
        position: 'right-end',
        style: {

        }
      }

    ];

    if (!getAlreadyJoyrideFlag(selector1)) {
      if (this.props.appAction && this.props.appAction.setJoyride) {
        this.props.appAction.setJoyride({
          type: 'continuous',
          steps: steps,
          callback: function(result) {
            if (result.type === 'finished') {
              setAlreadyJoyrideFlag( selector1);
            }
          }
        });
      }
    }
  }
  componentWillUnmount(){
    // if(typeof chrome !== 'undefined'&&chrome.runtime){
    //   chrome.runtime.onMessage.removeListener(this.messageListener.bind(this))
    // }
    window.removeEventListener('message',this.messageListener.bind(this))
  }
  componentWillReceiveProps(nextProps){
    // console.log(nextProps,"123213213213213");
    if( nextProps.url && this.state.url !== nextProps.url){
      this.setState({url:nextProps.url, startLoad: true},()=>{setTimeout(()=>{this.setState({startLoad: false})},15000)});
    }
    if( nextProps.frameId && nextProps.frameId!== this.state.frameId){
      this.setState({
        frameId: nextProps.frameId
      })
    }
  }
  // onLoadHandler(e){
  //   this.setState({
  //     alreadyLoaded: true
  //   })
  // }
  dragStart(e){
    console.log('dragstart',this.props.uuid);
    e.nativeEvent.dataTransfer.setData('Text', this.props.uuid) // hack for firefox , or it will not trigger drag, dragend event
  }
  drag(e){
    // console.log('drag',this.props.uuid);
  }
  dragEnd(e){
    // console.log('dragend',this.props.uuid);
  }
  dragEnter(e){
    console.log('dragenter',this.props.uuid);
    // console.log(e.nativeEvent);
  }
  dragOver(e){
    // console.log('dragover',this.props.uuid);
    e.preventDefault();
    e.nativeEvent.dataTransfer.dropEffect = "move"
  }
  dragLeave(e){
    console.log('dragleave',this.props.uuid);
  }
  drop(e){
    console.log('from:',e.nativeEvent.dataTransfer.getData("Text"));
    console.log('drop',this.props.uuid);
    // console.log(e.nativeEvent);
    // prevent default action (open as link for some elements)
    e.preventDefault();
    // // move dragged elem to the selected drop target
    // if ( event.target.className == "dropzone" ) {
    //     event.target.style.background = "";
    //     dragged.parentNode.removeChild( dragged );
    //     event.target.appendChild( dragged );
    // }
  }
  render () {
    var self = this;
    // var viewLeft = this.state.fullScreen ? 0 : this.props.style.left;
    // var viewTop = this.state.fullScreen ? 0 : this.props.style.top;
    // var width = this.state.fullScreen ? '100%' : this.props.style.width;
    // var height = this.state.fullScreen ? '100%' : this.props.style.height;
    // var viewScaleTransform = this.state.fullScreen ? 'none': this.props.style.transform;
    // var viewZIndex = this.state.fullScreen ? 9998 :'auto';
    var viewBorderColor = this.state.selected ? 'black': '#eee';
    var url = this.state.url;
    var uuid = this.props.uuid;
    var isFullScreen = this.state.fullScreen;
    var uuid = this.props.uuid;
    var isEmpty =  uuid === 'empty';
    // var frameId = this.state.frameId;

    var transfromDataArray =  this.props.style.transform ? this.props.style.transform.match(/([0-9]{1,}[.][0-9]*)/g):[1,1];
    var fixTransformScale = {
      x: 1/transfromDataArray[0],
      y: 1/transfromDataArray[1]
    };
    // console.log(fixTransformScale);
    // console.log('scale('+fixTransformScale.x+',' + fixTransformScale.y + ')');
    var containerStyle = {
      borderStyle:'solid',
      borderColor: viewBorderColor,
    }
    if(isFullScreen){
      containerStyle = {
        ...containerStyle,
        position: self.props.style.position === 'fixed'? 'fixed' : 'absolute',
        width: self.props.containerWidth || '100%',
        height: self.props.containerHeight || '100%',
        top: 0,
        left: 0,
        transform: 'none',
        zIndex: 9998
      }
    }
    if(isEmpty){
      return (
        <div className='emptyTipView' ref='container' tabIndex={self.props.tabIndex} style={{ ...self.props.style, ...containerStyle  }}>
          <div className='vhCenter' style={{width: '100%', height: '100%'}} onClick={()=>{
              self.props.appAction.addView();
              }}>
            <div  style={{ fontSize: 18, transform: 'scale('+fixTransformScale.x+',' + fixTransformScale.y + ')' }}>
              Add
            </div>
          </div>
        </div>
      )
    }
    return [
      <div
        // draggable
        // onDragStart={this.dragStart.bind(this)}
        // onDrag={this.drag.bind(this)}
        // onDragEnd={this.dragEnd.bind(this)}
        // onDragEnter={this.dragEnter.bind(this)}
        // onDragOver={this.dragOver.bind(this)}
        // onDragLeave={this.dragLeave.bind(this)}
        // onDrop={this.drop.bind(this)}
        className='iframeBase' ref='container' tabIndex={self.props.tabIndex} style={{ ...self.props.style, ...containerStyle  }} onFocus={this.focus.bind(this)} onBlur={this.blur.bind(this)} onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)} onDoubleClick={this.doubleClick.bind(this)}>
        <div style={{ position: 'relative',width: '100%', height: '100%', boxSizing: 'border-box' }}>
          {

            //sandbox='allow-scripts allow-forms allow-popups allow-same-origin allow-top-navigaion'
            // this.state.alreadyLoaded? null: <img src='images/loading.jpg' style={{position: 'absolute', top: 0,left: 0,width: '100%',height: '100%'}} />

            url && url.indexOf('about:blank') === -1 ?
            //   window.location.protocol === 'https:' && url.startsWith('http:')?
            //     <div className='vhCenter' style={{ position: 'relative',width: '100%', height: '100%', backgroundColor:'white'}}>
            //       <div style={{ WebkitUserSelect: 'none', color: 'grey', fontSize: 12, transform: 'scale('+fixTransformScale.x+',' + fixTransformScale.y + ')' }}>this web-resource not suppot https, still want to load, switch location-bar to http://viewport.group</div>
            //     </div>
            //     :
                <iframe sandbox='allow-scripts allow-forms allow-popups allow-same-origin' seamless src={resetUrlByRules(url)+'#uuid='+uuid} onLoad={() => { this.setState({startLoad:false}); }} onError={() => { this.setState({startLoad:false}); }} allowFullScreen frameBorder={0} style={{ backgroundColor: this.state.fullScreen?'white':'transparent', visibility :'visible', position: 'absolute', top: 0,left: 0,width: '100%',height: '100%',boxSizing: 'border-box' }}/>
              :
              null
          }
          {
            url && url.indexOf('about:blank') === -1 ?
                <Loading show={this.state.startLoad}/>
                : null
          }
          {
            !url || url.indexOf('about:blank') > -1 ?
               <div className='vhCenter' style={{ position: 'relative',width: '100%', height: '100%', backgroundColor:'white'}}>
                 <div style={{ WebkitUserSelect: 'none', color: 'grey', fontSize: 12, transform: 'scale('+fixTransformScale.x+',' + fixTransformScale.y + ')' }}>about:blank</div>
               </div>
               : null
          }
          {
              self.state.fullScreen ? null:
              <div refs='mask' className='mask' style={{ position: 'absolute', top: 0,left: 0, width: '100%', height: '100%' }} >
                <ContextMenuTrigger id={this.props.uuid} attributes={{
                    style:{
                      width:'100%',
                      height: '100%'
                    }
                  }}>
                  <div className="well vhCenter">

                  </div>
                </ContextMenuTrigger>
              </div>
          }
          <MiniControl parentFocus={self.state.selected} uuid={self.props.uuid} url={url} appAction={self.props.appAction} transform={'scale('+fixTransformScale.x+',' + fixTransformScale.y + ')'} />
        </div>
      </div>,
      <div>
        {
          isFullScreen ? null:
          <ContextMenu id={self.props.uuid} hideOnLeave={false}>
            {
              // <MenuItem onClick={(e)=>{
              //   var container = ReactDOM.findDOMNode(self.refs.container);
              //   if (document.pointerLockElement == container) {
              //      document.exitPointerLock();
              //   } else {
              //     container.requestPointerLock();
              //     var drag = function(e2){
              //       console.log('drag',e2);
              //     }
              //     document.addEventListener('pointerlockchange', function () {
              //        if (document.pointerLockElement == container) {
              //          container.setAttribute('draggable',true);
              //          container.addEventListener('dragstart',drag,false)
              //        } else {
              //          container.removeAttribute('draggable');
              //          container.removeEventListener('drag',drag)
              //        }
              //    }, false);
              //   }
              //
              // }}>
              //   <i className="fas fa-globe"><span style={{  marginLeft: 10, textAlign: 'left' }}>move</span></i>
              // </MenuItem>
            }
            <MenuItem onClick={(e)=>{
              // var url = window.prompt("input new url(old: " + self.state.url + ")","http://")
              // if (url){
              //   var updateView = {
              //     uuid: self.props.uuid,
              //     url: url
              //   }
              //   self.props.appAction.updateView(updateView);
              //
              // }
              self.props.appAction.showModal(
                UrlModal,
                {
                  style: {
                    width: '40%'
                  },
                  intl: self.props.intl,
                  appAction: self.props.appAction,
                  preUrl: self.state.url,
                  uuid: self.props.uuid,
                  from: self.refs.container


                }
              );
            }}>
              <i className="fas fa-globe">
                <span style={{  marginLeft: 10, textAlign: 'left' }}>
                  <FormattedMessage
                    id='app.scenes.iframe.operation.url'
                    description='app.scenes.iframe.operation.url'
                    defaultMessage='url'
                    />
                </span>
              </i>
            </MenuItem>

            {
              self.state.frameId ?
              <MenuItem onClick={(e)=>{
                extensionAPI.operationOnView({
                  frameId: self.state.frameId,
                  uuid: self.props.uuid,
                  operation: 'reload'
                })
              }}>
                <i className="fas fa-sync-alt">
                  <span style={{  marginLeft: 10, textAlign: 'left' }}>
                    <FormattedMessage
                      id='app.scenes.iframe.operation.reload'
                      description='app.scenes.iframe.operation.reload'
                      defaultMessage='reload'
                      />
                  </span>
                </i>
              </MenuItem>
              : null
            }

            <MenuItem onClick={(e)=>{
              self.props.appAction.removeView(self.props.uuid);
            }}>
              <i className="fas fa-trash">
                <span style={{  marginLeft: 10, textAlign: 'left' }}>
                  <FormattedMessage
                    id='app.scenes.iframe.operation.remove'
                    description='app.scenes.iframe.operation.remove'
                    defaultMessage='remove'
                    />
                </span>
              </i>
            </MenuItem>

            {
              url && url.indexOf('about:blank') === -1 ?
              <MenuItem divider />
              : null
            }
            {
              url && url.indexOf('about:blank') === -1 ?
              <SubMenu title={ <i className="fab fa-vimeo-square"><span style={{  marginLeft: 10, textAlign: 'left' }}>video(H5)</span></i> }>
                  <MenuItem onClick={(e)=>{
                    extensionAPI.operationOnView({
                      frameId: self.state.frameId,
                      uuid: self.props.uuid,
                      operation: 'videoFullScreen'
                    })
                  }}>
                    <i className="fas fa-window-maximize">
                      <span style={{  marginLeft: 10, textAlign: 'left' }}>

                        <FormattedMessage
                          id='app.scenes.iframe.operation.video.max'
                          description='app.scenes.iframe.video.operation.max'
                          defaultMessage='maximize'
                          />
                      </span>
                    </i>
                  </MenuItem>
                  <MenuItem onClick={(e)=>{
                    extensionAPI.operationOnView({
                      frameId: self.state.frameId,
                      uuid: self.props.uuid,
                      operation: 'videoExitFullScreen'
                    })
                  }}>
                    <i className="fas fa-window-minimize">
                      <span style={{  marginLeft: 10, textAlign: 'left' }}>
                        <FormattedMessage
                          id='app.scenes.iframe.operation.video.min'
                          description='app.scenes.iframe.operation.video.min'
                          defaultMessage='minimize'
                          />

                      </span>
                    </i>
                  </MenuItem>
                  <MenuItem onClick={(e)=>{
                    extensionAPI.operationOnView({
                      frameId: self.state.frameId,
                      uuid: self.props.uuid,
                      operation: 'videoMute'
                    })
                  }}>
                    <i className="fas fa-volume-down">
                      <span style={{  marginLeft: 10, textAlign: 'left' }}>
                        <FormattedMessage
                          id='app.scenes.iframe.operation.video.mute'
                          description='app.scenes.iframe.operation.video.mute'
                          defaultMessage='mute'
                          />
                      </span>
                    </i>
                  </MenuItem>
                  <MenuItem onClick={(e)=>{
                    extensionAPI.operationOnView({
                      frameId: self.state.frameId,
                      uuid: self.props.uuid,
                      operation: 'videoUnmute'
                    })
                  }}>
                    <i className="fas fa-volume-up">
                      <span style={{  marginLeft: 10, textAlign: 'left' }}>
                        <FormattedMessage
                          id='app.scenes.iframe.operation.video.unmute'
                          description='app.scenes.iframe.operation.video.unmute'
                          defaultMessage='unmute'
                          />
                      </span>
                    </i>
                  </MenuItem>
              </SubMenu>
              : null
            }



          </ContextMenu>
        }
      </div>

    ]
  }
}
import {injectIntl} from 'react-intl';

export default  injectIntl(IframeBase)
