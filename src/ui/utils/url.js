exports.generatValidUrl = function(input){
  if(input==='about:blank')return input;
  var result = "";
  try{
    if(!input.startsWith("http://")&&!input.startsWith("https://")){
      result +="http://" + input;
    }else{
      result = input;
    }

  }catch(e){
    console.log(e);
    result = input;
  }
  return result;
}

const rules=[
  {
    from: /(https?:\/\/)v.youku.com\/v_show\/id_(.+?).html/,
    to: ['player.youku.com/embed/']
  },
  {
    from: /(https?:\/\/)www.bilibili.com\/video\/av(.+?)\//,
    to: ['player.bilibili.com/player.html?aid=']
  }
  // https://www.bilibili.com/video/av29418479/
 // player.bilibili.com/player.html?aid=29418479&cid=51405914&page=1
  // https://v.youku.com/v_show/id_XMzczNzk2ODMxMg==.html?spm=a2h0j.11185381.listitem_page1.5!19~A&&s=d790efbfbd0b355f11ef
  // http://player.youku.com/embed/XMzczNzk2ODMxMg==
]

exports.resetUrlByRules = function(url){
  var result = url;
  for(var i=0;i<rules.length;i++){
    var rule = rules[i];
    var matchResult = url.match(rule.from);
    if(matchResult){
      result = "";
      for(var j=1;j<matchResult.length;j++){
        result+=matchResult[j];
        if(j-1<rule.to.length){
          result+=rule.to[j-1]
        }
      }
      break;
    }
  }
  return result;

}
