var extensionURL = browser.extension.getURL('');
function aElementClickHandler(e){
  e.preventDefault()&&e.stopPropagation();
  window.location.assign(this.getAttribute('href'));
}
function resetAElements(document){
  var aElements = document.querySelectorAll('a');
  for(var i=0;i<aElements.length;i++){
    var aElement = aElements[i];
    var url = aElement.getAttribute('href');
    if(url){
      aElement.removeAttribute('target');
      aElement.onclick = aElementClickHandler;
    }
  }
}
console.log('before onload');
window.onload=function(){
  console.log('enter onload',window.location.href);
  resetAElements(window.document);
}
window.addEventListener('keydown',function(event){
  if (event.keyCode == 27) {
      window.parent.postMessage({command: 'pageExitFullScreen'}, extensionURL);
      window.parent.postMessage({command: 'pageExitFullScreen'}, extensionURL);
  }
}, false);
window.addEventListener('mousedown',function(event){
  resetAElements(window.document);
}, false)
browser.runtime.onMessage.addListener(function(m, sender){
  if(m.command ==='pageExitFullScreen'){
      window.parent.postMessage({command: 'pageExitFullScreen'}, extensionURL);
      window.parent.postMessage({command: 'pageExitFullScreen'}, extensionURL);
  }
  return Promise.resolve("Dummy response to keep the console quiet");
})

// for iframe operation

var preStyle = undefined;
var preParent = undefined;
var preSibling = undefined;

