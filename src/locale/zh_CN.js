const split = ' || '
const featureItems = [
  {
    type: 'img',
    title: '添加视口',
    url: 'images/features/add_view.png'
  },
  {
    type: 'img',
    title: '选定视口中媒体资源控制(鼠标右键)',
    url: 'images/features/control_media_in_view.png'
  },
  {
    type: 'img',
    title: '选定视口鼠标右键切换URL',
    url: 'images/features/set_view.png'
  },
  {
    type: 'img',
    title: '删除/重新加载选定视口',
    url: 'images/features/remove_view.png'
  },
  {
    type: 'img',
    title: '双击选定视口最大化',
    url: 'images/features/max_view.png'
  },

  {
    type: 'img',
    title: '更多视口排列类型',
    url: 'images/features/more_layout.png'
  },
  {
    type: 'img',
    title: '视口控制中心',
    url: 'images/features/control_panel.png'
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
      picUrl: 'images/install/chrome_installed.png'
    },
    {
      icon: 'images/install/opera_flat.png',
      name: 'Opera',
      label: '安装Opera插件',
      installUrl: '',
      picUrl: 'images/install/opera_installed.png'
    },
    {
      icon: 'images/install/firefox_flat.png',
      name: 'Firefox',
      label: '安装Firefox插件',
      installUrl: 'https://addons.mozilla.org/zh-CN/firefox/addon/viewportgroup/',
      picUrl: 'images/install/firefox_installed.png'
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
          "app.drawer.viewswitch":"视图切换",
          "app.drawer.viewswitch.2dGrid":"2d网格",
          "app.drawer.viewswitch.2dFlow":"2d瀑布",
          "app.drawer.config":"控制台",
          "app.drawer.portal":"帮助|介绍",
          "app.drawer.language":"语言",

          "app.drawer.login.title":"注册/登录(基于区块链)",
          "app.drawer.login.logout":"退出",
          "app.drawer.login.exitmodal.title":"退出去请确认已保存您的私人密钥信息!!",
          "app.drawer.login.exitmodal.label.address":"地址",
          "app.drawer.login.exitmodal.label.keystore":"密钥",
          "app.drawer.login.exitmodal.button.exit":"退出",
          "app.drawer.login.exitmodal.button.cancle":"取消",
          "app.drawer.login.create.tabtitle":"创建",
          "app.drawer.login.create.title":"为您的Ethereum账户上锁",
          "app.drawer.login.create.input.password1":"新密码（最少8位）",
          "app.drawer.login.create.input.password2":"确认密码",
          "app.drawer.login.create.input.password1.error":"密码最少8位",
          "app.drawer.login.create.input.password2.error":" 两次输入密码不一致",
          "app.drawer.login.create.button.create":"创建",
          "app.drawer.login.create.button.cancle":"取消",
          "app.drawer.login.import.tabtitle":"导入",
          "app.drawer.login.import.title":"导入您的密钥信息（JSON文件）",
          "app.drawer.login.import.label.keystore":"密钥",
          "app.drawer.login.import.input.password":"输入密码",
          "app.drawer.login.import.input.password.error":"密码不能为空",
          "app.drawer.login.import.input.file.error.empty":"请指定keystore文件路径",
          "app.drawer.login.import.input.file.error.invalid":"非法JSON文件",
          "app.drawer.login.import.button.import":"导入",
          "app.drawer.login.import.button.cancle":"取消",

          "app.joyride.back": '返回',
          "app.joyride.close": '关闭',
          "app.joyride.last": '知道了',
          "app.joyride.next": '下一步',
          "app.joyride.skip": '取消',
          "app.joyride.menus.title": '快捷控制',
          "app.joyride.menus.text": '鼠标左键点击添加视口，右键批量视口控制...',
          "app.joyride.drawer.swtich.title": '更多功能',
          "app.joyride.drawer.swtich.text": '视图排列|控制中心|帮助介绍...',
          "app.joyride.iframe.title": '视口控制',
          "app.joyride.iframe.text": '鼠标右键控制该视口；有效URL下双击左键最大化...',

          "app.scenes.title": "视口桌面",
          "app.scenes.menus.video.max": "视频最大化",
          "app.scenes.menus.video.min": "退出最大化",
          "app.scenes.menus.video.mute": "视频静音",
          "app.scenes.menus.video.unmute": "取消静音",
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
          "app.config.tabel.label.main": "主信息",
          "app.config.tabel.label.main.title": "标题",
          "app.config.tabel.label.main.url": "Url",
          "app.config.tabel.label.size": "大小",
          "app.config.tabel.label.size.width": "宽",
          "app.config.tabel.label.size.height": "高",
          "app.config.tabel.label.size.depth": "厚",
          "app.config.tabel.label.position": "坐标",
          "app.config.tabel.label.position.x": "X",
          "app.config.tabel.label.position.y": "Y",
          "app.config.tabel.label.position.z": "Z",
          "app.config.tabel.label.operation": "操作",
          "app.config.tabel.label.operation.delete": "删除",
          "app.config.tabel.label.option.previousText": "上一页",
          "app.config.tabel.label.option.nextText": "下一页",
          "app.config.tabel.label.option.loadingText": "加载中...",
          "app.config.tabel.label.option.noDataText": "未发现数据",
          "app.config.tabel.label.option.pageText": "页数",
          "app.config.tabel.label.option.ofText": "/",
          "app.config.tabel.label.option.rowsText": "行",
          "app.config.tabel.row.label.title": "新视口",
          "app.config.tabel.row.label.delete": "[删除]",
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
            "A：||远离网络?|| 开玩笑, 因特网（WWWW）是伟大的创造与工具， 安装“视口”浏览器插件, 打开多视口在同一屏幕上，加速信息获取浏览,特别是当你有巨型屏或在客厅墙幕",
          ],
          "app.portal.usercase.items": usercaseItemsStr,
          "app.portal.feature.items": featureItemsStr,
          "app.portal.install.items": installItemsStr,
          "app.portal.footer.title": "视口合辑",
          "app.portal.footer.desc": "高效率使用因特网, 加速信息获取",
          "app.portal.footer.donation": "感谢您的打赏!",
          "app.portal.footer.resouces": "资源",

      }
export default zh_CN;
