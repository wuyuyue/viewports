import { createAction } from 'redux-actions';
// import extensionAPI  from '../utils/extension'
// import * as request from '../utils/request';
const {
  TOAST,
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_MODAL,
  HIDE_MODAL,
  TOKEN_SET,
  TOKEN_BALANCE_SET,
  DRAWER_OPEN_SET,
  OPERATION_FAIL,
  SWITCH_VIEW_FULLSCREEN,
  QUERY_VIEW_LIST,
  QUERY_INSTALLED_TIME,
  ADD_VIEW,
  REMOVE_VIEW,
  REMOVE_ALL_VIEW,
  UPDATE_VIEW,
  RESET_ALL_VIEW,
  RESIZE_APP,
  SWITCH_LANGUAGE,
  SWITCH_VIEW_LAYOUT,
  SET_JOYRIDE,
  SHOW_TRANSACTION,
  HIDE_TRANSACTION,
  SWITCH_NETWORK
} = require('../redux/actionTypes').default;

export function switchNetwork(network){
  return {
    type: SWITCH_NETWORK,
    data: network
  }
}

export function setJoyride(data) {
  return {
    type: SET_JOYRIDE,
    data: data
  }
}

export function switchLanguage(language){
  return {
    type: SWITCH_LANGUAGE,
    data: language
  }
}

export function resize(appWidth,appHeight) {
  return {
    type: RESIZE_APP,
    data: {
      appWidth: appWidth,
      appHeight: appHeight
    }
  }
}
export function switchLayout(type) {
  return {
    type: SWITCH_VIEW_LAYOUT,
    data: type
  }
}

export const toast = createAction(TOAST, (text, timeout=2000, mid) => {
  if (!text) text = '网络异常，请稍后再试！';
  return {
    text,
    timeout,
    id: new Date().getTime(),
    mid: mid
  }
})

export function showLoading(maskParam = null, maskColor = null) {
  var maskTopPoz = null;
  if (typeof maskParam === 'string' && maskParam === 'MASK_ALL') {
    maskTopPoz = 0;
  } else if (typeof maskParam === 'string' && maskParam === 'MASK_BODY') {
    maskTopPoz = 44;
  } else if (typeof maskParam === 'number') {
    maskTopPoz = maskParam;
  } else {
    maskTopPoz = null;
  }
  return {
    type: SHOW_LOADING,
    maskTopPoz: maskTopPoz,
    maskColor: maskColor
  }
}

export function hideLoading() {
  return {
    type: HIDE_LOADING
  }
}

export function showModal(ui, uiProps) {
  return {
    type: SHOW_MODAL,
    data: {
      ui: ui,
      uiProps: uiProps
    }
  }
}
export function hideModal() {
  return {
    type: HIDE_MODAL
  }
}
export function tokenSet(token) {
  return {
    type: TOKEN_SET,
    data: token
  }
}
export function tokenBalanceSet(balance) {
  return {
    type: TOKEN_BALANCE_SET,
    data: balance
  }
}
export function showTransaction(data) {
  return {
    type: SHOW_TRANSACTION,
    data: data
  }
}
export function hideTransaction() {
  return {
    type: HIDE_TRANSACTION
  }
}

export function drawerOpenSet(drawerOpen) {
  return {
    type: DRAWER_OPEN_SET,
    data: drawerOpen
  }
}

export function switchViewFullscreen(viewFullscreen){
  return {
    type: SWITCH_VIEW_FULLSCREEN,
    data: viewFullscreen
  }
}
export function queryViewList(){
  return dispatch => {
    try{
      extensionAPI.queryViewList(function(data){
        // //console.log(data,'queryViewList');
        dispatch({
          type: QUERY_VIEW_LIST,
          data: data
        })
      });
      // if(global.chrome){
      //   chrome.runtime.sendMessage({command: "QUERY_VIEW_LIST"},function(json){
      //     dispatch({
      //       type: QUERY_VIEW_LIST,
      //       data: json.data // data.ruleList
      //     });
      //   });
      // }
    }catch(error){
       dispatch({
        type: OPERATION_FAIL,
        error: error
      });
    }
  }
}