var videoMax = function(videoContainer,playFlag=true){
  if(videoContainer.style.zIndex!==2147483647){
    preStyle = {
      width: videoContainer.style.width,
      height: videoContainer.style.height,
      backgroundColor: videoContainer.style.backgroundColor,
      position: videoContainer.style.position,
      top: videoContainer.style.top,
      left: videoContainer.style.left,
      zIndex: videoContainer.style.zIndex,
      overflow: document.body.style.overflow
    };
    preParent = videoContainer.parentNode;
    preSibling = videoContainer.nextSibling;
    document.body.style.display='none';
    document.body.style.overflow='hidden';
    document.documentElement.insertBefore(videoContainer,document.body)
    videoContainer.style.width=window.innerWidth+'px';
    videoContainer.style.height=window.innerHeight+'px';
    videoContainer.style.backgroundColor='black';
    videoContainer.style.position='fixed';
    videoContainer.style.top=0;
    videoContainer.style.left=0;
    videoContainer.style.zIndex=2147483647;
    if(playFlag){
      videoContainer.play();
    }
  }
}
var flashMax=function(flash){
  var flashContainer=flash.parentNode;
  if(flash.style.zIndex!==2147483647){
    preStyle = {
      width: flash.style.width,
      height: flash.style.height,
      position: flash.style.position,
      parentWidth: flashContainer.style.width,
      parentHeight: flashContainer.style.height,
      top: flash.style.top,
      left: flash.style.left,
      zIndex: flash.style.zIndex,
      overflow: document.body.style.overflow,
    };
    flash.style.width = flashContainer.style.width = window.innerWidth+'px';
    flash.style.height = flashContainer.style.height = window.innerHeight+'px';
    flash.style.position='fixed';
    flash.style.top=0;
    flash.style.left=0;
    flash.style.zIndex=2147483647;

    document.body.style.overflow = 'hidden';

  }
}
var videoRecover = function(videoContainer,playFlag=true){
  document.body.style.overflow = preStyle.overflow;
  document.body.style.display = 'block';
  preParent.insertBefore(videoContainer,preSibling);
  videoContainer.style.width = preStyle.width;
  videoContainer.style.height = preStyle.height;
  videoContainer.style.backgroundColor = preStyle.backgroundColor;
  videoContainer.style.position = preStyle.position;
  videoContainer.style.top = preStyle.top;
  videoContainer.style.left = preStyle.left;
  videoContainer.style.zIndex = preStyle.zIndex;
  if(playFlag){
    videoContainer.play();
  }
}
var flashRecover = function(flash){
  if(flash.style.zIndex === '2147483647'){
    var flashContainer=flash.parentNode;

    flash.style.width = preStyle.width;
    flash.style.height = preStyle.height;
    flashContainer.style.width = preStyle.parentWidth;
    flashContainer.style.height = preStyle.parentHeight;

    flash.style.position = preStyle.position;
    flash.style.top = preStyle.top;
    flash.style.left = preStyle.left;
    flash.style.zIndex = preStyle.zIndex;
    document.body.style.overflow = preStyle.overflow;
  }

}
// var href = window.location.href;
var response = function(operation){
  if(operation === 'focus'){
    window.focus();
  }else if(operation === 'reload'){
    window.location.reload();
  } else if(operation === 'videoFullScreen'){
    var videos = document.querySelectorAll('video');
    for(var i=0;i<videos.length;i++){
      var video = videos[i];
      if(document.body.style.display !== 'none' && video.getAttribute('src') && video.style.display !=='none'){
        var videoContainer = video;
        var resizeCb = function(e){
          window.removeEventListener('resize',resizeCb);
          if(video.style.display !=='none'){
            videoRecover(videoContainer);
          }
        }
        var endCb = function(e){
          var srcElement = e.currentTarget;
          srcElement.removeEventListener('ended',endCb)
          window.removeEventListener('resize',resizeCb)
          videoRecover(srcElement);
          srcElement.style.display = 'none';
        }

        video.addEventListener('ended',endCb,false);
        window.addEventListener('resize',resizeCb,false);
        videoMax(videoContainer);
        break;
      }
    }
    if(videos.length === 0){
      var flashes =  document.querySelectorAll('embed').length > 0 ? document.querySelectorAll('embed') : document.querySelectorAll('object');
      if(flashes.length === 0){
        var iframeVideos = document.querySelectorAll('iframe');
        if(iframeVideos.length>0){
          for(var i=0;i<iframeVideos.length;i++){
            var iframeVideo = iframeVideos[i];
            if(iframeVideo.clientWidth > 400 && iframeVideo.clientHeight > 300 && iframeVideo.style.display === 'block'){
              flashes = [iframeVideo];
              break;
            }
          }
        }
      }
      for(var i=0;i<flashes.length;i++){
        var flash = flashes[i];
        if(flash.style.zIndex !=='2147483647'){
          var resizeCb = function(e){
            window.removeEventListener('resize',resizeCb);
            if(flash.style.zIndex !=='2147483647'){
              flashRecover(flash);
            }
          }

          window.addEventListener('resize',resizeCb,false);
          flashMax(flash);
          break;
        }
      }
    }
  }else if(operation ==='videoExitFullScreen'){
      var videos = document.querySelectorAll('video');
      for(var i=0;i<videos.length;i++){
        var video = videos[i];
        var videoContainer = video;
        videoRecover(videoContainer);
        window.addEventListener('resize',function(e){
          window.removeEventListener('resize',this)
          videoRecover(videoContainer);
        },false)
        break;
      }
      if(videos.length === 0){
        var flashes =  document.querySelectorAll('embed').length > 0 ? document.querySelectorAll('embed') : document.querySelectorAll('object');
        if(flashes.length === 0){
          var iframeVideos = document.querySelectorAll('iframe');
          if(iframeVideos.length>0){
            for(var i=0;i<iframeVideos.length;i++){
              var iframeVideo = iframeVideos[i];
              if(iframeVideo.clientWidth > 400 && iframeVideo.clientHeight > 300 && iframeVideo.style.display === 'block'){
                flashes = [iframeVideo];
                break;
              }
            }
          }
        }
        for(var i=0;i<flashes.length;i++){
          var flash = flashes[i];
          flashRecover(flash);
          window.addEventListener('resize',function(e){
            window.removeEventListener('resize',this)
            flashRecover(flash);
          },false)
          break;
        }
      }
  }else if(operation === 'videoMute'){
    var videos = document.querySelectorAll('video');
    for(var i=0;i<videos.length;i++){
      var video = videos[i];
      video.muted = true;
    }
  }else if(operation === 'videoUnmute'){
    var videos = document.querySelectorAll('video');
    for(var i=0;i<videos.length;i++){
      var video = videos[i];
      video.muted = false;
    }
  }
}
browser.runtime.onMessage.addListener(function(m, sender){
  if(m.command === 'OPERATION_ON_VIEW' || m.command === 'OPERATION_ON_ALL_VIEWS'){
    var operation = m.params.operation;

    if(process.env.VENDOR === 'edge' && m.command === 'OPERATION_ON_VIEW'){
      if(window.location.href.indexOf(m.params.url)>-1){
        response(operation);
      }
    } else{
      response(operation);
    }

  }
  return Promise.resolve("Dummy response to keep the console quiet");
})

window.addEventListener("message", function(event) {
  if (event.source != window)
    return;
  if (event.data.command === "OPERATION_ON_VIEW" || event.data.command === "OPERATION_ON_ALL_VIEWS") {
    if(process.env.VENDOR === 'edge'){
      browser.runtime.sendMessage({command:event.data.command,params:event.data.params},()=>{});
    }else{
      browser.runtime.sendMessage({command:event.data.command,params:event.data.params}).then(()=>{},()=>{});
    }
  }
}, false);
