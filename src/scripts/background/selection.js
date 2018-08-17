browser.contextMenus.create({
    id: "selectionPage",
    title: browser.i18n.getMessage("menuItemLoadSelectUrls"),
    contexts: ["frame"],
    enabled: true
});
browser.contextMenus.onClicked.addListener(function(info, tab){
  if (info.menuItemId === "selectionPage") {
    if(process.env.VENDOR === 'edge'){
      browser.tabs.sendMessage(tab.id,{command: 'selectionPage'},{},()=>{});
    }else{
      browser.tabs.sendMessage(tab.id,{command: 'selectionPage'},{}).then(()=>{},()=>{})
    }
  }
});
