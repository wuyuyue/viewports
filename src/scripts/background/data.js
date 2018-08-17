// var extensionURL = browser.extension.getURL('');
var extensionURL = browser.extension.getURL('') + "index.html";

// const host = '//viewport.group'
var views = [];
if(process.env.VENDOR === 'edge'){

}else{
  browser.runtime.onStartup.addListener(function () {
    console.log("extension started: " + Date.now());
    var getSuccess = function(items){
      views = items && items.views || [];
    }
    if(process.env.VENDOR === 'edge'){
      browser.storage.sync.get('views',getSuccess)
    }else{
      browser.storage.sync.get('views').then(getSuccess,(e)=>{console.log(e);views = [];});
    }

  });

}
browser.runtime.onInstalled.addListener(function () {
  console.log("extension installed: " + Date.now());
  var getSuccess = function(items){
      views = items && items.views || [];
      var querySuccess = function(tabs){
        for(var i=0;i<tabs.length;i++){
          browser.tabs.reload(tabs[i].id,{bypassCache: true})
        }
      }
      if(process.env.VENDOR === 'edge'){
        browser.tabs.query({ url: extensionURL}, querySuccess)
      }else{
        browser.tabs.query({ url: extensionURL }).then(querySuccess,(e)=>{console.log(e);});
      }

  }
  if(process.env.VENDOR === 'edge'){
    browser.storage.sync.get('views',getSuccess)
  }else{
    browser.storage.sync.get('views').then(getSuccess,(e)=>{console.log(e);views = [];});
  }
});
// // query is sync here
// browser.runtime.onMessage.addListener(function(request, sender){
//   if(sender.url.indexOf(extensionURL)>-1 || sender.url.indexOf(extensionURL)>-1){
//
//   }
// });
// for view add/delete/update/query operation

var update = function(views){
  var querySuccess = function(tabs){
    // console.log(tabs);
    for(var i=0;i<tabs.length;i++){
      if(process.env.VENDOR === 'edge'){
        browser.tabs.sendMessage(tabs[i].id,{'command':'UPDATE_VIEW_LIST',data: views},()=>{});
      }else{
        browser.tabs.sendMessage(tabs[i].id,{'command':'UPDATE_VIEW_LIST',data: views}).then(()=>{},()=>{})
      }
    }
  }
  if(process.env.VENDOR === 'edge'){
    browser.tabs.query({ url: extensionURL },querySuccess);
  }else{
    browser.tabs.query({ url: extensionURL }).then(querySuccess,(e)=>{console.log(e);});
  }

}
browser.runtime.onMessage.addListener(function(request, sender){
    // console.log(sender);
  if(sender.url.indexOf(extensionURL)>-1 || sender.url.indexOf(extensionURL)>-1){
    if(request.command === 'OPERATION_ON_VIEW') {
      var params = request.params;
      var frameId = params.frameId;
      if(process.env.VENDOR === 'edge'){ // Messaging a specific frame is not yet supported.
        browser.webNavigation.getAllFrames({
          tabId: sender.tab.id
        },function(frames){
          for(var i=0;i<frames.length;i++){
            var frame = frames[i];
            if(frame.frameId === frameId){
              var url = frame.url;
              var newRequest = {
                command: request.command,
                params: Object.assign({ url: url},params)
              }
              browser.tabs.sendMessage(sender.tab.id, newRequest,()=>{});
              break;
            }
          }
        });
      }else{
        browser.tabs.sendMessage(sender.tab.id, request, { frameId: frameId }).then(()=>{},()=>{})
      }
    }else if(request.command === 'OPERATION_ON_ALL_VIEWS') {
      if(process.env.VENDOR === 'edge'){
        browser.tabs.sendMessage(sender.tab.id, request,()=>{})
      }else{
        browser.tabs.sendMessage(sender.tab.id, request).then(()=>{},()=>{})
      }
    }else if(request.command === 'QUERY_VIEW_LIST') {
      update(views);
    } else{
      if(request.command === 'ADD_VIEW'){
          var view = request.params;
          views.push(view)
      } else if (request.command === 'BATCH_ADD_GIVEN_VIEWS'){
          views = views.concat(request.params)
      } else if (request.command === 'UPDATE_VIEW'){
          var view = request.params;
          var index = views.findIndex(function(value, index, arr) {
            return value.uuid === view.uuid;
          });
          views[index] = {
            ...views[index],
            ...view
          }
      } else if (request.command === 'REMOVE_VIEW'){
          var uuid = request.params.uuid;
          var index = views.findIndex(function(value, index, arr) {
            return value.uuid === uuid;
          });
          var removeItem = {
            ... views[index]
          }
          views.splice(index,1);
      } else if(request.command==='REMOVE_ALL_VIEW'){
          views = [];
      } else if (request.command === 'RESET_ALL_VIEW'){
          views = [].concat(request.params.views);
      }
      if(process.env.VENDOR === 'edge'){
        browser.storage.sync.set({'views':views},()=>{update(views);})
      }else{
        browser.storage.sync.set({'views':views}).then(()=>{update(views);},(e)=>{console.log(e);update(views);});
      }

    }
  }
  return Promise.resolve("Dummy response to keep the console quiet");
});

