const split = ' || '
const featureItems = [
  {
    type: 'img',
    title: 'Add View to the stage',
    url: 'https://ipfs.infura.io/ipfs/QmXZ48kqWFsNYYwe7MNYZE5EZsf6WAgaFWUDTqrKBLfm3d/add_view.png'
  },
  {
    type: 'img',
    title: 'Control meida in selection-view by double-left-click on it',
    url: 'https://ipfs.infura.io/ipfs/QmXZ48kqWFsNYYwe7MNYZE5EZsf6WAgaFWUDTqrKBLfm3d/control_media_in_view.png'
  },
  {
    type: 'img',
    title: 'Set the url for your selection view by right click on it',
    url: 'https://ipfs.infura.io/ipfs/QmXZ48kqWFsNYYwe7MNYZE5EZsf6WAgaFWUDTqrKBLfm3d/set_view.png'
  },
  {
    type: 'img',
    title: 'Remove/Reload the view from stage by right click on it',
    url: 'https://ipfs.infura.io/ipfs/QmXZ48kqWFsNYYwe7MNYZE5EZsf6WAgaFWUDTqrKBLfm3d/remove_view.png'
  },
  {
    type: 'img',
    title: 'Max the view  by double-left-click on it',
    url: 'https://ipfs.infura.io/ipfs/QmXZ48kqWFsNYYwe7MNYZE5EZsf6WAgaFWUDTqrKBLfm3d/max_view.png'
  },

  {
    type: 'img',
    title: 'More Layout',
    url: 'https://ipfs.infura.io/ipfs/QmXZ48kqWFsNYYwe7MNYZE5EZsf6WAgaFWUDTqrKBLfm3d/more_layout.png'
  },
  {
    type: 'img',
    title: 'Control Desk',
    url: 'https://ipfs.infura.io/ipfs/QmXZ48kqWFsNYYwe7MNYZE5EZsf6WAgaFWUDTqrKBLfm3d/control_panel.png'
  },
];

