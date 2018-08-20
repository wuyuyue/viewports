const split = ' || '
const featureItems = [
  {
    type: 'img',
    title: 'Add View to the stage',
    url: 'images/features/add_view.png'
  },
  {
    type: 'img',
    title: 'Control meida in selection-view by double-left-click on it',
    url: 'images/features/control_media_in_view.png'
  },
  {
    type: 'img',
    title: 'Set the url for your selection view by right click on it',
    url: 'images/features/set_view.png'
  },
  {
    type: 'img',
    title: 'Remove/Reload the view from stage by right click on it',
    url: 'images/features/remove_view.png'
  },
  {
    type: 'img',
    title: 'Max the view  by double-left-click on it',
    url: 'images/features/max_view.png'
  },

  {
    type: 'img',
    title: 'More Layout',
    url: 'images/features/more_layout.png'
  },
  {
    type: 'img',
    title: 'Control Desk',
    url: 'images/features/control_panel.png'
  },
];

const featureItemsStr = featureItems.map(function(item){
  return item.type+ split + item.title + split + item.url;
});
const usercaseItems = [
  {
    type: 'video',
    title: 'World Cup 2018 muti-group',
    url: 'https://ipfs.infura.io/ipfs/Qmek8gVTSB1YC3mg3x9FTR6QK7dKTyJ6VrRy3DnHynmCjL'
  },
  {
    type: 'img',
    title: 'Kinds of Map comparison',
    url: 'https://ipfs.infura.io/ipfs/QmRvbca3NJpyJsZebUDbGkFLvBPWrZ9VY1HDaXZ3c8LKkk'
  },
  {
    type: 'video',
    title: 'Muti-cartoons track',
    url: 'https://ipfs.infura.io/ipfs/QmYUCxFp9QdfB6aNcKFTpi4BdKuCVe9mWX3N4FyRPPeYt8'
  },
  {
    type: 'video',
    title: 'WebCamera and WebChat',
    url: 'https://ipfs.infura.io/ipfs/QmUeiBCacduTCRupsBW3bnBV31aEbHtdpReiGstjPXnAVD'
  },
  {
    type: 'video',
    title: 'What is more?',
    url: ''
  },
];
const usercaseItemsStr = usercaseItems.map(function(item){
  return item.type+ split + item.title + split + item.url;
});

const installItems = [
    {
      icon: 'images/install/chrome_flat.png',
      name: 'Chrome',
      label: 'Install Chrome Extension',
      installUrl: 'https://chrome.google.com/webstore/detail/viewport/npgjahajhclmlbijjeekjaodgmokngpp',
      picUrl: 'images/install/chrome_installed.png'
    },
    {
      icon: 'images/install/opera_flat.png',
      name: 'Opera',
      label: 'Install Opera Extension',
      installUrl: 'https://chrome.google.com/webstore/detail/viewport/npgjahajhclmlbijjeekjaodgmokngpp',
      picUrl: 'images/install/opera_installed.png'
    },
    {
      icon: 'images/install/firefox_flat.png',
      name: 'Firefox',
      label: 'Install Firefox Extension',
      installUrl: 'https://addons.mozilla.org/zh-CN/firefox/addon/viewportgroup/',
      picUrl: 'images/install/firefox_installed.png'
    }
];
const installItemsStr = installItems.map(function(item){
  return item.icon+ split + item.name + split + item.label+ split + item.installUrl + split + item.picUrl;
});

