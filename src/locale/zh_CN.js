const split = ' || '
const featureItems = [
  {
    type: 'img',
    title: '添加视口',
    url: 'https://ipfs.infura.io/ipfs/QmXZ48kqWFsNYYwe7MNYZE5EZsf6WAgaFWUDTqrKBLfm3d/add_view.png'
  },
  {
    type: 'img',
    title: '选定视口中媒体资源控制(鼠标右键)',
    url: 'https://ipfs.infura.io/ipfs/QmXZ48kqWFsNYYwe7MNYZE5EZsf6WAgaFWUDTqrKBLfm3d/control_media_in_view.png'
  },
  {
    type: 'img',
    title: '选定视口鼠标右键切换URL',
    url: 'https://ipfs.infura.io/ipfs/QmXZ48kqWFsNYYwe7MNYZE5EZsf6WAgaFWUDTqrKBLfm3d/set_view.png'
  },
  {
    type: 'img',
    title: '删除/重新加载选定视口',
    url: 'https://ipfs.infura.io/ipfs/QmXZ48kqWFsNYYwe7MNYZE5EZsf6WAgaFWUDTqrKBLfm3d/remove_view.png'
  },
  {
    type: 'img',
    title: '双击选定视口最大化',
    url: 'https://ipfs.infura.io/ipfs/QmXZ48kqWFsNYYwe7MNYZE5EZsf6WAgaFWUDTqrKBLfm3d/max_view.png'
  },

  {
    type: 'img',
    title: '更多视口排列类型',
    url: 'https://ipfs.infura.io/ipfs/QmXZ48kqWFsNYYwe7MNYZE5EZsf6WAgaFWUDTqrKBLfm3d/more_layout.png'
  },
  {
    type: 'img',
    title: '视口控制中心',
    url: 'https://ipfs.infura.io/ipfs/QmXZ48kqWFsNYYwe7MNYZE5EZsf6WAgaFWUDTqrKBLfm3d/control_panel.png'
  },
];

const featureItemsStr = featureItems.map(function(item){
  return item.type+ split + item.title + split + item.url;
});

