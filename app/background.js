!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=263)}({131:function(e,n){for(var t=[],r=0;r<256;++r)t[r]=(r+256).toString(16).substr(1);e.exports=function(e,n){var r=n||0,o=t;return o[e[r++]]+o[e[r++]]+o[e[r++]]+o[e[r++]]+"-"+o[e[r++]]+o[e[r++]]+"-"+o[e[r++]]+o[e[r++]]+"-"+o[e[r++]]+o[e[r++]]+"-"+o[e[r++]]+o[e[r++]]+o[e[r++]]+o[e[r++]]+o[e[r++]]+o[e[r++]]}},132:function(e,n){var t="undefined"!=typeof crypto&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&msCrypto.getRandomValues.bind(msCrypto);if(t){var r=new Uint8Array(16);e.exports=function(){return t(r),r}}else{var o=new Array(16);e.exports=function(){for(var e,n=0;n<16;n++)0==(3&n)&&(e=4294967296*Math.random()),o[n]=e>>>((3&n)<<3)&255;return o}}},133:function(e,n,t){var r,o,s=t(132),i=t(131),a=0,c=0;e.exports=function(e,n,t){var u=n&&t||0,l=n||[],d=(e=e||{}).node||r,f=void 0!==e.clockseq?e.clockseq:o;if(null==d||null==f){var m=s();null==d&&(d=r=[1|m[0],m[1],m[2],m[3],m[4],m[5]]),null==f&&(f=o=16383&(m[6]<<8|m[7]))}var b=void 0!==e.msecs?e.msecs:(new Date).getTime(),g=void 0!==e.nsecs?e.nsecs:c+1,v=b-a+(g-c)/1e4;if(v<0&&void 0===e.clockseq&&(f=f+1&16383),(v<0||b>a)&&void 0===e.nsecs&&(g=0),g>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");a=b,c=g,o=f;var w=(1e4*(268435455&(b+=122192928e5))+g)%4294967296;l[u++]=w>>>24&255,l[u++]=w>>>16&255,l[u++]=w>>>8&255,l[u++]=255&w;var h=b/4294967296*1e4&268435455;l[u++]=h>>>8&255,l[u++]=255&h,l[u++]=h>>>24&15|16,l[u++]=h>>>16&255,l[u++]=f>>>8|128,l[u++]=255&f;for(var p=0;p<6;++p)l[u+p]=d[p];return n||i(l)}},14:function(e,n){var t,r,o=e.exports={};function s(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===s||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:s}catch(e){t=s}try{r="function"==typeof clearTimeout?clearTimeout:i}catch(e){r=i}}();var c,u=[],l=!1,d=-1;function f(){l&&c&&(l=!1,c.length?u=c.concat(u):d=-1,u.length&&m())}function m(){if(!l){var e=a(f);l=!0;for(var n=u.length;n;){for(c=u,u=[];++d<n;)c&&c[d].run();d=-1,n=u.length}c=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===i||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(n){try{return r.call(null,e)}catch(n){return r.call(this,e)}}}(e)}}function b(e,n){this.fun=e,this.array=n}function g(){}o.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)n[t-1]=arguments[t];u.push(new b(e,n)),1!==u.length||l||a(m)},b.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=g,o.addListener=g,o.once=g,o.off=g,o.removeListener=g,o.removeAllListeners=g,o.emit=g,o.prependListener=g,o.prependOnceListener=g,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},259:function(e,n,t){"use strict";(function(e){browser.contextMenus.create({id:"selectionPage",title:browser.i18n.getMessage("menuItemLoadSelectUrls"),contexts:["frame"],enabled:!0}),browser.contextMenus.onClicked.addListener(function(n,t){"selectionPage"===n.menuItemId&&("edge"===e.env.VENDOR?browser.tabs.sendMessage(t.id,{command:"selectionPage"},{},function(){}):browser.tabs.sendMessage(t.id,{command:"selectionPage"},{}).then(function(){},function(){}))})}).call(this,t(14))},260:function(e,n,t){"use strict";(function(e){browser.extension.getURL("");var n=["content-security-policy","x-frame-options","x-xss-protection"];browser.webRequest.onHeadersReceived.addListener(function(e){return{responseHeaders:e.responseHeaders.filter(function(e){return n.indexOf(e.name.toLowerCase())<0})}},{urls:["<all_urls>"],types:["sub_frame"]},["blocking","responseHeaders"]),browser.contextMenus.create({id:"pageExitFullScreen",title:browser.i18n.getMessage("menuItemExitFullScreen"),contexts:["frame"],enabled:!0}),browser.contextMenus.onClicked.addListener(function(n,t){"pageExitFullScreen"===n.menuItemId&&("edge"===e.env.VENDOR?browser.tabs.sendMessage(t.id,{command:"pageExitFullScreen"},{},function(){}):browser.tabs.sendMessage(t.id,{command:"pageExitFullScreen"},{}).then(function(){},function(){}))})}).call(this,t(14))},261:function(e,n,t){"use strict";(function(e){var n=browser.extension.getURL("")+"index.html";browser.browserAction.onClicked&&browser.browserAction.onClicked.addListener(function(t){var r=function(e){if(console.log(e),e&&e.length>0){for(var t=!1,r=0;r<e.length;r++)if(e[r].url.endsWith("#/")){t=!0,chrome.tabs.update(e[r].id,{active:!0});break}t||chrome.tabs.create({url:n})}else chrome.tabs.create({url:n})};"edge"===e.env.VENDOR?browser.tabs.query({url:n,currentWindow:!0},r):browser.tabs.query({url:n,currentWindow:!0}).then(r,function(e){console.log("Error: "+e)})})}).call(this,t(14))},262:function(e,n,t){"use strict";(function(e){var n=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},r=t(76),o=browser.extension.getURL("")+"index.html",s=[];"edge"===e.env.VENDOR||browser.runtime.onStartup.addListener(function(){console.log("extension started: "+Date.now());var n=function(e){s=e&&e.views||[]};"edge"===e.env.VENDOR?browser.storage.sync.get("views",n):browser.storage.sync.get("views").then(n,function(e){console.log(e),s=[]})}),browser.runtime.onInstalled.addListener(function(){console.log("extension installed: "+Date.now());var n=function(n){s=n&&n.views||[];var t=function(e){for(var n=0;n<e.length;n++)browser.tabs.reload(e[n].id,{bypassCache:!0})};"edge"===e.env.VENDOR?browser.tabs.query({url:o},t):browser.tabs.query({url:o}).then(t,function(e){console.log(e)})};"edge"===e.env.VENDOR?browser.storage.sync.get("views",n):browser.storage.sync.get("views").then(n,function(e){console.log(e),s=[]})});var i=function(n){var t=function(t){for(var r=0;r<t.length;r++)"edge"===e.env.VENDOR?browser.tabs.sendMessage(t[r].id,{command:"UPDATE_VIEW_LIST",data:n},function(){}):browser.tabs.sendMessage(t[r].id,{command:"UPDATE_VIEW_LIST",data:n}).then(function(){},function(){})};"edge"===e.env.VENDOR?browser.tabs.query({url:o},t):browser.tabs.query({url:o}).then(t,function(e){console.log(e)})};browser.runtime.onMessage.addListener(function(t,r){if(r.url.indexOf(o)>-1||r.url.indexOf(o)>-1)if("OPERATION_ON_VIEW"===t.command){var a=t.params,c=a.frameId;"edge"===e.env.VENDOR?browser.webNavigation.getAllFrames({tabId:r.tab.id},function(e){for(var n=0;n<e.length;n++){var o=e[n];if(o.frameId===c){var s=o.url,i={command:t.command,params:Object.assign({url:s},a)};browser.tabs.sendMessage(r.tab.id,i,function(){});break}}}):browser.tabs.sendMessage(r.tab.id,t,{frameId:c}).then(function(){},function(){})}else if("OPERATION_ON_ALL_VIEWS"===t.command)"edge"===e.env.VENDOR?browser.tabs.sendMessage(r.tab.id,t,function(){}):browser.tabs.sendMessage(r.tab.id,t).then(function(){},function(){});else if("QUERY_VIEW_LIST"===t.command)i(s);else{if("ADD_VIEW"===t.command){var u=t.params;s.push(u)}else if("BATCH_ADD_GIVEN_VIEWS"===t.command)s=s.concat(t.params);else if("UPDATE_VIEW"===t.command){u=t.params;var l=s.findIndex(function(e,n,t){return e.uuid===u.uuid});s[l]=n({},s[l],u)}else if("REMOVE_VIEW"===t.command){var d=t.params.uuid;l=s.findIndex(function(e,n,t){return e.uuid===d}),n({},s[l]),s.splice(l,1)}else"REMOVE_ALL_VIEW"===t.command?s=[]:"RESET_ALL_VIEW"===t.command&&(s=[].concat(t.params.views));"edge"===e.env.VENDOR?browser.storage.sync.set({views:s},function(){i(s)}):browser.storage.sync.set({views:s}).then(function(){i(s)},function(e){console.log(e),i(s)})}return Promise.resolve("Dummy response to keep the console quiet")}),browser.webNavigation.onBeforeNavigate.addListener(function(t){if(-1!==t.parentFrameId||0!==t.frameId){var r=t.url;if(!r.startsWith("http://")&&!r.startsWith("https://"))return;var o=function(e){var n="#uuid=";return-1===e.indexOf(n)?"":e.substr(e.indexOf(n)+n.length)}(r),a=function(e){return-1===e.indexOf("#uuid=")?e:e.substr(0,e.indexOf("#uuid="))}(r),c=s.findIndex(function(e,n,r){return o?e.uuid===o:e.frameId===t.frameId});c>=0&&c<s.length&&(s[c]=n({},s[c],o?{frameId:t.frameId}:{url:a}),"edge"===e.env.VENDOR?browser.storage.sync.set({views:s},function(){i(s)}):browser.storage.sync.set({views:s}).then(function(){i(s)},function(e){console.log(e),i(s)}))}}),browser.webNavigation.onErrorOccurred.addListener(function(e){console.log(e)}),browser.contextMenus.create({id:"pageAddToViewports",title:browser.i18n.getMessage("menuItemAddToViewports"),contexts:["page"],enabled:!0});var a=t(133);browser.contextMenus.onClicked.addListener(function(n,t){if("pageAddToViewports"===n.menuItemId){console.log(n);var o={url:(0,r.generatValidUrl)(n.pageUrl),title:"",width:400,height:300,depth:1,x:0,y:0,z:0,uuid:a()};s.push(o),"edge"===e.env.VENDOR?browser.storage.sync.set({views:s},function(){i(s)}):browser.storage.sync.set({views:s}).then(function(){i(s)},function(e){console.log(e),i(s)})}})}).call(this,t(14))},263:function(e,n,t){"use strict";t(262),t(261),t(260),t(259)},76:function(e,n,t){"use strict";n.generatValidUrl=function(e){if("about:blank"===e)return e;var n="";try{e.startsWith("http://")||e.startsWith("https://")?n=e:n+="http://"+e}catch(t){console.log(t),n=e}return n};var r=[{from:/(https?:\/\/)v.youku.com\/v_show\/id_(.+?).html/,to:["player.youku.com/embed/"]},{from:/(https?:\/\/)www.bilibili.com\/video\/av(.+?)\//,to:["player.bilibili.com/player.html?aid="]}];n.resetUrlByRules=function(e){for(var n=e,t=0;t<r.length;t++){var o=r[t],s=e.match(o.from);if(s){n="";for(var i=1;i<s.length;i++)n+=s[i],i-1<o.to.length&&(n+=o.to[i-1]);break}}return n}}});