var extensionAPI={};
if(typeof  browser!=="undefined" && browser.extension){
  var extensionURL = browser.extension.getURL('');
  var host = extensionURL;
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
        console.log(m.command,'listenUpdateViewList');
          if(m.command === 'UPDATE_VIEW_LIST'){
              cb(m.data);
          }
          return Promise.resolve("Dummy response to keep the console quiet");
      });
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
    }

  }
}

window.extensionAPI = extensionAPI;
export default extensionAPI;
