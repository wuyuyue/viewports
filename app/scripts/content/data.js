var extensionURL = browser.extension.getURL('');

// browser.runtime.onMessage.addListener(function(m, sender){
//     if(m.command === 'UPDATE_VIEW_LIST'){
//       window.postMessage({
//         type: "UPDATE_VIEW_LIST",
//         data: m.data
//       },extensionURL);
//     }
//     return Promise.resolve("Dummy response to keep the console quiet");
// });

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;
  if (event.data.command === "QUERY_VIEW_LIST") {
    if(process.env.VENDOR === 'edge'){
      browser.runtime.sendMessage({command:"QUERY_VIEW_LIST"},()=>{})
    }else{
      browser.runtime.sendMessage({command:"QUERY_VIEW_LIST"}).then(()=>{},()=>{})
    }
        // .then(function(json){
        //   window.postMessage({
        //     type: "UPDATE_VIEW_LIST",
        //     data: json.data
        //   },host);
        // },function(e){
        //   console.log(e);
        // });
  }else if (event.data.command === "ADD_VIEW") {
      if(process.env.VENDOR === 'edge'){
        browser.runtime.sendMessage({command:"ADD_VIEW",params:event.data.params},()=>{});
      }else{
        browser.runtime.sendMessage({command:"ADD_VIEW",params:event.data.params}).then(()=>{},()=>{});
      }
  }else if (event.data.command === "BATCH_ADD_GIVEN_VIEWS") {
      if(process.env.VENDOR === 'edge'){
        browser.runtime.sendMessage({command:"BATCH_ADD_GIVEN_VIEWS",params:event.data.params},()=>{});
      }else{
        browser.runtime.sendMessage({command:"BATCH_ADD_GIVEN_VIEWS",params:event.data.params}).then(()=>{},()=>{});
      }
  }else if (event.data.command === "UPDATE_VIEW") {
    if(process.env.VENDOR === 'edge'){
      browser.runtime.sendMessage({command:"UPDATE_VIEW",params:event.data.params},()=>{});
    }else{
      browser.runtime.sendMessage({command:"UPDATE_VIEW",params:event.data.params}).then(()=>{},()=>{});
    }
  }else if (event.data.command === "REMOVE_VIEW") {
    if(process.env.VENDOR === 'edge'){
      browser.runtime.sendMessage({command:"REMOVE_VIEW",params:event.data.params},()=>{});
    }else{
      browser.runtime.sendMessage({command:"REMOVE_VIEW",params:event.data.params}).then(()=>{},()=>{});
    }
  }else if (event.data.command === "REMOVE_ALL_VIEW") {
    if(process.env.VENDOR === 'edge'){
      browser.runtime.sendMessage({command:"REMOVE_ALL_VIEW"},()=>{});
    }else{
      browser.runtime.sendMessage({command:"REMOVE_ALL_VIEW"}).then(()=>{},()=>{});
    }
  }
}, false);
