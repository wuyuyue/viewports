!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=258)}({14:function(e,t){var n,o,r=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{o="function"==typeof clearTimeout?clearTimeout:s}catch(e){o=s}}();var d,l=[],c=!1,u=-1;function m(){c&&d&&(c=!1,d.length?l=d.concat(l):u=-1,l.length&&f())}function f(){if(!c){var e=a(m);c=!0;for(var t=l.length;t;){for(d=l,l=[];++u<t;)d&&d[u].run();u=-1,t=l.length}d=null,c=!1,function(e){if(o===clearTimeout)return clearTimeout(e);if((o===s||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(e);try{o(e)}catch(t){try{return o.call(null,e)}catch(t){return o.call(this,e)}}}(e)}}function w(e,t){this.fun=e,this.array=t}function h(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new w(e,t)),1!==l.length||c||a(f)},w.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=h,r.addListener=h,r.once=h,r.off=h,r.removeListener=h,r.removeAllListeners=h,r.emit=h,r.prependListener=h,r.prependOnceListener=h,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},255:function(e,t,n){"use strict";var o=browser.extension.getURL("");browser.runtime.onMessage.addListener(function(e,t){if("selectionPage"===e.command){for(var n=window.getSelection().getRangeAt(0).commonAncestorContainer.querySelectorAll("a"),r=[],i=0;i<n.length;i++){console.log(n[i]);var s=n[i].innerText,a=n[i].getAttribute("href");r.push({title:s,url:a})}console.log(r),window.parent.postMessage({command:"SELECTION_FROM",data:r},o),window.parent.postMessage({command:"SELECTION_FROM",data:r},o)}return Promise.resolve("Dummy response to keep the console quiet")})},256:function(e,t,n){"use strict";(function(e){var t=browser.extension.getURL("");function n(e){e.preventDefault()&&e.stopPropagation(),window.location.assign(this.getAttribute("href"))}function o(e){for(var t=e.querySelectorAll("a"),o=0;o<t.length;o++){var r=t[o];r.getAttribute("href")&&(r.removeAttribute("target"),r.onclick=n)}}console.log("before onload"),window.onload=function(){console.log("enter onload",window.location.href),o(window.document)},window.addEventListener("keydown",function(e){27==e.keyCode&&(window.parent.postMessage({command:"pageExitFullScreen"},t),window.parent.postMessage({command:"pageExitFullScreen"},t))},!1),window.addEventListener("mousedown",function(e){o(window.document)},!1),browser.runtime.onMessage.addListener(function(e,n){return"pageExitFullScreen"===e.command&&(window.parent.postMessage({command:"pageExitFullScreen"},t),window.parent.postMessage({command:"pageExitFullScreen"},t)),Promise.resolve("Dummy response to keep the console quiet")});var r=void 0,i=void 0,s=void 0,a=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];2147483647!==e.style.zIndex&&(r={width:e.style.width,height:e.style.height,backgroundColor:e.style.backgroundColor,position:e.style.position,top:e.style.top,left:e.style.left,zIndex:e.style.zIndex,overflow:document.body.style.overflow},i=e.parentNode,s=e.nextSibling,document.body.style.display="none",document.body.style.overflow="hidden",document.documentElement.insertBefore(e,document.body),e.style.width=window.innerWidth+"px",e.style.height=window.innerHeight+"px",e.style.backgroundColor="black",e.style.position="fixed",e.style.top=0,e.style.left=0,e.style.zIndex=2147483647,t&&e.play())},d=function(e){var t=e.parentNode;2147483647!==e.style.zIndex&&(r={width:e.style.width,height:e.style.height,position:e.style.position,parentWidth:t.style.width,parentHeight:t.style.height,top:e.style.top,left:e.style.left,zIndex:e.style.zIndex,overflow:document.body.style.overflow},e.style.width=t.style.width=window.innerWidth+"px",e.style.height=t.style.height=window.innerHeight+"px",e.style.position="fixed",e.style.top=0,e.style.left=0,e.style.zIndex=2147483647,document.body.style.overflow="hidden")},l=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];document.body.style.overflow=r.overflow,document.body.style.display="block",i.insertBefore(e,s),e.style.width=r.width,e.style.height=r.height,e.style.backgroundColor=r.backgroundColor,e.style.position=r.position,e.style.top=r.top,e.style.left=r.left,e.style.zIndex=r.zIndex,t&&e.play()},c=function(e){if("2147483647"===e.style.zIndex){var t=e.parentNode;e.style.width=r.width,e.style.height=r.height,t.style.width=r.parentWidth,t.style.height=r.parentHeight,e.style.position=r.position,e.style.top=r.top,e.style.left=r.left,e.style.zIndex=r.zIndex,document.body.style.overflow=r.overflow}},u=function(e){if("focus"===e)window.focus();else if("reload"===e)window.location.reload();else if("videoFullScreen"===e){for(var t=document.querySelectorAll("video"),n=0;n<t.length;n++){var o=t[n];if("none"!==document.body.style.display&&o.getAttribute("src")&&"none"!==o.style.display){var r=o,i=function e(t){window.removeEventListener("resize",e),"none"!==o.style.display&&l(r)};o.addEventListener("ended",function e(t){var n=t.currentTarget;n.removeEventListener("ended",e),window.removeEventListener("resize",i),l(n),n.style.display="none"},!1),window.addEventListener("resize",i,!1),a(r);break}}if(0===t.length){if(0===(s=document.querySelectorAll("embed").length>0?document.querySelectorAll("embed"):document.querySelectorAll("object")).length&&(u=document.querySelectorAll("iframe")).length>0)for(n=0;n<u.length;n++)if((m=u[n]).clientWidth>400&&m.clientHeight>300&&"block"===m.style.display){s=[m];break}for(n=0;n<s.length;n++)if("2147483647"!==(f=s[n]).style.zIndex){i=function e(t){window.removeEventListener("resize",e),"2147483647"!==f.style.zIndex&&c(f)},window.addEventListener("resize",i,!1),d(f);break}}}else if("videoExitFullScreen"===e){for(t=document.querySelectorAll("video"),n=0;n<t.length;n++){o=t[n],l(r=o),window.addEventListener("resize",function(e){window.removeEventListener("resize",this),l(r)},!1);break}if(0===t.length){var s,u;if(0===(s=document.querySelectorAll("embed").length>0?document.querySelectorAll("embed"):document.querySelectorAll("object")).length&&(u=document.querySelectorAll("iframe")).length>0)for(n=0;n<u.length;n++){var m;if((m=u[n]).clientWidth>400&&m.clientHeight>300&&"block"===m.style.display){s=[m];break}}for(n=0;n<s.length;n++){var f=s[n];c(f),window.addEventListener("resize",function(e){window.removeEventListener("resize",this),c(f)},!1);break}}}else if("videoMute"===e)for(t=document.querySelectorAll("video"),n=0;n<t.length;n++)(o=t[n]).muted=!0;else if("videoUnmute"===e)for(t=document.querySelectorAll("video"),n=0;n<t.length;n++)(o=t[n]).muted=!1};browser.runtime.onMessage.addListener(function(t,n){if("OPERATION_ON_VIEW"===t.command||"OPERATION_ON_ALL_VIEWS"===t.command){var o=t.params.operation;"edge"===e.env.VENDOR&&"OPERATION_ON_VIEW"===t.command?window.location.href.indexOf(t.params.url)>-1&&u(o):u(o)}return Promise.resolve("Dummy response to keep the console quiet")}),window.addEventListener("message",function(t){t.source==window&&("OPERATION_ON_VIEW"!==t.data.command&&"OPERATION_ON_ALL_VIEWS"!==t.data.command||("edge"===e.env.VENDOR?browser.runtime.sendMessage({command:t.data.command,params:t.data.params},function(){}):browser.runtime.sendMessage({command:t.data.command,params:t.data.params}).then(function(){},function(){})))},!1)}).call(this,n(14))},257:function(e,t,n){"use strict";(function(e){var t=browser.extension.getURL("");browser.runtime.onMessage.addListener(function(e,n){return"UPDATE_VIEW_LIST"===e.command&&window.postMessage({type:"UPDATE_VIEW_LIST",data:e.data},t),Promise.resolve("Dummy response to keep the console quiet")}),window.addEventListener("message",function(t){t.source==window&&("QUERY_VIEW_LIST"===t.data.command?"edge"===e.env.VENDOR?browser.runtime.sendMessage({command:"QUERY_VIEW_LIST"},function(){}):browser.runtime.sendMessage({command:"QUERY_VIEW_LIST"}).then(function(){},function(){}):"ADD_VIEW"===t.data.command?"edge"===e.env.VENDOR?browser.runtime.sendMessage({command:"ADD_VIEW",params:t.data.params},function(){}):browser.runtime.sendMessage({command:"ADD_VIEW",params:t.data.params}).then(function(){},function(){}):"BATCH_ADD_GIVEN_VIEWS"===t.data.command?"edge"===e.env.VENDOR?browser.runtime.sendMessage({command:"BATCH_ADD_GIVEN_VIEWS",params:t.data.params},function(){}):browser.runtime.sendMessage({command:"BATCH_ADD_GIVEN_VIEWS",params:t.data.params}).then(function(){},function(){}):"UPDATE_VIEW"===t.data.command?"edge"===e.env.VENDOR?browser.runtime.sendMessage({command:"UPDATE_VIEW",params:t.data.params},function(){}):browser.runtime.sendMessage({command:"UPDATE_VIEW",params:t.data.params}).then(function(){},function(){}):"REMOVE_VIEW"===t.data.command?"edge"===e.env.VENDOR?browser.runtime.sendMessage({command:"REMOVE_VIEW",params:t.data.params},function(){}):browser.runtime.sendMessage({command:"REMOVE_VIEW",params:t.data.params}).then(function(){},function(){}):"REMOVE_ALL_VIEW"===t.data.command&&("edge"===e.env.VENDOR?browser.runtime.sendMessage({command:"REMOVE_ALL_VIEW"},function(){}):browser.runtime.sendMessage({command:"REMOVE_ALL_VIEW"}).then(function(){},function(){})))},!1)}).call(this,n(14))},258:function(e,t,n){"use strict";n(257),n(256),n(255)}});