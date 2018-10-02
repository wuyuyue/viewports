// var extensionURL = browser.extension.getURL('');
var extensionURL = browser.extension.getURL('') + "index.html";

// const host = '//viewport.group'
var views = [];
var installedTime;
browser.runtime.onStartup && browser.runtime.onStartup.addListener(function () {
  console.log("extension started: " + Date.now());
  var getSuccess = function(items){
    views = items && items.views || [];
  }
  if(process.env.VENDOR === 'edge'){
    browser.storage.sync.get('views',getSuccess)

  }else{
    browser.storage.sync.get('views').then(getSuccess,(e)=>{console.log(e);views = [];});
    // browser.storage.sync.get('installedTime',getInstalledTimeSuccess)
  }
  var setInstalledTime= function(){
    installedTime = new Date().getTime();
    if(process.env.VENDOR === 'edge'){
      browser.storage.sync.set({'installedTime':installedTime},()=>{ console.log("browser.storage.sync.set");})
    }else{
      browser.storage.sync.set({'installedTime':installedTime}).then(()=>{console.log("browser.storage.sync.set");},(e)=>{console.log(e);});
    }
  }
  var getInstalledTimeSuccess = function(items){
    installedTime = items && items.installedTime;
    if(!installedTime){
      setInstalledTime();
    }
  }
  if(process.env.VENDOR === 'edge'){
    browser.storage.sync.get('installedTime',getInstalledTimeSuccess)
  }else{
    browser.storage.sync.get('installedTime').then(getInstalledTimeSuccess,(e)=>{console.log(e);setInstalledTime();});
    // browser.storage.sync.get('installedTime',getInstalledTimeSuccess)
  }

});

browser.runtime.onInstalled.addListener(function () {

  var setInstalledTime= function(){
    installedTime = new Date().getTime();
    if(process.env.VENDOR === 'edge'){
      browser.storage.sync.set({'installedTime':installedTime},()=>{ console.log("browser.storage.sync.set");})
    }else{
      browser.storage.sync.set({'installedTime':installedTime}).then(()=>{console.log("browser.storage.sync.set");},(e)=>{console.log(e);});
    }
  }
  var getInstalledTimeSuccess = function(items){
    installedTime = items && items.installedTime;
    console.log("extension installed: " +installedTime);
    if(!installedTime){
      setInstalledTime();
    }
  }
  if(process.env.VENDOR === 'edge'){
    browser.storage.sync.get('installedTime',getInstalledTimeSuccess)
  }else{
    browser.storage.sync.get('installedTime').then(getInstalledTimeSuccess,(e)=>{console.log(e);setInstalledTime();});
    // browser.storage.sync.get('installedTime',getInstalledTimeSuccess)
  }

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
    browser.tabs.query({ },querySuccess);
    // browser.tabs.sendMessage({'command':'UPDATE_VIEW_LIST',data: views},()=>{});
  }else{
    browser.tabs.query({ url: extensionURL }).then(querySuccess,(e)=>{console.log(e);});
  }

}

browser.runtime.onMessage.addListener(function(request, sender){
    // console.log(sender);
  var senderUrl = sender.url || sender.tab.url;
  if(senderUrl.indexOf(extensionURL)>-1 || senderUrl.indexOf(extensionURL)>-1){
    if(request.command === 'QUERY_INSTALLED_TIME'){
      // if(process.env.VENDOR === 'edge'){
      //   browser.tabs.sendMessage(sender,{'command':'UPDATE_INSTALLED_TIME', data: installedTime},()=>{});
      // }else{
      //   browser.tabs.sendMessage(sender,{'command':'UPDATE_INSTALLED_TIME', data: installedTime}).then(()=>{},()=>{})
      // }
      // return Promise.resolve(installedTime+"");
    }else{
      if(request.command === 'OPERATION_ON_VIEW') {
        var params = request.params;
        var frameId = params.frameId;
        var uuid = params.uuid;
        var queryScenesSuccess = function(tabs){
          // console.log(tabs);
          var exist = false;
          if(tabs&&tabs.length>0){
            for(var i=0;i<tabs.length;i++){
              var url = tabs[i].url;
              if(url.endsWith('#/')){
                exist = true;
                var tabId = tabs[i].id;
                var queryFrameSuccess = function(frames){
                  // console.log(frames);
                  for(var j=0;j<frames.length;j++){
                    var frame = frames[j];
                    // console.log(frame.url, uuid,frame.frameId,frame);
                    if(frame.parentFrameId===0 && frame.url.indexOf(uuid)>-1){
                      var frameId = frame.frameId;
                      if(process.env.VENDOR === 'edge'){ // Messaging a specific frame is not yet supported.
                        var newRequest = {
                           command: request.command,
                           params: Object.assign({ url: frame.url},params)
                         }
                        browser.tabs.sendMessage(tabId, newRequest,()=>{})
                      }else{
                        browser.tabs.sendMessage(tabId, request, { frameId: frameId }).then(()=>{},()=>{});
                      }
                      break;
                    }
                  }
                };
                if(process.env.VENDOR === 'edge'){ // Messaging a specific frame is not yet supported.
                  browser.webNavigation.getAllFrames({
                    tabId: tabId
                  },function(frames){
                    queryFrameSuccess(frames);
                  })
                }else{
                  browser.webNavigation.getAllFrames({ tabId: tabId }).then(queryFrameSuccess,(error)=>{console.log(`Error: ${error}`);});
                }
                break;

              }
            }
          }
          if(!exist){

          }
        }
        if(process.env.VENDOR === 'edge'){
          browser.tabs.query({ url: extensionURL },function(tabs){queryScenesSuccess(tabs);});
        } else{
          browser.tabs.query({ url: extensionURL }).then(queryScenesSuccess,(error)=>{console.log(`Error: ${error}`);});
        }
      }else if(request.command === 'OPERATION_ON_ALL_VIEWS' || request.command=== 'pageExitFullScreen') {
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
                  browser.tabs.sendMessage(tabId, request,()=>{})
                }else{
                  browser.tabs.sendMessage(tabId, request).then(()=>{},()=>{})
                }
                break;
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
      } else if(request.command === 'QUERY_VIEW_LIST') {
        update(views);
      } else {
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

  }
  return Promise.resolve(installedTime);
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
try{
  browser.contextMenus.create({
      id: "pageAddToViewports",
      title: browser.i18n.getMessage("menuItemAddToViewports"),
      contexts: ["page"],
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

// import {generatValidUrl} from '../../ui/utils/url'
browser.contextMenus.onClicked.addListener(function(info, tab){
  if (info.menuItemId === "pageAddToViewports") {
    // console.log(info);
    var params= {
      url: info.pageUrl,
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
