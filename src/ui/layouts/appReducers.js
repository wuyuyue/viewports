const {
  TOAST,
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_MODAL,
  HIDE_MODAL,
  TOKEN_SET,
  TOKEN_BALANCE_SET,
  RESIZE_APP,
  SWITCH_LANGUAGE,
  DRAWER_OPEN_SET,
  QUERY_VIEW_LIST,
  QUERY_INSTALLED_TIME,
  ADD_VIEW,
  REMOVE_VIEW,
  REMOVE_ALL_VIEW,
  UPDATE_VIEW,
  RESET_ALL_VIEW,
  SWITCH_VIEW_FULLSCREEN,
  SWITCH_VIEW_LAYOUT,
  SET_JOYRIDE,
  SHOW_TRANSACTION,
  HIDE_TRANSACTION,
  SWITCH_NETWORK
} = require('../redux/actionTypes').default;

import { getSelectNetwork, getSelectAddress } from '../utils/storage'
import { api } from '../utils/config'
import ethereumAPI from '../utils/ethereumAPI'

const initialState = {
  toast: {
    text: null,
    timeout: 2000,
    id: null,
    mid: false
  },
  showLoading: false,
  maskTopPoz: null,
  maskColor: null,
  modal: {
    ui: null,
    uiProps: null
  },
  transaction: {
    show: false,
    data: null
  },
  drawerOpen: false,
  token: getSelectAddress() || null,
  tokenBalance: undefined,
  appWidth: 1024,
  appHeight: 800,
  appLanguage: navigator.language || 'en',
  appWeb3AllPrivders:  api.appWeb3AllPrivders,
  appWeb3Provider: getSelectNetwork().provider,
  appDonationAddress: api.appDonationAddress,
  appContractInfo: {
    address: getSelectNetwork().contractAddress,
    appId: new ethereumAPI.BN("0"),
    creationAppFee: null,
  },


  installedTime: null,
  licensed: false,
  views: null,
  viewFullscreen: false,
  viewLayout: '2dGrid',
  joyride: {
    key: 'joyride_' + new Date().getTime(),
    type: 'simple',
    autoStart: true,
    run: true,
    steps: [],
    step: 0,
    disableOverlay: true,
    showOverlay: true,
    showSkipButton: true,
    showStepsProgress: true
  }
};

function removeView(views, view) {
  var index;
  if (views && views.length >= 0) {
    for (var i = 0; i < views.length; i++) {
      if (views[i].uuid == view.uuid) {
        index = i
        break;
      }
    }
  }
  return views.splice(index, 1)
}

export default function (state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case TOAST:
      return {
        ...state,
        toast: {
          ...state.toast,
          ...payload
        }
      };
    case SHOW_LOADING:
      return {
        ...state,
        showLoading: true,
        maskTopPoz: action.maskTopPoz,
        maskColor: action.maskColor
      };
    case HIDE_LOADING:
      return {
        ...state,
        showLoading: false,
        maskTopPoz: null,
        maskColor: null
      };
    case SHOW_MODAL:
      return {
        ...state,
        modal: {
          ui: action.data.ui,
          uiProps: action.data.uiProps
        }
      };
    case HIDE_MODAL:
      return {
        ...state,
        modal: {
          ui: null,
          uiProps: null
        }
      };
    case SHOW_TRANSACTION:
      return {
        ...state,
        transaction: {
          show: true,
          data: {
            ...state.transaction.data,
            ...action.data
          }
        }
      };
    case HIDE_TRANSACTION:
      return {
        ...state,
        transaction: {
          show: false,
          data: null
        }
      };
    case SWITCH_NETWORK:
      return {
        ...state,
        appWeb3Provider: action.data.provider,
        appContractInfo: {
          ...state.appContractInfo,
          address: action.data.contractAddress,
          creationAppFee: null,
        }
      }
    case TOKEN_SET:
      return {
        ...state,
        token: action.data
      };
    case TOKEN_BALANCE_SET:
      return {
        ...state,
        tokenBalance: action.data
      }
    case RESIZE_APP:
      return {
        ...state,
        appWidth: action.data.appWidth,
        appHeight: action.data.appHeight
      };
    case SWITCH_LANGUAGE:
      return {
        ...state,
        appLanguage: action.data,
      }
    case DRAWER_OPEN_SET:
      return {
        ...state,
        drawerOpen: action.data
      }
    case SWITCH_VIEW_LAYOUT:
      return {
        ...state,
        viewLayout: action.data
      }
    case SWITCH_VIEW_FULLSCREEN:
      return {
        ...state,
        viewFullscreen: action.data
      }
    case QUERY_VIEW_LIST:
    case REMOVE_ALL_VIEW:
    case RESET_ALL_VIEW:
      return {
        ...state,
        views: action.data
      };
    case QUERY_INSTALLED_TIME:
      return {
        ...state,
        installedTime: action.data
      }
    case ADD_VIEW:
      return {
        ...state,
        views: state.views.concat([action.data])
      };
    case REMOVE_VIEW:
      return {
        ...state,
        views: removeView(state.views,action.data)
      }
    case SET_JOYRIDE:
      return {
        ...state,
        joyride: {
          ...state.joyride,
          key: 'joyride_' + new Date().getTime(),
          ...action.data
          // steps: action.data.steps,
          // callback: action.data.callback
        }
      };
    default :
      return state;
  }
}