export function listenUpdateViewList(){
  return dispatch => {
    try{
      // if(global.chrome){
      //   chrome.runtime.onMessage.addListener(function(m,sender){
      //     //if(sender.url !== global.location.href){
      //       if(m.command === 'UPDATE_VIEW_LIST'){
      //          dispatch({
      //           type: QUERY_VIEW_LIST,
      //           data: m.data // data.ruleList
      //         });
      //       }
      //     //}
      //   })
      // }
      extensionAPI.listenUpdateViewList(function(m){
        console.log(m);
        if(m.command === 'UPDATE_VIEW_LIST'){
          dispatch({
            type: QUERY_VIEW_LIST,
            data: m.data
          });
        } else if(m.command ==='UPDATE_INSTALLED_TIME'){
          dispatch({
            type: QUERY_INSTALLED_TIME,
            data: m.data
          })
        }

        // dispatch({
        //   type: QUERY_INSTALLED_TIME,
        //   data: installedTime
        // })
      });
    }catch(error){
      dispatch({
        type: OPERATION_FAIL,
        error: error
      });
    }
  }
}
export function removeView(uuid){
  return dispatch => {
    try{
      // if(global.chrome){
      //   chrome.runtime.sendMessage({command: "REMOVE_VIEW",params:{uuid: uuid}},function(json){
      //     dispatch({
      //       type: REMOVE_VIEW,
      //       data: json.data
      //     });
      //   });
      // }
      var params = {uuid:uuid}
      extensionAPI.removeView(params);
    }catch(error){
       dispatch({
        type: OPERATION_FAIL,
        error: error
      });
    }
  }
}
export function removeAllView(){
  return dispatch => {
    try{
      // if(global.chrome){
      //   chrome.runtime.sendMessage({command: "REMOVE_ALL_VIEW"},function(json){
      //     dispatch({
      //       type: REMOVE_ALL_VIEW,
      //       data: json.data
      //     });
      //   });
      // }
      extensionAPI.removeAllView();
    }catch(error){
       dispatch({
        type: OPERATION_FAIL,
        error: error
      });
    }
  }
}


const blankView = {
  url: 'about:blank',
  title: '',
  width: 400,
  height: 400/(window.innerWidth/window.innerHeight),
  depth: 1,
  x: 0,
  y: 0,
  z: 0
}
const uuidv1 = require('uuid/v1');

var fixViewSize = function(params){
    // //console.log(params);
    var result = {
      ...params
    };
    // //console.log(result,'1232321321323');
    if(result.width){
      result.width = parseFloat(result.width);
      result.width = parseFloat(result.width.toFixed(1))
    }
    if(result.height){
      result.height = parseFloat(result.height);
      result.height = parseFloat(result.height.toFixed(1))
    }
    if(result.depth){
      result.depth = parseFloat(result.depth);
      result.depth = parseFloat(result.depth.toFixed(1))
    }
    return result;
}
export function batchAddGivenViews(array){
  // //console.log(extensionAPI);
  return dispatch => {
    try{
      // var params= {
      //   ...blankView,
      //   uuid: uuidv1()
      // }
      var viewsArray = array.map(function(a){
        return fixViewSize({
          ...blankView,
          ...a,
          uuid: uuidv1()
        })
      });
      // //console.log(viewsArray);
      // if(global.chrome){
      //   var params= {
      //     ...blankView,
      //     uuid: uuidv1()
      //   }
      //   //console.log(params)
      //   chrome.runtime.sendMessage({command: "ADD_VIEW",params:params},function(json){
      //     //console.log(json);
      //     dispatch({
      //       type: ADD_VIEW,
      //       data: json.data
      //     });
      //   });
      // }
      extensionAPI.batchAddGivenViews(viewsArray);
    }catch(error){
       dispatch({
        type: OPERATION_FAIL,
        error: error
      });
    }
  }
}
export function addView(url='about:blank'){
  // //console.log(extensionAPI);
  return dispatch => {
    try{
      var params= {
        ...blankView,
        url: url,
        uuid: uuidv1()
      }
      // if(global.chrome){
      //   var params= {
      //     ...blankView,
      //     uuid: uuidv1()
      //   }
      //   //console.log(params)
      //   chrome.runtime.sendMessage({command: "ADD_VIEW",params:params},function(json){
      //     //console.log(json);
      //     dispatch({
      //       type: ADD_VIEW,
      //       data: json.data
      //     });
      //   });
      // }
      extensionAPI.addView(fixViewSize(params));
    }catch(error){
       dispatch({
        type: OPERATION_FAIL,
        error: error
      });
    }
  }
}
export function updateView(view){
  return dispatch => {
    try{
      // if(global.chrome){
      //   // dispatch(showLoading());
      //   chrome.runtime.sendMessage({command: "UPDATE_VIEW",params:view},function(json){
      //     // dispatch(hideLoading());
      //     //console.log(json);
      //     dispatch({
      //       type: UPDATE_VIEW,
      //       data: json.data
      //     });
      //   });
      // }

      var params=view;

      extensionAPI.updateView(fixViewSize(params));
    }catch(error){
       //dispatch(hideLoading());
       dispatch({
        type: OPERATION_FAIL,
        error: error
      });
    }
  }
}


// export function getBlanceOfEther(address){
//     //curl https://api.infura.io/v1/jsonrpc/mainnet/eth_getBalance?params=["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"]
//     // '{"jsonrpc":"2.0","method":"eth_getBalance","params": ["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "latest"],"id":1}'
//
//     // var params = {
//     //   jsonrpc: "2.0",
//     //   method: 'eth_getBalance',
//     //   params: window.encodeURI([address,"latest"]),
//     //   id: 1
//     // }
//     var url = "https://api.infura.io/v1/jsonrpc/mainnet/eth_getBalance?params=" + window.encodeURI(JSON.stringify(["0x"+address,"latest"]));
//     return dispatch => {
//       // dispatch(showLoading())
//       return  request.commonGet(url,{},{}).then(data => {
//           // //console.log(data);
//           // dispatch(hideLoading())
//           return data;
//         }).catch(error => {
//           // dispatch(hideLoading())
//           return false;
//         })
//     }
// }
// const {writeDataOnIpfs,readDataOnIpfs} = require('../utils/ipfs');

