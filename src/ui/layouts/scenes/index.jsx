import React from 'react';
import Layout from '../../components/layout'
import Content from '../../components/content'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router';
import * as appAction from '../appAction'
import Drawer from '../common/drawer/index.jsx'
import Menus from '../common/menus/index.jsx'

import AutoResponsive from 'autoresponsive-react'
import Resizable from 're-resizable'
import IframeBase from '../common/iframeBase/index.jsx';
import { FormattedMessage } from 'react-intl';

import {getAlreadyJoyrideFlag,setAlreadyJoyrideFlag} from '../../utils/storage'


class Scenes extends React.Component {
  constructor(props) {
    super(props);

    var initState = {
      fullscreen: false,
      uuid: null,
    }
    var data=props.app.views||[];
    data.forEach(function(d){
      initState[d.uuid] ={
        w: d.width,
        h: d.height
      }
    })
    // //console.log(initState,'arerweewrewrwe');
    this.state = initState

  }
  componentWillUnmount(){
    if(this._focusoutHander)window.removeEventListener('focusout',this._focusoutHander);
  }
  componentDidMount(){
    var self = this;
    const {intl} = this.props;

    var title = intl.formatMessage({id: 'app.scenes.title'});
    document.title = title;
    self._keyDownHander = function(event){
      if (event.keyCode == 27) {
        // console.log("keydown");
        extensionAPI.pageExitFullScreen();
        // self.exitFullscreen();
      }
    };
    window.addEventListener('keydown', self._keyDownHander,false);
    // window.document.querySelector('title').innerHTML = title

    //
    // var menusSelector = '.appMenus.addButton.fas.fa-plus-circle.fa-3x';
    // var drawerSwitchSelector = '.layout_drawer_menu svg';
    // var steps = [
    //   {
    //     title: intl.formatMessage({id: 'app.joyride.menus.title'}),
    //     text: intl.formatMessage({id: 'app.joyride.menus.text'}),
    //     selector: menusSelector,
    //     allowClicksThruHole: false,
    //     position: 'bottom',
    //     style: {
    //
    //     }
    //   },
    //   {
    //     title: intl.formatMessage({id: 'app.joyride.drawer.swtich.title'}),
    //     text: intl.formatMessage({id: 'app.joyride.drawer.swtich.text'}),
    //     selector: drawerSwitchSelector,
    //     allowClicksThruHole: false,
    //     position: 'top-left',
    //     style: {
    //
    //     }
    //   }
    // ];
    //
    // if (getAlreadyJoyrideFlag(".iframeBase") && !getAlreadyJoyrideFlag(menusSelector + drawerSwitchSelector)) {
    //   if (this.props.appAction && this.props.appAction.setJoyride) {
    //     this.props.appAction.setJoyride({
    //       type: 'continuous',
    //       steps: steps,
    //       callback: function(result) {
    //         if (result.type === 'finished') {
    //           setAlreadyJoyrideFlag( menusSelector + drawerSwitchSelector);
    //         }
    //       }
    //     });
    //   }
    // }

  }
  componentWillReceiveProps(nextProps){
    if(this.props.app.appLanguage!==nextProps.app.appLanguage){
      const {intl} = nextProps;
      var title = intl.formatMessage({id: 'app.scenes.title'});
      document.title = title;
    }
    var self = this;
    if(nextProps.app.views && nextProps.app.views.length ===0){
      var selector1 = '.iframeBase';
      var menusSelector = '.appMenus.addButton.fas.fa-plus-circle.fa-3x';
      var drawerSwitchSelector = '.layout_drawer_menu svg';
      if (!getAlreadyJoyrideFlag(selector1 + menusSelector + drawerSwitchSelector)) {
        if(typeof self._alreadyAdd === 'undefined'){
          if(self.props.app.appLanguage === "zh-CN"){
            self.props.appAction.addView("https://www.iqiyi.com")
            self.props.appAction.addView("https://bilibili.com")
            self.props.appAction.addView("https://www.youku.com")
          }else{
            self.props.appAction.addView("https://youtube.com")
          }

          self._alreadyAdd = true;
        }

      }
    }
  }
  switchFullscreen(fullscreen,uuid){
    var self = this;
    self.setState({
      fullscreen: fullscreen,
      uuid: uuid
    },function(){
      //self.props.switchFullscreen(fullscreen);
    })
  }

