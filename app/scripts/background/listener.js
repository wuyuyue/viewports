var extensionURL = browser.extension.getURL('')+"index.html";
browser.browserAction.onClicked && browser.browserAction.onClicked.addListener(function(tab) {
  var querySuccess = function(tabs){
    console.log(tabs);
    if(tabs&&tabs.length>0){
      var exist = false;
      for(var i=0;i<tabs.length;i++){
        var url = tabs[i].url;
        if(url.endsWith('#/')){
          exist = true;
          browser.tabs.update(tabs[i].id,{active: true});
          break;
        }
      }
      if(!exist){
        browser.tabs.create({
          url: extensionURL
        })
      }

    } else {
      browser.tabs.create({
        url: extensionURL
      })
    }
  }
  console.log(process.env);
  console.log(process.env.VENDOR,"process.env.VENDOR");
  if(process.env.VENDOR === 'edge'){

    browser.tabs.query({ url: extensionURL, currentWindow: true },function(tabs){
      querySuccess(tabs);
    });
  } else{
    browser.tabs.query({ url: extensionURL, currentWindow: true }).then(querySuccess,(error)=>{console.log(`Error: ${error}`);});
  }
});
