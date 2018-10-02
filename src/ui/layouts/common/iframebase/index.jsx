import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import Loading from '../../../components/loading'
import  './index.styl'

// import extensionAPI  from '../../../utils/extension'

import { ContextMenu, MenuItem, ContextMenuTrigger, SubMenu } from "react-contextmenu";

import { FormattedMessage } from 'react-intl';
import {generatValidUrl,resetUrlByRules}  from '../../../utils/url'
import {get} from '../../../utils/request'

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
    this.refs.newInputUrl.select();
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
            <input  type="text" placeholder='new url' className="form-control" ref='newInputUrl'  onKeyDown={this.onKeyDownHandler.bind(this)}/>
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
    var miniControl = ReactDOM.findDOMNode(self.refs.miniControl);
    miniControl.removeEventListener('mouseenter',self.onMouseOverHandler.bind(self),false);
    miniControl.style.marginLeft=0;
    miniControl.style.left="20%";
    miniControl.style.width="60%";

    if(self.state.open===false){
      self.setState({
        parentFocus: true,
        open: true
      },function(){
        miniControl.querySelector('input').select();
        // ReactDOM.findDOMNode(self.refs.miniHide).removeEventListener('mouseover')
        // ReactDOM.findDOMNode(self.refs.miniShow).addEventListener('mouseout',self.onMouseOutHandler.bind(self),true)
      })
    }
  }
  onMouseOutHandler(e){
    var self = this;
    var miniControl = ReactDOM.findDOMNode(self.refs.miniControl);
    miniControl.style.marginLeft="-50px";
    miniControl.style.left="50%";
    miniControl.style.width="100px";
    miniControl.addEventListener('mouseenter',self.onMouseOverHandler.bind(self),false)
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
    // e.stopPropagation();
    // e.preventDefault();
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
      <div  className='miniControl' ref='miniControl'  onMouseEnter={this.state.open? null:this.onMouseOverHandler.bind(this)} onMouseLeave={this.state.open?this.onMouseOutHandler.bind(this):null} >
        {
          this.state.open ?
            <div ref='miniShow' className='row' style={{ height: '100%', margin: 0, padding: 0, fontSize: 30 * this.props.fontSizeRadio }} >
                <input  style={{ height: 80, fontSize: 30 * this.props.fontSizeRadio }} ref='miniUrl' type="text" value={this.state.url} className="form-control iframeText" id="basic-url" aria-describedby="basic-addon3" onChange={this.handleUrlChange.bind(this)} onKeyDown={this.onKeyDownHandler.bind(this)}/>
                <div className='vhCenter' style={{height: 80, marginLeft: -60 * this.props.fontSizeRadio  }}>
                  <i className="fas fa-trash" style={{  cursor:'pointer',fontSize: 30 * this.props.fontSizeRadio, backgroundColor: 'white' }} onClick={this.remove.bind(this)}></i>
                </div>
            </div>
              :
            <div ref='miniHide' >
              <i className='fa fa-angle-down' style={{ width: 30* this.props.fontSizeRadio, backgroundColor: 'transparent', fontSize: 30 * this.props.fontSizeRadio  }}></i>
            </div>
        }
      </div>
    )
  }
}

var selector1 = '.iframeBase';
var menusSelector = '.appMenus.addButton.fas.fa-plus-circle.fa-3x';
var drawerSwitchSelector = '.layout_drawer_menu svg';

