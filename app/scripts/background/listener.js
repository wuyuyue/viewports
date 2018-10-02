var extensionURL = browser.extension.getURL('')+"index.html";
// browser.browserAction.onClicked && browser.browserAction.onClicked.addListener(function(tab) {
//   var querySuccess = function(tabs){
//     // console.log(tabs);
//     if(tabs&&tabs.length>0){
//       var exist = false;
//       for(var i=0;i<tabs.length;i++){
//         var url = tabs[i].url;
//         if(url.endsWith('#/')){
//           exist = true;
//           browser.tabs.update(tabs[i].id,{active: true});
//           break;
//         }
//       }
//       if(!exist){
//         browser.tabs.create({
//           url: extensionURL
//         })
//       }
//
//     } else {
//       browser.tabs.create({
//         url: extensionURL
//       })
//     }
//   }
//   // console.log(process.env);
//   // console.log(process.env.VENDOR,"process.env.VENDOR");
//   if(process.env.VENDOR === 'edge'){
//
//     browser.tabs.query({ url: extensionURL },function(tabs){
//       querySuccess(tabs);
//     });
//   } else{
//     browser.tabs.query({ url: extensionURL }).then(querySuccess,(error)=>{console.log(`Error: ${error}`);});
//   }
// });

browser.browserAction.onClicked && browser.browserAction.onClicked.addListener(function(tab) {
  var querySuccess = function(windowInfoArray){
    // console.log(tabs);
    if(windowInfoArray&&windowInfoArray.length>0){
      var exist = false;
      var windowId = null;
      for(var i=0;i<windowInfoArray.length;i++){
        var tabs = windowInfoArray[i].tabs || [];
        for(var j=0;j<tabs.length;j++){
          var url = tabs[j].url;
          console.log(tabs[j]);
          if(url.indexOf(extensionURL)>-1){
            exist = true;
            windowId = windowInfoArray[i].id;
            break;
          }
        }
        // if(url.endsWith('#/')){
        //   exist = true;
        //   browser.tabs.update(tabs[i].id,{active: true});
        //   break;
        // }
      }
      if(!exist){
        browser.windows.create({

          state: 'maximized',
          type: "popup",
          // titlePreface: 'viewport',
          // top: 0,
          // left: 0,
          url: extensionURL
        })
      }else{
        browser.windows.update(
          windowId,
          {
            focused: true
          }
        );

      }

    } else {
      browser.windows.create({
        state: 'maximized',
        type: "popup",
        // titlePreface: 'viewport',
        // top: 0,
        // left: 0,
        url: extensionURL
      })
    }
  }
  // console.log(process.env);
  // console.log(process.env.VENDOR,"process.env.VENDOR");
  if(process.env.VENDOR === 'edge'){

    browser.windows.getAll({populate: true, windowTypes: ["popup"]  },function(windowInfoArray){
      querySuccess(tabs);
    });
  } else{
    browser.windows.getAll({ populate: true, windowTypes: ["popup"]  }).then(querySuccess,(error)=>{console.log(`Error: ${error}`);});
  }
});
