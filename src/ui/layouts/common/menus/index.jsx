import React from 'react';
import PropTypes from 'prop-types';
import { FloatAboveLayout } from '../../../components/layout'
import { ContextMenu, MenuItem, ContextMenuTrigger, SubMenu } from "react-contextmenu";
import extensionAPI  from '../../../utils/extension'

import { FormattedMessage } from 'react-intl';
class Menus extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){

  }
  render () {
    // const {intl}=this.props;
    // var defaultViewTitleLabe = intl.formatMessage({id: 'app.config.tabel.row.label.title'});

    return (
      <FloatAboveLayout style={{  width: 48, height: 48, right: 20, top: 20 }}>
        <ContextMenuTrigger id='AppMenus' attributes={{
            style:{
              width:'100%',
              height: '100%'
            }
          }}>
          <i className="appMenus addButton fas fa-plus-circle fa-3x" onClick={()=>{ this.props.appAction.addView()}}></i>
        </ContextMenuTrigger>
        <ContextMenu id='AppMenus' hideOnLeave={false}>
          <MenuItem onClick={(e)=>{
            extensionAPI.operationOnAllViews({
              operation: 'videoFullScreen'
            })
          }}>
            <i className="fas fa-window-maximize">
              <span style={{  marginLeft: 10, textAlign: 'left' }}>
                <FormattedMessage
                  id='app.scenes.menus.video.max'
                  description='app.scenes.menus.video.max'
                  defaultMessage='videosMax'
                  />
              </span>
            </i>
          </MenuItem>
          <MenuItem onClick={(e)=>{
            extensionAPI.operationOnAllViews({
              operation: 'videoExitFullScreen'
            })
          }}>
            <i className="fas fa-window-minimize">
              <span style={{  marginLeft: 10, textAlign: 'left' }}>
                <FormattedMessage
                  id='app.scenes.menus.video.min'
                  description='app.scenes.menus.video.min'
                  defaultMessage='videosMin'
                  />

              </span>
            </i>
          </MenuItem>
          <MenuItem onClick={(e)=>{
            extensionAPI.operationOnAllViews({
              operation: 'videoMute'
            })
          }}>
            <i className="fas fa-volume-down">
              <span style={{  marginLeft: 10, textAlign: 'left' }}>

                <FormattedMessage
                  id='app.scenes.menus.video.mute'
                  description='app.scenes.menus.video.mute'
                  defaultMessage='videosMute'
                  />
              </span>
            </i>
          </MenuItem>
          <MenuItem onClick={(e)=>{
            extensionAPI.operationOnAllViews({
              operation: 'videoUnmute'
            })
          }}>
            <i className="fas fa-volume-up">
              <span style={{  marginLeft: 10, textAlign: 'left' }}>
                <FormattedMessage
                  id='app.scenes.menus.video.unmute'
                  description='app.scenes.menus.video.unmute'
                  defaultMessage='videosUnmute'
                  />

              </span>
            </i>
          </MenuItem>
        </ContextMenu>
      </FloatAboveLayout>
    );
  }
}
import {injectIntl} from 'react-intl';

export default  injectIntl(Menus)
