module.exports = {
  api: {
    appWeb3AllPrivders: [
      {
        name: "Main Ethereum Network",
        provider: "wss://mainnet.infura.io/ws",
        contractAddress: "0xCd5A3b7111b77D0E05c5860f83e19Dd99eA83e10",
      },
      // {
      //   name: "Ropsten Test Network",
      //   provider: "wss://ropsten.infura.io/ws",
      //   contractAddress: "0xbe1f5e09e7abad5636fd8f905d6de422a1955a27",
      //   creationBlock: 0
      // },
      // {
      //   name: "Kovan Test Network",
      //   provider: "wss://kovan.infura.io/ws",
      //   contractAddress: "0x6090ccebc70c63b383f112feb2e5b3ece9b382f3",
      // },
      // {
      //   name: "Rinkeby Test Network",
      //   provider: "https://rinkeby.infura.io",
      //   contractAddress: "0x6fe95e08427f67c917f5fe2a158f3bf203ff4559",
      // },
      // {
      //   name: "Localhost 9545",
      //   provider: "ws://localhost:9545",
      //   contractAddress: "0xb0d834bdc0e626302b9ffad1d2461b677e1cb974",
      // }
    ],
    appDonationAddress: "0x0a1d3effa44dd3d145e6705ed9953bd6f07539c3"
  },
  apiTimeout: 15000,
  apiTimeoutMsg: '接口超时，请稍后再试！',
  apiErrorMsg: '网络超时，请稍后再试！',
  apiUnAuthMsg: '用户登录超时，请重新登录'
};
