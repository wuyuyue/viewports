var extensionAPI={};

if(typeof  browser!=="undefined" && browser.extension){
  var extensionURL = browser.extension.getURL('');
  var host = extensionURL;
  var PAGE_EXIT_FULLSCREEN_CALLBACKS= [];
  browser.runtime.onMessage.addListener(function(m, sender){
      if(m.command === 'pageExitFullScreen'){
        console.log(m);
        for (var i = 0; i < PAGE_EXIT_FULLSCREEN_CALLBACKS.length; i++) {
          var f = PAGE_EXIT_FULLSCREEN_CALLBACKS[i];
          if (f && typeof f === 'function') {
            f(m);
          }
        }

      }
      // return Promise.resolve("Dummy response to keep the console quiet");
  });
  extensionAPI = {
    listenUpdateViewList: function(cb){
      // window.addEventListener("message", function(event) {
      //   // console.log(event.sourcce);
      //   // if (event.source != window)
      //   //   return;
      //   if(event.data.type === 'UPDATE_VIEW_LIST'){
      //     cb(event.data.data);
      //   }
      // })
      browser.runtime.onMessage.addListener(function(m, sender){
        // console.log(m.command,'listenUpdateViewList');
          // if(m.command === 'UPDATE_VIEW_LIST' || m.command ==='UPDATE_INSTALLED_TIME'){
            cb(m);
          // }
          return Promise.resolve("Dummy response to keep the console quiet");
      });
    },
    addPageExitFullScreenListener: function(func){
      if (func && typeof func === 'function') {
        PAGE_EXIT_FULLSCREEN_CALLBACKS.push(func);
      }
    },
    removePageExitFullScreenListener: function(func){
      if (func && typeof func === 'function') {
        for (var i = 0; i < PAGE_EXIT_FULLSCREEN_CALLBACKS.length; i++) {
          var f = PAGE_EXIT_FULLSCREEN_CALLBACKS[i];
          if (f && typeof f === 'function' && f === func) {
            PAGE_EXIT_FULLSCREEN_CALLBACKS.splice(i, 1);
          }
        }
      }
    },
    queryViewFrameId(params){
      if (browser &&  browser.runtime) { 
        if(process.env.VENDOR === 'edge'){
          browser.runtime.sendMessage({command: "QUERY_VIEW_FRAME_ID",params: params},()=>{});
        }else{
          browser.runtime.sendMessage({command: "QUERY_VIEW_FRAME_ID",params: params}).then((data)=>{},(e)=>{});
        }
      }
    },
    addView: function(params){
      if (browser &&  browser.runtime) { 
        if(process.env.VENDOR === 'edge'){
          browser.runtime.sendMessage({command: "ADD_VIEW",params: params},()=>{});
        }else{
          browser.runtime.sendMessage({command: "ADD_VIEW",params: params}).then((data)=>{},(e)=>{});
        }

      }
    },
    batchAddGivenViews: function(params){
      if (browser &&  browser.runtime) {
        if(process.env.VENDOR === 'edge'){
          browser.runtime.sendMessage({command: "BATCH_ADD_GIVEN_VIEWS",params: params},()=>{});
        }else{
          browser.runtime.sendMessage({command: "BATCH_ADD_GIVEN_VIEWS",params: params}).then((data)=>{},(e)=>{});
        }
 

      }
    },
    removeView: function(params){
      if (browser &&  browser.runtime) { 
        if(process.env.VENDOR === 'edge'){
          browser.runtime.sendMessage({command: "REMOVE_VIEW",params: params},()=>{});
        }else{
          browser.runtime.sendMessage({command: "REMOVE_VIEW",params: params}).then((data)=>{},(e)=>{});
        }
 
      }
    },
    updateView: function(params){
      if (browser &&  browser.runtime) { 
        if(process.env.VENDOR === 'edge'){
          browser.runtime.sendMessage({command: "UPDATE_VIEW",params: params},()=>{});
        }else{
          browser.runtime.sendMessage({command: "UPDATE_VIEW",params: params}).then((data)=>{},(e)=>{});
        }
      }
    },
    queryViewList: function(cb){
      if (browser &&  browser.runtime) { 
        if(process.env.VENDOR === 'edge'){
          browser.runtime.sendMessage({command: "QUERY_VIEW_LIST"},()=>{});
        }else{
          browser.runtime.sendMessage({command: "QUERY_VIEW_LIST"}).then((data)=>{},(e)=>{});
        }
      }
    },

    removeAllView: function(){
      if (browser &&  browser.runtime) { 
        if(process.env.VENDOR === 'edge'){
          browser.runtime.sendMessage({command: "REMOVE_ALL_VIEW"},()=>{});
        }else{
          browser.runtime.sendMessage({command: "REMOVE_ALL_VIEW"}).then((data)=>{},(e)=>{});
        }
      }
    },
    operationOnView(params){
      if (browser &&  browser.runtime) { 
        if(process.env.VENDOR === 'edge'){
          browser.runtime.sendMessage({command: "OPERATION_ON_VIEW",params: params},()=>{});
        }else{
          browser.runtime.sendMessage({command: "OPERATION_ON_VIEW",params: params}).then((data)=>{},(e)=>{});
        }
      }
    },
    operationOnAllViews(params){
      if (browser &&  browser.runtime) { 
        if(process.env.VENDOR === 'edge'){
          browser.runtime.sendMessage({command: "OPERATION_ON_ALL_VIEWS",params: params},()=>{});
        }else{
          browser.runtime.sendMessage({command: "OPERATION_ON_ALL_VIEWS",params: params}).then((data)=>{},(e)=>{});
        }
      }
    },
    pageExitFullScreen(){
      if (browser &&  browser.runtime) { 
        if(process.env.VENDOR === 'edge'){
          browser.runtime.sendMessage({command: "pageExitFullScreen"},()=>{});
        }else{
          browser.runtime.sendMessage({command: "pageExitFullScreen"}).then((data)=>{},(e)=>{});
        }
      }
    },
    // listenInstalledTime: function(cb){
    //   browser.runtime.onMessage.addListener(function(m, sender){
    //       if(m.command === 'UPDATE_INSTALLED_TIME'){
    //           cb(m.data);
    //       }
    //       return Promise.resolve("Dummy response to keep the console quiet");
    //   });
    // },
    getInstalledTime(cb){
      if (browser &&  browser.runtime) { 
        if(process.env.VENDOR === 'edge'){
          browser.runtime.sendMessage({command: "QUERY_INSTALLED_TIME"},(data)=>{
            cb(data)}
          );
        }else{
          browser.runtime.sendMessage({command: "QUERY_INSTALLED_TIME"}).then(
            (data)=>{
              console.log(data,"QUERY_INSTALLED_TIME");
              // alert(parseInt(data));
              cb(data)
            }
            ,(e)=>{
              console.log(e);
              cb(new Date().getTime())
            });
        }
        // return Promise.resolve("Dummy response to keep the console quiet");
      }
    }

  }
}

window.extensionAPI = extensionAPI;

window.onerror=function(sMsg,sUrl,sLine){
  console.log(sMsg);
  console.log(sUrl);
  console.log(sLine);
}
window.onbeforeunload = function (e) {
  if(window.location.hash =='#/'){
    e = e || window.event;
    if (e) {
      // console.log(e)
      e.returnValue = 'Close';
      // console.log(e.returnValue);
    }
    // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    return  'Close';
  }
};

export default extensionAPI;