const featureItemsStr = featureItems.map(function(item){
  return item.type+ split + item.title + split + item.url;
});
const usercaseItems = [
  {
    type: 'video',
    title: 'World Cup 2018 muti-group',
    url: "https://drive.google.com/uc?export=download&id=168SxqglhvDCvqzR7ZIQg_kxngV282bBp"//'https://ipfs.infura.io/ipfs/Qmek8gVTSB1YC3mg3x9FTR6QK7dKTyJ6VrRy3DnHynmCjL'
  },
  {
    type: 'img',
    title: 'Kinds of Map comparison',
    url: "https://drive.google.com/uc?export=download&id=1zUyx5dURUDcx1wjErMXH30IkXmyNRHG8"//'https://ipfs.infura.io/ipfs/QmRvbca3NJpyJsZebUDbGkFLvBPWrZ9VY1HDaXZ3c8LKkk'
  },
  {
    type: 'video',
    title: 'Muti-cartoons track',
    url: "https://drive.google.com/uc?export=download&id=1gTkAUFSRRwwH5Zq-INoMemw5DnCPTCvs"//'https://ipfs.infura.io/ipfs/QmYUCxFp9QdfB6aNcKFTpi4BdKuCVe9mWX3N4FyRPPeYt8'
  },
  {
    type: 'video',
    title: 'WebCamera and WebChat',
    url: 'https://drive.google.com/uc?export=download&id=1pueNCbA-J0_6kW9SmyRkRZbQjcmFhBDb'//'https://ipfs.infura.io/ipfs/QmUeiBCacduTCRupsBW3bnBV31aEbHtdpReiGstjPXnAVD'
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
      picUrl: 'https://ipfs.infura.io/ipfs/QmVppJ3MaisaR6za7KsoGaVub2jbGZk2ATA4sPRvWiyDhk/chrome_installed.png'
    },
    {
      icon: 'images/install/opera_flat.png',
      name: 'Opera',
      label: 'Install Opera Extension',
      installUrl: 'https://chrome.google.com/webstore/detail/viewport/npgjahajhclmlbijjeekjaodgmokngpp',
      picUrl: 'https://ipfs.infura.io/ipfs/QmVppJ3MaisaR6za7KsoGaVub2jbGZk2ATA4sPRvWiyDhk/opera_installed.png'
    },
    {
      icon: 'images/install/firefox_flat.png',
      name: 'Firefox',
      label: 'Install Firefox Extension',
      installUrl: 'https://addons.mozilla.org/zh-CN/firefox/addon/viewportgroup/',
      picUrl: 'https://ipfs.infura.io/ipfs/QmVppJ3MaisaR6za7KsoGaVub2jbGZk2ATA4sPRvWiyDhk/firefox_installed.png'
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
            "app.timeunits": "year/month/day/hour/minute/second",
            "app.global.copy": "already copyed to clipboard",
            "app.drawer.viewswitch":"ViewSwitch",
            "app.drawer.viewswitch.2dGrid":"2dGrid",
            "app.drawer.viewswitch.2dFlow":"2dFlow",
            "app.drawer.config":"ControlDesk",
            "app.drawer.portal":"Help/Introduce",
            "app.drawer.language":"Language",

            "app.drawer.login.title":"Register/Login/License, on Ethernet",
            "app.drawer.login.logout":"logout",


            "app.transaction.title": 'CONFIRM TRANSACTION',
            "app.transaction.label.amount": 'Amount',
            "app.transaction.input.amount.error": 'not enough enthers in your account',
            "app.transaction.label.gaslimit": 'Gas Limit',
            "app.transaction.label.gasprice": 'Gas Price',
            "app.transaction.label.maxtransactionfee": 'Max Transaction Fee',
            "app.transaction.label.maxtotal": 'Max Total',
            "app.transaction.label.dataincluded": 'Data included',
            "app.transaction.label.safe": 'Your wallet is encrypted. Good! Please enter the password.(double-check the URL & SSL cert)',
            "app.transaction.input.password": 'Password',
            "app.transaction.input.password.error": 'password for signtransaction is empty',
            "app.transaction.button.reset": 'RESET',
            "app.transaction.button.submit": 'SUBMIT',
            "app.transaction.success": 'your transaction hash is ',
            "app.transaction.fail": 'transaction response error with ',
            "app.modal.transactionmodal.title":"transaction Receipt",
            "app.modal.transactionmodal.pending":"pending ... might take serveral seconds/minutes for blockchain to confirm (auto refresh)",

            "app.modal.license.title": 'Your License Validate Time',
            "app.modal.license.update": 'level up!',
            "app.modal.license.code1": 'your unlogin free-license is expired now, please login',
            "app.modal.license.code2": 'your unlogin free-license is about to expire',
            "app.modal.license.code3": 'using unlogin free-license',
            "app.modal.license.code4": 'login free-license is expired now, you could buy charge-license for better service',
            "app.modal.license.code5": 'your login free-license is about to expire',
            "app.modal.license.code6": 'using free-license',
            "app.modal.license.code7": 'your license is expired now, you could reapply the new license for keeping the service',

            "app.modal.license.licensetypes.table.header.fee": "fee",
            "app.modal.license.licensetypes.table.header.validatetime": "validateTime",
            "app.modal.license.licensetypes.table.header.state": "onSale",
            "app.modal.license.licensetypes.table.header.state.closed": "offline",
            "app.modal.license.licensetypes.table.header.state.opened": "online",
            "app.modal.license.licensetypes.table.header.buy": "buy",
            "app.modal.license.licensetypes.apply.success": "apply the license success",


            "app.modal.exitmodal.title":"save your private info before exit!!(can not get back when lost)",
            "app.modal.exitmodal.label.address":"address",
            "app.modal.exitmodal.label.keystore":"keystore",
            "app.modal.exitmodal.button.exit":"Exit",
            "app.modal.exitmodal.button.cancle":"Cancle",


            "app.login.create.tabtitle":"Create",
            "app.login.create.title":"set a lock for your account, which is based on Ethereum",
            "app.login.create.input.password1":"New Password（min 8 chars）",
            "app.login.create.input.password2":"Confirm Password",
            "app.login.create.input.password1.error":"password min 8 chars",
            "app.login.create.input.password2.error":" input two different passwords",
            "app.login.create.button.create":"Create",
            "app.login.create.button.cancle":"Cancle",

            "app.login.keystore.tabtitle":"Keystore",
            "app.login.keystore.title":"import your keystore, which is a json file",
            "app.login.keystore.label.keystore":"keystore",
            "app.login.keystore.input.password":"Enter Password",
            "app.login.keystore.input.password.error.empty":"password could not be empty",
            "app.login.keystore.input.password.error.invalid":"password not match keystore",

            "app.login.keystore.input.file.error.empty":"pleases select a keystore file",
            "app.login.keystore.input.file.error.invalid":"invalid JSON file",
            "app.login.keystore.button.import":"Import",
            "app.login.keystore.button.cancle":"Cancle",

            "app.login.privatekey.tabtitle":"PrivateKey",
            "app.login.privatekey.title":"using privatekey directly could bring risk, set a password to generate keystore for next login",
            "app.login.privatekey.input.privatekey":"PrivateKey",
            "app.login.privatekey.input.password":"Set A Password",
            "app.login.privatekey.input.password.error":"password could not be empty",
            "app.login.privatekey.input.privatekey.error.empty":"privatekey could not be empty",
            "app.login.privatekey.input.privatekey.error.invalid":"invalid privatekey",
            "app.login.privatekey.button.import":"Import",
            "app.login.privatekey.button.cancle":"Cancle",


            "app.joyride.back": 'Back',
            "app.joyride.close": 'Close',
            "app.joyride.last": 'Get',
            "app.joyride.next": 'Next',
            "app.joyride.skip": 'Skip',
            "app.joyride.menus.title": 'QuickControlArea',
            "app.joyride.menus.text": 'now left-click to add another viewport, try right-click on multi-control',
            "app.joyride.drawer.swtich.title": 'More Function',
            "app.joyride.drawer.swtich.text": 'Click to discover more viewports-layouts,contorl-desk...',
            "app.joyride.iframe.title": 'Viewport Control',
            "app.joyride.iframe.text": 'try right-click on this..., double-left-click to switch to certain viewport, Esc back to main desk',

            "app.scenes.title": "viewports desk",
            "app.scenes.menus.video.max": "AllVideoMax",
            "app.scenes.menus.video.min": "AllVideoMaxExit",
            "app.scenes.menus.video.mute": "AllVideoMute",
            "app.scenes.menus.video.unmute": "AllVideoUnmute",
            "app.scenes.menus.pageExitFullScreen": "ExitFullScreen",
            "app.scenes.iframe.operation.url": "url",
            "app.scenes.iframe.operation.remove": "remove",
            "app.scenes.iframe.operation.reload": "reload",
            "app.scenes.iframe.operation.video": "video(H5)",
            "app.scenes.iframe.operation.video.max": "maximize",
            "app.scenes.iframe.operation.video.min": "exitMaximize",
            "app.scenes.iframe.operation.video.mute": "mute",
            "app.scenes.iframe.operation.video.unmute": "unmute",

            "app.config.title": "viewports control-center",
            "app.config.table.header": "Configuration Center",
            "app.config.operation.add": "Add View!",
            "app.config.operation.deleteall": "Delete All View!",
            "app.config.operation.select": "Select from!",
            "app.config.table.label.main": "Main",
            "app.config.table.label.main.title": "Title",
            "app.config.table.label.main.url": "Url",
            "app.config.table.label.size": "Size",
            "app.config.table.label.size.width": "Width",
            "app.config.table.label.size.height": "Height",
            "app.config.table.label.size.depth": "Depth",
            "app.config.table.label.position": "Position",
            "app.config.table.label.position.x": "X",
            "app.config.table.label.position.y": "Y",
            "app.config.table.label.position.z": "Z",
            "app.config.table.label.operation": "Operation",
            "app.config.table.label.operation.delete": "Delete",
            "app.config.table.label.option.previousText": "Previous",
            "app.config.table.label.option.nextText": "Next",
            "app.config.table.label.option.loadingText": "loading...",
            "app.config.table.label.option.noDataText": "No rows found",
            "app.config.table.label.option.pageText": "Page",
            "app.config.table.label.option.ofText": "of",
            "app.config.table.label.option.rowsText": "rows",
            "app.config.table.row.label.title": "New View",
            "app.config.table.row.label.delete": "[delete]",
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
            "app.portal.footer.donation.success": "thanks for your donation , transaction hash is ",
            "app.portal.footer.resouces": "resources",


        }
export default en_US;