// const topic = 'ViewportGroup'
//
//
//
//
// var localMsgs;
// const node = new Ipfs({
//   repo: 'ipfs-ViewportGroup',
//   config: {
//     Addresses: {
//       Swarm: [
//         // '/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star'
//         '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
//       ]
//     }
//   }
//  })
//
//
// node.once('ready', () => {
//   node.id(function (err, identity) {
//    if (err) {
//      throw err
//    }
//    //console.log(identity,'identity')
//  })
//   var receiveMsg = function(msg){
//     //console.log(msg);
//       //console.log(msg.data.toString(),'12323232')
//       var receiveMsgs = JSON.parse(msg.data.toString().toString());
//       if(!localMsgs){
//         localMsgs = receiveMsgs;
//       } else {
//         Object.keys(receiveMsgs).forEach(function(account){
//           if(!localMsgs[account]){
//             localMsgs[account] = receiveMsgs[account]
//           }else {
//             if(localMsgs[account].timestamp < receiveMsgs[account].timestamp){
//               localMsgs[account] = receiveMsgs[account]
//             }
//           }
//         })
//       }
//   }
//   node.pubsub.subscribe(topic, receiveMsg)
//   // setTimeout(() => {
//   //   // unsubscribe a second later
//   //   node.pubsub.unsubscribe(topic, receiveMsg)
//   // }, 1000)
// })
//
// export function saveOnRemote(json,account){
//   return dispatch => {
//     //QmYNkok99pi6us72bZVw9z9itb7HZcRB15iqYRfQiGUAXD
//       if(!localMsgs){
//         localMsgs={};
//       }
//       localMsgs[account] = {
//         timestamp: new Date().getTime(),
//         data: json
//       }
//       alert(node.isOnline());
//       node.pubsub.publish(topic, node.types.Buffer.from(JSON.stringify(localMsgs)), (err) => {
//         //console.log(arguments,'abewrewr')
//         if (err) {
//           throw err
//         }
//         //console.log(localMsgs);
//         // msg was broadcasted
//       })
//
//       // var files = [{
//       //   path: `${directory}/${account}.json`,
//       //   // content could be a stream, a url etc
//       //   content: node.types.Buffer.from(json, 'utf8')
//       // }]
//       // node.files.add(files, (err, filesAdded) => {
//       //   if (err) {
//       //     return console.error('Error - ipfs files add', err, res)
//       //   }
//       //
//       //   filesAdded.forEach((file) => //console.log('successfully stored', file.hash))
//       // })
//
//     // dispatch(showLoading());
//     // writeDataOnIpfs(json,account).then(function(data){
//     //   dispatch(hideLoading());
//     //   //console.log(data);
//     // }).catch(function(error){
//     //   dispatch(hideLoading());
//     //   //console.log(error);
//     //   dispatch({
//     //    type: OPERATION_FAIL,
//     //    error: error
//     //  });
//     // })
//
//   }
// }
//
// export function loadOnRemote(account){
//   return dispatch => {
//
//     //console.log(localMsgs);
//     // const node = new Ipfs({ repo: 'ipfs-' + account })
//     // node.once('ready', () => {
//     //   // node.files.cat('QmbGQoYX4qPpoYSoBtxPXAHJHkJSefBrRDAeZmviFvUfRk', function (err, data) {
//     //   //   if (err) {
//     //   //     return console.error('Error - ipfs files cat', err, res)
//     //   //   }
//     //   //   //console.log(data.toString())
//     //   // })
//     // })
//
//     //QmYNkok99pi6us72bZVw9z9itb7HZcRB15iqYRfQiGUAXD
//     // dispatch(showLoading());
//     // readDataOnIpfs(hashStr).then(function(data){
//     //   // if(global.chrome){
//     //   //   var params= {
//     //   //     views: JSON.parse(data)
//     //   //   }
//     //   //   //console.log(params)
//     //   //   chrome.runtime.sendMessage({command: "RESET_ALL_VIEW",params:params},function(json){
//     //   //     // //console.log(json);
//     //   //     dispatch(hideLoading());
//     //   //     dispatch({
//     //   //       type: RESET_ALL_VIEW,
//     //   //       data: json.data
//     //   //     });
//     //   //     //console.log(data);
//     //   //   });
//     //   // }else{
//     //   //   dispatch(hideLoading());
//     //   // }
//     //
//     // }).catch(function(error){
//     //   dispatch(hideLoading());
//     //   //console.log(error);
//     //   dispatch({
//     //    type: OPERATION_FAIL,
//     //    error: error
//     //  });
//     // })
//
//   }
// }
