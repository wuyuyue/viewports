var extensionURL = browser.extension.getURL('') + "index.html";

/***
  for remove header in iframe which might bring security problem, it should be depend on user
***/
var HEADERS_TO_STRIP_LOWERCASE = [
  'content-security-policy',
  'x-frame-options',
  'x-xss-protection'
];
browser.webRequest.onHeadersReceived.addListener(
  function(details) {
    var newHeaders =  details.responseHeaders.filter(function(header) {
      return HEADERS_TO_STRIP_LOWERCASE.indexOf(header.name.toLowerCase()) < 0;
    });
    return {
      responseHeaders: newHeaders
    };

    //
    // // if not with async , edge would cause redirect problem... because main-frame change not change in edge
    // var asyncSeHeaders = new Promise((resolve, reject) => {
    //     var newHeaders = details.responseHeaders;
    //     // only adjust headers loaded in given official-host
    //     // || ((details.originUrl!==undefined && details.originUrl.indexOf(host)>-1)||(details.initiator!==undefined && details.initiator.indexOf(host)>-1))
    //     if( details.parentFrameId !== -1 &&  ((details.originUrl!==undefined && details.originUrl.indexOf(host)>-1)||(details.initiator!==undefined && details.initiator.indexOf(host)>-1)) ){
    //       newHeaders = details.responseHeaders.filter(function(header) {
    //         return HEADERS_TO_STRIP_LOWERCASE.indexOf(header.name.toLowerCase()) < 0;
    //       })
    //     }
    //     resolve({responseHeaders: newHeaders});
    // });
    // return asyncSeHeaders;
  }, {
    urls: ["<all_urls>"],
    types: ["sub_frame"]
}, ["blocking", "responseHeaders"]);


// menu in iframe
try{
  browser.contextMenus.create({
      id: "pageExitFullScreen",
      title: browser.i18n.getMessage("menuItemExitFullScreen"),
      contexts: ["frame"],
      enabled: true
  },() => {
    const err = browser.runtime.lastError;
    if(err) {
      console.warn('Context menu error ignored:', err);
    }
  });
}catch(e){
  console.log(e);
}

browser.contextMenus.onClicked.addListener(function(info, tab){
  if (info.menuItemId === "pageExitFullScreen") {
    var queryScenesSuccess = function(tabs){
      // console.log(tabs);
      var exist = false;
      if(tabs&&tabs.length>0){
        for(var i=0;i<tabs.length;i++){
          var url = tabs[i].url;
          if(url.endsWith('#/')){
            exist = true;
            var tabId = tabs[i].id;
            if(process.env.VENDOR === 'edge'){
              browser.tabs.sendMessage(tabId,{command: 'pageExitFullScreen'},{  },()=>{})
            }else{
              browser.tabs.sendMessage(tabId,{command: 'pageExitFullScreen'},{}).then(()=>{},()=>{})
            }

          }
        }
      }
      if(!exist){

      }
    }
    if(process.env.VENDOR === 'edge'){
      browser.tabs.query({ url: extensionURL },function(tabs){
        queryScenesSuccess(tabs);
      });
    } else{
      browser.tabs.query({ url: extensionURL }).then(queryScenesSuccess,(error)=>{console.log(`Error: ${error}`);});
    }

  }
});

// iframe operation
// browser.runtime.onMessage.addListener(function(request, sender){
//     if(sender.url.indexOf('http:'+host)>-1||sender.url.indexOf('https:'+host)>-1){
//         if(request.command === 'OPERATION_ON_VIEW') {
//           var params = request.params;
//           var frameId = params.frameId;
//           if(process.env.VENDOR === 'edge'){
//             browser.tabs.sendMessage(sender.tab.id, request, { frameId: frameId },()=>{});
//           }else{
//             browser.tabs.sendMessage(sender.tab.id, request, { frameId: frameId }).then(()=>{},()=>{})
//           }
//         }else if(request.command === 'OPERATION_ON_ALL_VIEWS') {
//           if(process.env.VENDOR === 'edge'){
//             browser.tabs.sendMessage(sender.tab.id, request,()=>{})
//           }else{
//             browser.tabs.sendMessage(sender.tab.id, request).then(()=>{},()=>{})
//           }
//         }
//     }
//     return Promise.resolve("Dummy response to keep the console quiet");
// });