  render () {
    var self = this;
    var drawerStyle = {
      width: '300px',
      backgroundColor: 'black'
    }
    var drawer =  <Drawer appAction={this.props.appAction} app={this.props.app} location={this.props.location}/>

    var adjustData = this.props.app.views||[];
    // if(adjustData.length==0){
    //   adjustData= [
    //     {
    //       uuid: 'empty',
    //       width: 400,
    //       height: 300,
    //       depth: 1,
    //       x: 0,
    //       y: 0,
    //       z: 0
    //     }
    //   ]
    // }
    var num = adjustData.length;
    var layoutWidth = self.props.app.appWidth;
    var layoutHeight = self.props.app.appHeight;
    var viewLayout = self.props.app.viewLayout;


    return (
      <Layout drawer={drawer} drawerStyle={drawerStyle}>
        <Content style={{width:layoutWidth,height:layoutHeight}}>
          <div style={{ position: 'relative', width: layoutWidth, height: layoutHeight, overflowX:'hidden', overflowY: this.state.fullscreen === true || this.props.app.viewLayout==='2dGrid'?'hidden':'auto' }}>
            <AutoResponsive ref="container" itemMargin={12}  containerHeight={this.props.app.appHeight} transitionDuration={0.3}>

              {
                adjustData.map(function(d,i){
                  var style = {
                    width: layoutWidth,
                    height: layoutHeight,
                  };
                  var containerStyle={
                    ...style
                  }
                  var width =  parseFloat(d.width);
                  var height = parseFloat(d.height);

                  if(viewLayout==='2dFlow'){
                    width = self.state[d.uuid] && self.state[d.uuid].w  || parseFloat(d.width);
                    height = self.state[d.uuid] && self.state[d.uuid].h || parseFloat(d.height);
                    var gridItemWidthPercent = width / layoutWidth;
                    var gridItemHeightPercent = height / layoutHeight;

                    if(self.state.fullscreen && self.state.uuid === d.uuid){
                      style={
                        ...style,
                        position: 'fixed',
                        top: 0,
                        left: 0
                      }
                    }else{
                      style={
                        ...style,
                        transform: 'scale(' + gridItemWidthPercent + ',' + gridItemHeightPercent + ')',
                        transformOrigin: 'left top',
                      }
                    }
                  } else  if(viewLayout==='2dGrid'){
                    // for grid usage
                    var numSqurt = Math.max(2,Math.ceil(Math.sqrt(num))); // atleast 4*4 grid
                    var gridItemWidth = layoutWidth / numSqurt;
                    var gridItemHeight = layoutHeight * ( gridItemWidth / layoutWidth );
                    var gridItemWidthPercent = gridItemWidth / layoutWidth;
                    var gridItemHeightPercent = gridItemHeight / layoutHeight;

                    width = layoutWidth;
                    height = layoutHeight;

                    var row =  Math.floor(i / numSqurt);
                    var col = i % numSqurt;
                    containerStyle={
                      ...containerStyle,
                      position: 'unset',
                      width: 0,
                      height: 0,

                    }
                    if(self.state.fullscreen && self.state.uuid === d.uuid){
                      style={
                        ...style,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 9999
                      }
                    }else{

                      style = {
                        ...style,
                        transform: 'scale(' + gridItemWidthPercent + ',' + gridItemHeightPercent + ')',
                        borderWidth: 5,
                        position: 'absolute',
                        left: ( -(1-gridItemHeightPercent) / 2 + col * gridItemHeightPercent ) * 100 + '%',
                        top: (-(1-gridItemWidthPercent) / 2 + row * gridItemWidthPercent ) * 100 + '%',
                        //padding: '0.5%'
                        // marginTop: row>0?0.5:0,
                        // marginLeft: col>0?0.5:0
                      }
                    }


                  }

                  // //console.log(style);
                  var resizableOption={
                    key: d.uuid,
                    lockAspectRatio: false,
                    size: {
                       width:  width, height:  height
                    }
                  }
                  if(viewLayout==='2dFlow'){
                    resizableOption={
                      ...resizableOption,
                      onResizeStart: (e, direction, ref, d2) => {
                        var startState = {};
                        startState[d.uuid]={
                          w: d.width,
                          h: d.height
                        }
                        self.setState(startState)
                      },
                      onResize: (e, direction, ref, d2) => {
                        var newW = self.state[d.uuid].w + d2.width;
                        var newH = self.state[d.uuid].h + d2.height;
                        if(newW < 100){
                          newW = 100
                        }
                        if(newW > layoutWidth - 20){
                          newW = layoutWidth - 20
                        }
                        if(newH < 100){
                          newH = 100
                        }
                        if(newH > layoutHeight - 20){
                          newH = layoutHeight - 20
                        }
                        var newState = {};
                        newState[d.uuid]={
                          w: newW,
                          h: newH,
                        }
                        self.setState(newState)
                      },
                      onResizeStop: (e, direction, ref, d2) => {
                        // this.setState({
                        //   width: this.state.width + d.width,
                        //   height: this.state.height + d.height,
                        // });
                        var newW = self.state[d.uuid].w + d2.width;
                        var newH = self.state[d.uuid].h + d2.height;
                        if(newW < 100){
                          newW = 100
                        }
                        if(newW > layoutWidth - 20){
                          newW = layoutWidth - 20
                        }
                        if(newH < 100){
                          newH = 100
                        }
                        if(newH > layoutHeight - 20){
                          newH = layoutHeight - 20
                        }
                        var updateView = {
                          uuid: d.uuid,
                          width: newW,
                          height: newH
                        }
                        self.props.appAction.updateView(updateView);
                      }
                    }
                  }else  if(viewLayout==='2dGrid'){
                    resizableOption={
                      ...resizableOption,
                      style:{
                        ...containerStyle

                      },
                      maxWidth: 0,
                      minWidth: 0,
                      maxHeight: 0,
                      minHeight: 0,
                    }
                  }
                  //console.log(style);
                  //console.log(resizableOption);
                  return (
                    <Resizable
                        {
                          ...resizableOption
                        }


                        >
                        <IframeBase app={self.props.app} appAction={self.props.appAction} tabIndex={i+1} title={d.title || (i+1)} key={d.uuid} uuid={d.uuid} frameId={d.frameId} url={d.url} style={style} switchFullscreen={self.switchFullscreen.bind(self)}/>
                    </Resizable>

                  )
                  // return <Resize2dIframeWrapper tabIndex={i+1}  appAction={self.props.appAction} width={layoutWidth} height={layoutHeight} data={d} switchFullscreen={self.props.switchFullscreen.bind(self)}/>
                })
              }
            </AutoResponsive>
          </div>
        </Content>
        <Menus appAction={this.props.appAction} tip={!(this.props.app.views&& this.props.app.views.length>0)}/>
      </Layout>
    );
  }
}
import {injectIntl} from 'react-intl';

export default connect(state => ({ app: state.app }), dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
}))(injectIntl(Scenes))
