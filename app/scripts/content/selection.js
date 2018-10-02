// const host = '//viewport.group'
var extensionURL = browser.extension.getURL('');

browser.runtime.onMessage.addListener(function(m, sender){
  if(m.command ==='selectionPage'){
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var commonAncestorContainer= range.commonAncestorContainer;
    var children = commonAncestorContainer.querySelectorAll('a');
    var selectionViews=[];
    for(var i=0;i<children.length;i++){
      // console.log(children[i]);
      var title = children[i].innerText;
      var url = children[i].getAttribute('href')
      selectionViews.push({
        title: title,
        url: url
      })
    }
    // console.log(selectionViews);
    window.parent.postMessage({
      command: "SELECTION_FROM",
      data: selectionViews
    },extensionURL)
    window.parent.postMessage({
      command: "SELECTION_FROM",
      data: selectionViews
    },extensionURL)
  }
  return Promise.resolve("Dummy response to keep the console quiet");
})