// var unsplashJson = {
// 	"id": "QljZXuy0LOo",
// 	"created_at": "2018-02-28T07:31:28-05:00",
// 	"updated_at": "2018-08-28T20:50:47-04:00",
// 	"width": 4753,
// 	"height": 3102,
// 	"color": "#140801",
// 	"description": "low angle photography of withered leaf",
// 	"urls": {
// 		"raw": "https://images.unsplash.com/photo-1519818241092-7021b2ae8347?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjM3Njk5fQ&s=c587afba1feb3e3ed227f879f29fedd7",
// 		"full": "https://images.unsplash.com/photo-1512502600-e4aaa316250d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjI0MX0&s=a2f0c507d583aa3d2c8e0601a9a7b1db",//"https://images.unsplash.com/photo-1519818241092-7021b2ae8347?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM3Njk5fQ&s=f6e13ca0ed7052d0e9d27f3f1c93949d",
// 		"regular": "https://images.unsplash.com/photo-1512502600-e4aaa316250d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjI0MX0&s=a2f0c507d583aa3d2c8e0601a9a7b1db",//https://images.unsplash.com/photo-1519818241092-7021b2ae8347?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM3Njk5fQ&s=e975a4f519be305b0561dc012977d58a",
// 		"small": "https://images.unsplash.com/photo-1519818241092-7021b2ae8347?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM3Njk5fQ&s=a7cf5682603e22798a0b3b9501d8e71a",
// 		"thumb": "https://images.unsplash.com/photo-1519818241092-7021b2ae8347?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjM3Njk5fQ&s=c43648c6c12367749c514afa35961d47"
// 	},
// 	"links": {
// 		"self": "https://api.unsplash.com/photos/QljZXuy0LOo",
// 		"html": "https://unsplash.com/photos/QljZXuy0LOo",
// 		"download": "https://unsplash.com/photos/QljZXuy0LOo/download",
// 		"download_location": "https://api.unsplash.com/photos/QljZXuy0LOo/download"
// 	},
// 	"categories": [],
// 	"sponsored": false,
// 	"likes": 2,
// 	"liked_by_user": false,
// 	"current_user_collections": [],
// 	"slug": null,
// 	"user": {
// 		"id": "D8L4mozhmOY",
// 		"updated_at": "2018-06-27T11:15:22-04:00",
// 		"username": "david_bxl",
// 		"name": "David Bruyndonckx",
// 		"first_name": "David",
// 		"last_name": "Bruyndonckx",
// 		"twitter_username": null,
// 		"portfolio_url": "https://www.flickr.com/photos/142994369@N03/",
// 		"bio": null,
// 		"location": null,
// 		"links": {
// 			"self": "https://api.unsplash.com/users/david_bxl",
// 			"html": "https://unsplash.com/@david_bxl",
// 			"photos": "https://api.unsplash.com/users/david_bxl/photos",
// 			"likes": "https://api.unsplash.com/users/david_bxl/likes",
// 			"portfolio": "https://api.unsplash.com/users/david_bxl/portfolio",
// 			"following": "https://api.unsplash.com/users/david_bxl/following",
// 			"followers": "https://api.unsplash.com/users/david_bxl/followers"
// 		},
// 		"profile_image": {
// 			"small": "https://images.unsplash.com/profile-1485615511686-75b0ee42db12?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=9ab0b2d6f93d60b5b53666121c99c0e2",
// 			"medium": "https://images.unsplash.com/profile-1485615511686-75b0ee42db12?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=c8926f8323a911699f90c5d5bf2e6cbc",
// 			"large": "https://images.unsplash.com/profile-1485615511686-75b0ee42db12?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=aa1eabbb359db11edcca520a145de710"
// 		},
// 		"instagram_username": "d_a_v",
// 		"total_collections": 0,
// 		"total_likes": 8,
// 		"total_photos": 18
// 	},
// 	"exif": {
// 		"make": "Canon",
// 		"model": "Canon EOS 70D",
// 		"exposure_time": "1/50",
// 		"aperture": "4.5",
// 		"focal_length": "50.0",
// 		"iso": 500
// 	},
// 	"views": 23485,
// 	"downloads": 124
// };

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
      unsplashJson: null
      // focus: true
    }
  }
  componentWillMount(){
    this.checkIfEmptyUrl(this.props.url);
  }
  checkIfEmptyUrl(url){
    var self = this;
    if(!url || url.indexOf('about:blank') > -1){
      if(!self.state.unsplashJson)
      // 03a90259e6a6dde348e724508d1cf086a84bcad8553d990cd02aeee2485aa0e7
      get("https://api.unsplash.com/photos/random?client_id=fa60305aa82e74134cabc7093ef54c8e2c370c47e73152f72371c828daedfcd7").then(function(data){
        console.log(data);
        self.setState({
          unsplashJson: data
        });
      }).catch(function(e){
        console.log(e)
      })
    }
  }
  mouseOver(e){
    //e.target.style.border = '2px solid red'
    // this.setState({
    //   focus: true
    // })
    var self = this;
    // extensionAPI.operationOnAllViews({
    //   operation: 'videoMute'
    // })
    self.setState({
      selected: true
    },function(){
      // extensionAPI.operationOnView({
      //   frameId: self.state.frameId,
      //   uuid: self.props.uuid,
      //   operation: 'videoUnmute'
      // })
    });
  }
  mouseOut(e){
    this.setState({
      selected: false
    },function(){

    });
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
    // this.setState({
    //   selected: true
    // });
    // e.target.style.border = '2px solid red'
    var self = this;
    // extensionAPI.operationOnAllViews({
    //   operation: 'videoMute'
    // })
    extensionAPI.operationOnView({
      frameId: self.state.frameId,
      uuid: self.props.uuid,
      operation: 'videoUnmute'
    })
  }
  blur(e){
    // if(this.state.fullScreen===false){
    //   this.setState({
    //     selected: false
    //   });
    // }
  }
  doubleClick(e){
    if(this.state.url){
      this.enterFullscreen();
    }
    // if(this.state.url && this.state.url!=='about:blank'){
    //   this.enterFullscreen();
    // }
  }
  enterFullscreen(){
    var self = this;
    if(self.state.fullScreen === false) {
      extensionAPI.operationOnAllViews({
        operation: 'videoMute'
      })
      self.setState({
        fullScreen: true
      },function(){
        extensionAPI.operationOnView({
          frameId: self.state.frameId,
          uuid: self.props.uuid,
          operation: 'focus'
        })
        extensionAPI.operationOnView({
          frameId: self.state.frameId,
          uuid: self.props.uuid,
          operation: 'videoUnmute'
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
    // //console.log(this.state);
    // var uuidFromUrl = function(url){
    //   var str = '#uuid='
    //   return url.substr(url.indexOf(str)+str.length)
    // }
    if(m.command ==='pageExitFullScreen'){
      this.exitFullscreen();
    }
    // if(m.data.command === 'viewStartLoading'){
    //   var params = m.data.params;
    //   // //console.log(m.data);
    //   //
    //   // //console.log(this.state.url+'&&&' +this.state.frameId+'&&&' +params.frameId );
    //   if(uuidFromUrl(params.url) === uuidFromUrl(this.state.url) || params.frameId === this.state.frameId){
    //       this.setState({
    //         startLoad: true,
    //         frameId: params.frameId
    //       });
    //   }
    // }else if(m.data.command === 'viewEndLoading'){
    //   var params = m.data.params;
    //   // //console.log(m.data);
    //   // //console.log(this.state.url+'&&&' +this.state.frameId+'&&&' +params.frameId );
    //   if(uuidFromUrl(params.url) === uuidFromUrl(this.state.url) || params.frameId === this.state.frameId){
    //       this.setState({
    //         startLoad: false,
    //         frameId: params.frameId
    //       });
    //       // alert('end')
    //       // var url = params.url;
    //       // //console.log(params.url,'123213213213213');
    //       // //console.log(this.state.url,'123213213213213');
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
    // self._keyDownHander = function(event){
    //   if (event.keyCode == 27) {
    //     // console.log("keydown");
    //     extensionAPI.pageExitFullScreen();
    //     // self.exitFullscreen();
    //   }
    // };
    // window.addEventListener('keydown', self._keyDownHander,false);
    self._focusoutHander = function(){
      self.setState({
        selected: false
      })
    };
    window.addEventListener('focusout',self._focusoutHander,false);
    // window.addEventListener('message',this.messageListener.bind(this), false)
    extensionAPI.addPageExitFullScreenListener(this.messageListener.bind(this))


   const {intl} = this.props;


   var steps = [
     {
       title: intl.formatMessage({id: 'app.joyride.iframe.title'}),
       text: intl.formatMessage({id: 'app.joyride.iframe.text'}),
       selector: selector1,
       allowClicksThruHole: false,
       position: 'right',
       style: {

       }
     },
     {
       title: intl.formatMessage({id: 'app.joyride.menus.title'}),
       text: intl.formatMessage({id: 'app.joyride.menus.text'}),
       selector: menusSelector,
       allowClicksThruHole: false,
       position: 'bottom',
       style: {

       }
     },
     {
       title: intl.formatMessage({id: 'app.joyride.drawer.swtich.title'}),
       text: intl.formatMessage({id: 'app.joyride.drawer.swtich.text'}),
       selector: drawerSwitchSelector,
       allowClicksThruHole: false,
       position: 'top-left',
       style: {

       }
     }
   ];

   if (!getAlreadyJoyrideFlag(selector1 + menusSelector + drawerSwitchSelector)) {
     if (this.props.appAction && this.props.appAction.setJoyride) {
       this.props.appAction.setJoyride({
         type: 'continuous',
         steps: steps,
         callback: function(result) {
           if (result.type === 'finished') {
             setAlreadyJoyrideFlag(selector1 +  menusSelector + drawerSwitchSelector);
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
    // window.removeEventListener('message',this.messageListener.bind(this));
    extensionAPI.removePageExitFullScreenListener(this.messageListener.bind(this))

    // if(this._keyDownHander)window.removeEventListener('keydown',this._keyDownHander);
    if(this._focusoutHander)window.removeEventListener('focusout',this._focusoutHander);
  }
  componentWillReceiveProps(nextProps){
    // //console.log(nextProps,"123213213213213");
    if( nextProps.url && this.state.url !== nextProps.url){
      this.checkIfEmptyUrl(nextProps.url);
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
    //console.log('dragstart',this.props.uuid);
    e.nativeEvent.dataTransfer.setData('Text', this.props.uuid) // hack for firefox , or it will not trigger drag, dragend event
  }
  drag(e){
    // //console.log('drag',this.props.uuid);
  }
  dragEnd(e){
    // //console.log('dragend',this.props.uuid);
  }
  dragEnter(e){
    //console.log('dragenter',this.props.uuid);
    // //console.log(e.nativeEvent);
  }
  dragOver(e){
    // //console.log('dragover',this.props.uuid);
    e.preventDefault();
    e.nativeEvent.dataTransfer.dropEffect = "move"
  }
  dragLeave(e){
    //console.log('dragleave',this.props.uuid);
  }
  drop(e){
    //console.log('from:',e.nativeEvent.dataTransfer.getData("Text"));
    //console.log('drop',this.props.uuid);
    // //console.log(e.nativeEvent);
    // prevent default action (open as link for some elements)
    e.preventDefault();
    // // move dragged elem to the selected drop target
    // if ( event.target.className == "dropzone" ) {
    //     event.target.style.background = "";
    //     dragged.parentNode.removeChild( dragged );
    //     event.target.appendChild( dragged );
    // }
  }
  componentDidCatch(error, info) {
      // Display fallback UI
      //console.log(error,"componentDidCatch");
      //console.log(info,"componentDidCatch");
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
    // //console.log(fixTransformScale);
    // //console.log('scale('+fixTransformScale.x+',' + fixTransformScale.y + ')');
    var containerStyle = {
      borderStyle:'solid',
      borderColor: viewBorderColor,
    }
    if(isFullScreen){
      fixTransformScale ={
        x:1,
        y:1
      }
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
        key={uuid+"_container"}
        // draggable
        // onDragStart={this.dragStart.bind(this)}
        // onDrag={this.drag.bind(this)}
        // onDragEnd={this.dragEnd.bind(this)}
        // onDragEnter={this.dragEnter.bind(this)}
        // onDragOver={this.dragOver.bind(this)}
        // onDragLeave={this.dragLeave.bind(this)}
        // onDrop={this.drop.bind(this)}
        className='iframeBase' ref='container' tabIndex={self.props.tabIndex} style={{ ...self.props.style, ...containerStyle  }} onFocus={this.focus.bind(this)} onBlur={this.blur.bind(this)} onMouseEnter={this.mouseOver.bind(this)} onMouseLeave={this.mouseOut.bind(this)} onDoubleClick={this.doubleClick.bind(this)}>
        <div style={{ position: 'relative',width: '100%', height: '100%', boxSizing: 'border-box', pointerEvents: "auto" }}>
          {

            //sandbox='allow-scripts allow-forms allow-popups allow-same-origin allow-top-navigaion'
            // this.state.alreadyLoaded? null: <img src='images/loading.jpg' style={{position: 'absolute', top: 0,left: 0,width: '100%',height: '100%'}} />

            url && url.indexOf('about:blank') === -1 ?
            //   window.location.protocol === 'https:' && url.startsWith('http:')?
            //     <div className='vhCenter' style={{ position: 'relative',width: '100%', height: '100%', backgroundColor:'white'}}>
            //       <div style={{ WebkitUserSelect: 'none', color: 'grey', fontSize: 12, transform: 'scale('+fixTransformScale.x+',' + fixTransformScale.y + ')' }}>this web-resource not suppot https, still want to load, switch location-bar to http://viewport.group</div>
            //     </div>
            //     :
                <iframe sandbox='allow-scripts allow-forms allow-popups allow-same-origin' seamless src={resetUrlByRules(url)+'#uuid='+uuid} onLoad={() => { this.setState({startLoad:false}); }} onError={() => { this.setState({startLoad:false}); }} allowFullScreen frameBorder={0} style={{ backgroundColor: this.state.fullScreen?'white':'transparent', visibility :'visible', position: 'absolute', top: 0,left: 0,width: '100%',height: '100%',boxSizing: 'border-box', pointerEvents: isFullScreen?"auto":"none" }}/>
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



                 <div style={{ position: 'relative',width: '100%', height: '100%' }}>
                    {
                      self.state.unsplashJson ?
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',overflow: 'hidden' }}>
                        <img src={self.state.unsplashJson.urls.regular} style={{ width: '100%', height: 'auto' }}/>
                      </div>
                      :
                      null
                    }

                    <div  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                      <div className='withColumn' style={{ width: '100%',  height: '100%',color: 'white', padding: '5% 5%' }}>
                        <div style={{  height: 160,   textAlign:'left', overflow: 'hidden'}}>
                          <span style={{ lineHeight: '80px', fontSize: 80, display:'inline-block', padding: 40, backgroundColor: 'rgba(255,255,255,.5)', color:'black' }}>{self.props.title  ||"about:blank"}</span>
                        </div>
                        {
                          self.state.unsplashJson ?
                            <div className='withColumnLeftAuto' style={{ paddingTop: 10, paddingBottom: 10, fontSize: 20, overflow: 'hidden', opacity: 0.8}}>
                              {self.state.unsplashJson.description}
                            </div>
                            :
                            null
                        }
                        {
                          self.state.unsplashJson ?
                            <div style={{ height: 50, lineHeight: '50px', fontSize: 25, textAlign: 'right', overflow: 'hidden', opacity: 0.8}}>
                              <span style={{ cursor:'pointer'}} onClick={()=>{window.open("https://unsplash.com/@"+self.state.unsplashJson.user.username)}}>
                                <img
                                  src={self.state.unsplashJson.user && self.state.unsplashJson.user.profile_image? self.state.unsplashJson.user.profile_image.small:"null"}
                                  style={{ verticalAlign: 'bottom', width: 32, height: 32,borderRadius: '50%',boxShadow: '0 0 1px rgba(0,0,0,.5)',backgroundColor: 'rgba(0,0,0,.2)'}}
                                />
                                <span style={{verticalAlign: 'bottom',  marginLeft: 5, display:'inline-block', height: 32, lineHeight: '32px' }}>{self.state.unsplashJson.user.name}</span>
                              </span>
                            </div>
                            :
                            null
                        }
                      </div>
                    </div>
                 </div>

               : null
          }
          {
              self.state.fullScreen ? null:
              <div refs='mask' className='mask' style={{ position: 'absolute', top: 0,left: 0, width: '100%', height: '100%', pointerEvents: "auto" }} >
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
          {
            // <MiniControl parentFocus={self.state.selected} uuid={self.props.uuid} url={url} appAction={self.props.appAction}/>
          }
          {
            <MiniControl parentFocus={self.state.selected} uuid={self.props.uuid} url={url} appAction={self.props.appAction}
              fontSizeRadio={fixTransformScale.x}
              transform={'scale('+fixTransformScale.x+',' + fixTransformScale.y + ')'}
            />
          }
        </div>
      </div>,
      <div key={uuid+"_menu"}>
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
              //       //console.log('drag',e2);
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
                    console.log(self.state.frameId);
                    console.log(self.props.uuid);
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
