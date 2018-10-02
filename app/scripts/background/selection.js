
try{
  browser.contextMenus.create({
      id: "selectionPage",
      title: browser.i18n.getMessage("menuItemLoadSelectUrls"),
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
  if (info.menuItemId === "selectionPage") {
    if(process.env.VENDOR === 'edge'){
      browser.tabs.sendMessage(tab.id,{command: 'selectionPage'},{},()=>{});
    }else{
      browser.tabs.sendMessage(tab.id,{command: 'selectionPage'},{}).then(()=>{},()=>{})
    }
  }
});