const usercaseItems = [
  {
    type: 'video',
    title: '2018世界杯多视口回放',
    url: 'https://ipfs.infura.io/ipfs/Qmek8gVTSB1YC3mg3x9FTR6QK7dKTyJ6VrRy3DnHynmCjL'
  },
  {
    type: 'img',
    title: '地图产品对比',
    url: 'https://ipfs.infura.io/ipfs/QmRvbca3NJpyJsZebUDbGkFLvBPWrZ9VY1HDaXZ3c8LKkk'
  },
  {
    type: 'video',
    title: '多卡通追剧',
    url: 'https://ipfs.infura.io/ipfs/QmYUCxFp9QdfB6aNcKFTpi4BdKuCVe9mWX3N4FyRPPeYt8'
  },
  {
    type: 'video',
    title: '网页摄像头监控/网页聊天',
    url: 'https://ipfs.infura.io/ipfs/QmUeiBCacduTCRupsBW3bnBV31aEbHtdpReiGstjPXnAVD'
  },
  {
    type: 'video',
    title: '更多?',
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
      label: '安装Chrome插件',
      installUrl: 'https://chrome.google.com/webstore/detail/viewport/npgjahajhclmlbijjeekjaodgmokngpp',
      picUrl: 'https://ipfs.infura.io/ipfs/QmVppJ3MaisaR6za7KsoGaVub2jbGZk2ATA4sPRvWiyDhk/chrome_installed.png'
    },
    {
      icon: 'images/install/opera_flat.png',
      name: 'Opera',
      label: '安装Opera插件',
      installUrl: 'https://chrome.google.com/webstore/detail/viewport/npgjahajhclmlbijjeekjaodgmokngpp',
      picUrl: 'https://ipfs.infura.io/ipfs/QmVppJ3MaisaR6za7KsoGaVub2jbGZk2ATA4sPRvWiyDhk/opera_installed.png'
    },
    {
      icon: 'images/install/firefox_flat.png',
      name: 'Firefox',
      label: '安装Firefox插件',
      installUrl: 'https://addons.mozilla.org/zh-CN/firefox/addon/viewportgroup/',
      picUrl: 'https://ipfs.infura.io/ipfs/QmVppJ3MaisaR6za7KsoGaVub2jbGZk2ATA4sPRvWiyDhk/firefox_installed.png'
    }
];
const installItemsStr = installItems.map(function(item){
  return item.icon+ split + item.name + split + item.label+ split + item.installUrl + split + item.picUrl;
});
const carouselItems=[
  {
    title: '互联网(特指因特网)模型(2015 来自 opte.org)  WWW只是因特网的一部分',
    picUrl: 'images/internet.jpg',
    jumpUrl: 'https://www.opte.org/the-internet/',
  },
  {
    title: 'WWW(万维网)(2012 from internet-map.net)  记录的Web包含至少4.61 billion 页面 (2018-06-15) 数据来自 worldwidewebsize.com.',
    picUrl: 'images/www.jpg',
    jumpUrl: 'https://internet-map.net',
  },
  {
    title: '  IPFS(2017)  分布式将成为下一代网络技术?',
    picUrl: 'images/ipfs.jpeg',
    jumpUrl: 'https://medium.com/@ConsenSys/an-introduction-to-ipfs-9bba4860abd0',
  }
];
const carouselItemsStr = carouselItems.map(function(item){
  return item.title+ split + item.picUrl + split + item.jumpUrl;
});
const zh_CN = {
          "app.title":"视口(万维网)",
          "app.languages":"英语,en/中文,zh-CN",
          "app.timeunits": "年/月/日/小时/分钟/秒",
          "app.global.copy": "复制到剪贴板",
          "app.drawer.viewswitch":"视图切换",
          "app.drawer.viewswitch.2dGrid":"2d网格",
          "app.drawer.viewswitch.2dFlow":"2d瀑布",
          "app.drawer.config":"控制台",
          "app.drawer.portal":"帮助|介绍",
          "app.drawer.language":"语言",

          "app.drawer.login.title":"注册/登录/授权, 基于以太坊",
          "app.drawer.login.logout":"退出",

          "app.transaction.title": '交易确认',
          "app.transaction.label.amount": '费用',
          "app.transaction.input.amount.error": '您的账户上没有足够的以太币',
          "app.transaction.label.gaslimit": 'Gas 限制',
          "app.transaction.label.gasprice": 'Gas 价格',
          "app.transaction.label.maxtransactionfee": '最大交易GAS费用',
          "app.transaction.label.maxtotal": '总费用',
          "app.transaction.label.dataincluded": '数据包含',
          "app.transaction.label.safe": '您的钱包加密过. 非常好! 仅交易时输入解锁密码.(输入前请二次确认URL通过https访问)',
          "app.transaction.input.password": '密码',
          "app.transaction.input.password.error": '交易签名密码为空',
          "app.transaction.button.reset": '重置',
          "app.transaction.button.submit": '提交',
          "app.transaction.success": '您的交易编号hash是',
          "app.transaction.fail": '交易错误返回',
          "app.modal.transactionmodal.title":"交易收据",
          "app.modal.transactionmodal.pending":"等待确认中 ... 区块链确认可能需要几秒或几分钟 (自动刷新)",

          "app.modal.license.title": '您的授权使用期',
          "app.modal.license.update": '升级!',
          "app.modal.license.code1": '未登录体验截止，请登录',
          "app.modal.license.code2": '未登录体验即将截止提示',
          "app.modal.license.code3": '未登录体验免费使用中',
          "app.modal.license.code4": '登录体验截止，请购买付费授权继续使用该服务（以支持开发者）;也可选择关闭该弹窗继续使用',
          "app.modal.license.code5": '登录体验即将截止提示',
          "app.modal.license.code6": '登录体验免费使用中',
          "app.modal.license.code7": '您购买的授权服务已经到期, 请重新申请新的授权',

          "app.modal.license.licensetypes.table.header.fee": "费用",
          "app.modal.license.licensetypes.table.header.validatetime": "有效期",
          "app.modal.license.licensetypes.table.header.state": "在售",
          "app.modal.license.licensetypes.table.header.state.closed": "已下线",
          "app.modal.license.licensetypes.table.header.state.opened": "在售",
          "app.modal.license.licensetypes.table.header.buy": "购买",
          "app.modal.license.licensetypes.apply.success": "申请授权成功",

          "app.modal.exitmodal.title":"退出去请确认已保存您的私人密钥信息!!(丢失不可找回)",
          "app.modal.exitmodal.label.address":"地址",
          "app.modal.exitmodal.label.keystore":"密钥",
          "app.modal.exitmodal.button.exit":"退出",
          "app.modal.exitmodal.button.cancle":"取消",


          "app.login.create.tabtitle":"创建",
          "app.login.create.title":"为您的Ethereum账户上锁",
          "app.login.create.input.password1":"新密码（最少8位）",
          "app.login.create.input.password2":"确认密码",
          "app.login.create.input.password1.error":"密码最少8位",
          "app.login.create.input.password2.error":" 两次输入密码不一致",
          "app.login.create.button.create":"创建",
          "app.login.create.button.cancle":"取消",

          "app.login.keystore.tabtitle":"Keystore",
          "app.login.keystore.title":"导入您的keystore信息（JSON文件）",
          "app.login.keystore.label.keystore":"密钥",
          "app.login.keystore.input.password":"输入密码",
          "app.login.keystore.input.password.error.empty":"密码不能为空",
          "app.login.keystore.input.password.error.invalid":"密码与keystore不匹配",
          "app.login.keystore.input.file.error.empty":"请指定keystore文件路径",
          "app.login.keystore.input.file.error.invalid":"非法JSON文件",
          "app.login.keystore.button.import":"导入",
          "app.login.keystore.button.cancle":"取消",

          "app.login.privatekey.tabtitle":"Privatekey",
          "app.login.privatekey.title":"直接使用Privatekey有潜在危险，建议设置密码生成keystore登录",
          "app.login.privatekey.input.privatekey":"密钥",
          "app.login.privatekey.input.password":"输入密码",
          "app.login.privatekey.input.password.error":"密码不能为空",
          "app.login.privatekey.input.privatekey.error.empty":"privattekey不能为空",
          "app.login.privatekey.input.privatekey.error.invalid":"非法privattekey",
          "app.login.privatekey.button.import":"导入",
          "app.login.privatekey.button.cancle":"取消",

          "app.joyride.back": '返回',
          "app.joyride.close": '关闭',
          "app.joyride.last": '知道了',
          "app.joyride.next": '下一步',
          "app.joyride.skip": '取消',
          "app.joyride.menus.title": '快捷控制',
          "app.joyride.menus.text": '现在左键点击添加更多视口，右键批量视口控制...',
          "app.joyride.drawer.swtich.title": '更多功能',
          "app.joyride.drawer.swtich.text": '点击查看更多视图排列|控制中心|帮助介绍...',
          "app.joyride.iframe.title": '视口控制',
          "app.joyride.iframe.text": '鼠标右键控制该视口；双击左键最大化该视口,ESC回到主桌面',

          "app.scenes.title": "视口桌面",
          "app.scenes.menus.video.max": "全局视频最大化",
          "app.scenes.menus.video.min": "全局视频最大化退出",
          "app.scenes.menus.video.mute": "全局视频静音",
          "app.scenes.menus.video.unmute": "全局视频静音取消",
          "app.scenes.menus.pageExitFullScreen": "退出视口全屏",
          "app.scenes.iframe.operation.url": "输入URL",
          "app.scenes.iframe.operation.remove": "移除视口",
          "app.scenes.iframe.operation.reload": "重载视口",
          "app.scenes.iframe.operation.video": "视频(H5)",
          "app.scenes.iframe.operation.video.max": "最大化",
          "app.scenes.iframe.operation.video.min": "退出最大化",
          "app.scenes.iframe.operation.video.mute": "静音",
          "app.scenes.iframe.operation.video.unmute": "取消静音",

          "app.config.title": "视口控制台",
          "app.config.table.header": "控制中心",
          "app.config.operation.add": "新增视口!",
          "app.config.operation.deleteall": "删除所有视口!",
          "app.config.operation.select": "选择添加!",
          "app.config.table.label.main": "主信息",
          "app.config.table.label.main.title": "标题",
          "app.config.table.label.main.url": "Url",
          "app.config.table.label.size": "大小",
          "app.config.table.label.size.width": "宽",
          "app.config.table.label.size.height": "高",
          "app.config.table.label.size.depth": "厚",
          "app.config.table.label.position": "坐标",
          "app.config.table.label.position.x": "X",
          "app.config.table.label.position.y": "Y",
          "app.config.table.label.position.z": "Z",
          "app.config.table.label.operation": "操作",
          "app.config.table.label.operation.delete": "删除",
          "app.config.table.label.option.previousText": "上一页",
          "app.config.table.label.option.nextText": "下一页",
          "app.config.table.label.option.loadingText": "加载中...",
          "app.config.table.label.option.noDataText": "未发现数据",
          "app.config.table.label.option.pageText": "页数",
          "app.config.table.label.option.ofText": "/",
          "app.config.table.label.option.rowsText": "行",
          "app.config.table.row.label.title": "新视口",
          "app.config.table.row.label.delete": "[删除]",
          "app.config.unlogintipmodal": "未登录用户不可使用配置中心",
          "app.config.selectmodal.operation.selectall": "全选",
          "app.config.selectmodal.operation.load": "添加到到配置中心",


          "app.portal.title": "视口帮助/介绍",
          "app.portal.header.title": "视口合辑",
          "app.portal.header.menu.home": "首页",
          "app.portal.header.menu.usercase": "使用场景",
          "app.portal.header.menu.features": "功能",
          "app.portal.header.menu.install": "安装",
          "app.portal.header.menu.contact": "联系",

          "app.portal.home.carousel.items":carouselItemsStr,
          "app.portal.home.qa.title": "Q/A",
          "app.portal.home.qa.items": [
            "Q：互联网(特指因特网)有多大？万维网有多大, 包含多少站点网页?",
            "A：难以准确统计，仍然在无限膨胀, 详情可参照左边的图信息.",
            "Q：IPFS会是下一代的网络吗?",
            "A：分布式网页可能会带来革命,但也进一步加速了网页信息生成速度.",
            "Q：你每天花多少时间浏览网页?",
            "A：可能不少于6小时每天.",
            "Q：如何减少这个时间?",
            "A：||远离网络?|| 开个玩笑, 因特网（WWW）是伟大的创造与工具， 安装“视口”浏览器插件, 打开多视口在同一屏幕上，加速信息获取浏览,特别是当你有巨型屏或在客厅墙幕",
          ],
          "app.portal.usercase.items": usercaseItemsStr,
          "app.portal.feature.items": featureItemsStr,
          "app.portal.install.items": installItemsStr,
          "app.portal.footer.title": "视口合辑",
          "app.portal.footer.desc": "高效率使用因特网, 加速信息获取",
          "app.portal.footer.donation": "感谢您的打赏!",
          "app.portal.footer.donation.success": "感谢您的打赏,该次交易编号为",
          "app.portal.footer.resouces": "资源",

      }
export default zh_CN;