const carouselItems=[
  {
    title: 'THE INTERNET(2015 from opte.org)  WWW is just a small part of Internet',
    picUrl: 'images/internet.jpg',
    jumpUrl: 'https://www.opte.org/the-internet/',
  },
  {
    title: 'World Wide Web(2012 from internet-map.net)  The Indexed Web contains at least 4.61 billion pages (Friday, 15 June, 2018) from worldwidewebsize.com.',
    picUrl: 'images/www.jpg',
    jumpUrl: 'https://internet-map.net',
  },
  {
    title: '  IPFS(2017)   Will the distributing be the next generation of web?',
    picUrl: 'images/ipfs.jpeg',
    jumpUrl: 'https://medium.com/@ConsenSys/an-introduction-to-ipfs-9bba4860abd0',
  }
];
const carouselItemsStr = carouselItems.map(function(item){
  return item.title+ split + item.picUrl + split + item.jumpUrl;
});
const en_US = {
            "app.title":"viewports of WWW",
            "app.languages":"English,en/Chinese,zh-CN",
            "app.drawer.viewswitch":"ViewSwitch",
            "app.drawer.viewswitch.2dGrid":"2dGrid",
            "app.drawer.viewswitch.2dFlow":"2dFlow",
            "app.drawer.config":"ControlDesk",
            "app.drawer.portal":"Help/Introduce",
            "app.drawer.language":"Language",

            "app.drawer.login.title":"Register/Login",
            "app.drawer.login.logout":"logout",
            "app.drawer.login.exitmodal.title":"save your private info before exit!!",
            "app.drawer.login.exitmodal.label.address":"address",
            "app.drawer.login.exitmodal.label.keystore":"keystore",
            "app.drawer.login.exitmodal.button.exit":"Exit",
            "app.drawer.login.exitmodal.button.cancle":"Cancle",
            "app.drawer.login.create.tabtitle":"Create",
            "app.drawer.login.create.title":"Set a lock for your account, which is based on Ethereum",
            "app.drawer.login.create.input.password1":"New Password（min 8 chars）",
            "app.drawer.login.create.input.password2":"Confirm Password",
            "app.drawer.login.create.input.password1.error":"password min 8 chars",
            "app.drawer.login.create.input.password2.error":" input two different passwords",
            "app.drawer.login.create.button.create":"Create",
            "app.drawer.login.create.button.cancle":"Cancle",

            "app.drawer.login.import.tabtitle":"Import",
            "app.drawer.login.import.title":"import your keystore, which is a json file",
            "app.drawer.login.import.label.keystore":"keystore",
            "app.drawer.login.import.input.password":"Enter Password",
            "app.drawer.login.import.input.password.error":"password could not be empty",
            "app.drawer.login.import.input.file.error.empty":"pleases select a keystore file",
            "app.drawer.login.import.input.file.error.invalid":"invalid JSON file",
            "app.drawer.login.import.button.import":"Import",
            "app.drawer.login.import.button.cancle":"Cancle",


            "app.joyride.back": 'Back',
            "app.joyride.close": 'Close',
            "app.joyride.last": 'Get',
            "app.joyride.next": 'Next',
            "app.joyride.skip": 'Skip',
            "app.joyride.menus.title": 'QuickControlArea',
            "app.joyride.menus.text": 'Add view on left-mouse-click，try right-mouse-click...',
            "app.joyride.drawer.swtich.title": 'More Function',
            "app.joyride.drawer.swtich.text": 'More viewports Layout|Contorl Desk|Help/Introduction...',
            "app.joyride.iframe.title": 'Viewport Control',
            "app.joyride.iframe.text": 'try right-mouse-click, left-double-mouse-click cause max the current viewport if url valid...',

            "app.scenes.title": "viewports desk",
            "app.scenes.menus.video.max": "VideoMax",
            "app.scenes.menus.video.min": "ExitVideoMax",
            "app.scenes.menus.video.mute": "VideoMute",
            "app.scenes.menus.video.unmute": "VideoUnmute",
            "app.scenes.iframe.operation.url": "url",
            "app.scenes.iframe.operation.remove": "remove",
            "app.scenes.iframe.operation.reload": "reload",
            "app.scenes.iframe.operation.video": "video(H5)",
            "app.scenes.iframe.operation.video.max": "maximize",
            "app.scenes.iframe.operation.video.min": "exitMaximize",
            "app.scenes.iframe.operation.video.mute": "mute",
            "app.scenes.iframe.operation.video.unmute": "unmute",

            "app.config.title": "viewports control-center",
            "app.config.tabel.header": "control center",
            "app.config.operation.add": "Add View!",
            "app.config.operation.deleteall": "Delete All View!",
            "app.config.operation.select": "Select from!",
            "app.config.tabel.label.main": "Main",
            "app.config.tabel.label.main.title": "Title",
            "app.config.tabel.label.main.url": "Url",
            "app.config.tabel.label.size": "Size",
            "app.config.tabel.label.size.width": "Width",
            "app.config.tabel.label.size.height": "Height",
            "app.config.tabel.label.size.depth": "Depth",
            "app.config.tabel.label.position": "Position",
            "app.config.tabel.label.position.x": "X",
            "app.config.tabel.label.position.y": "Y",
            "app.config.tabel.label.position.z": "Z",
            "app.config.tabel.label.operation": "Operation",
            "app.config.tabel.label.operation.delete": "Delete",
            "app.config.tabel.label.option.previousText": "Previous",
            "app.config.tabel.label.option.nextText": "Next",
            "app.config.tabel.label.option.loadingText": "loading...",
            "app.config.tabel.label.option.noDataText": "No rows found",
            "app.config.tabel.label.option.pageText": "Page",
            "app.config.tabel.label.option.ofText": "of",
            "app.config.tabel.label.option.rowsText": "rows",
            "app.config.tabel.row.label.title": "New View",
            "app.config.tabel.row.label.delete": "[delete]",
            "app.config.unlogintipmodal": "User unlogined cannot visit the ControlPanel",
            "app.config.selectmodal.operation.selectall": "All Select",
            "app.config.selectmodal.operation.load": "Load to Panel",


            "app.portal.title": "viewports help/introduce",
            "app.portal.header.title": "Viewport(s)",
            "app.portal.header.menu.home": "Home",
            "app.portal.header.menu.usercase": "Usercase",
            "app.portal.header.menu.features": "Features",
            "app.portal.header.menu.install": "Install",
            "app.portal.header.menu.contact": "Contact",

            "app.portal.home.carousel.items":carouselItemsStr,
            "app.portal.home.qa.title": "Q/A",
            "app.portal.home.qa.items": [
              "Q：How big is Internet and WWW,  and how many webs exists?",
              "A：boundless and still growing, get detail answer from left charts.",
              "Q：What is the next generation of web, IPFS?",
              "A：distributing-webs might bring evaluation, but further speed information-generation-rate.",
              "Q：How much time did you spend in web-world?",
              "A：maybe up to 6 hours per day.",
              "Q：How to decrease it ?",
              "A：||keep far away from Interenet?|| kidding, Interenet is a great creation/tool,try install browser extension viewport,which could open multi-viewports(webs) in one tab to browse the Internet(WWW) efficient and speed the action of fetching information,especially useful in super-screen of conference/hall",
            ],
            "app.portal.usercase.items": usercaseItemsStr,
            "app.portal.feature.items": featureItemsStr,
            "app.portal.install.items": installItemsStr,
            "app.portal.footer.title": "Viewport(s)",
            "app.portal.footer.desc": "Browse the Internet(WWW) efficient, speed the action of fetching information",
            "app.portal.footer.donation": "donations are appreciated!",
            "app.portal.footer.resouces": "resources",


        }
export default en_US;