// for iframe inner url change which would cause url in views change(also hack for firefox would not trigger onload after 1st time)
var uuidFromUrl = function(url){
  var str = '#uuid='
  if(url.indexOf(str)===-1) return '';
  return url.substr(url.indexOf(str)+str.length);
}
var pureUrlFromUrl = function(url){
  var str = '#uuid=';
  if(url.indexOf(str)===-1) return url;
  return url.substr(0,url.indexOf(str))
}
browser.webNavigation.onBeforeNavigate.addListener(
  function(details) {
    if(details.parentFrameId !== -1 || details.frameId !== 0){
      var url = details.url;
      if(!url.startsWith('http://') && !url.startsWith('https://'))return;
      var uuid = uuidFromUrl(url);
      var pureUrl = pureUrlFromUrl(url);
      var index = views.findIndex(function(value, index, arr) {
        if(uuid){
          return value.uuid === uuid;
        } else {
          return value.frameId === details.frameId
        }

      });
      if(index >= 0 && index < views.length){

        if(uuid){
          views[index] = {
            ...views[index],
            frameId: details.frameId
          }
        } else{
          views[index] = {
            ...views[index],
            url: pureUrl
          }
        }
        if(process.env.VENDOR === 'edge'){
          browser.storage.sync.set({'views':views},()=>{update(views);})
        }else{
          browser.storage.sync.set({'views':views}).then(()=>{update(views);},(e)=>{console.log(e);update(views);});
        }
      }
    }
  }
);
browser.webNavigation.onErrorOccurred.addListener(
  function(details) {
    console.log(details);
  }
);


// menu in all page
browser.contextMenus.create({
    id: "pageAddToViewports",
    title: browser.i18n.getMessage("menuItemAddToViewports"),
    contexts: ["page"],
    enabled: true

});




const uuidv1 = require('uuid/v1');

var fixViewSize = function(params){
    // console.log(params);
    var result = {
      ...params
    };
    // console.log(result,'1232321321323');
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

import {generatValidUrl} from '../../ui/utils/url'
browser.contextMenus.onClicked.addListener(function(info, tab){
  if (info.menuItemId === "pageAddToViewports") {
    console.log(info);
    var params= {
      url: generatValidUrl(info.pageUrl),
      title: '',
      width: 400,
      height: 300,
      //height: 400/(window.innerWidth/window.innerHeight),
      depth: 1,
      x: 0,
      y: 0,
      z: 0,
      uuid: uuidv1()
    }
    var view = params;
    views.push(view)
    if(process.env.VENDOR === 'edge'){
      browser.storage.sync.set({'views':views},()=>{update(views);})
    }else{
      browser.storage.sync.set({'views':views}).then(()=>{update(views);},(e)=>{console.log(e);update(views);});
    }

  }
});
