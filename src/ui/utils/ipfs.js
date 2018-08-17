const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host: '120.26.120.248', port: '5002', protocol: 'http'});
//ipfs保存//
exports.writeDataOnIpfs = (blob,account) => {
    return new Promise(function(resolve, reject) {
      console.log(blob);
      const descBuffer = Buffer.from(blob, 'utf-8');
      console.log(descBuffer);
      const files = [
        {
          path: '/ViewportGroup/'+account+'.json',
          content: descBuffer
        }
      ]
      ipfs.add(files).then((response) => {
        console.log(response)
        resolve(response[0].hash);
      }).catch((err) => {
        console.error(err)
        reject(err);
      })
    })
  }

exports.readDataOnIpfs = (account) => {
  return new Promise(function(resolve, reject) {
    console.log('/ipns/QmdKXkeEWcuRw9oqBwopKUa8CgK1iBktPGYaMoJ4UNt1MP/'+account+'.json');
    ipfs.cat('/ipns/QmdKXkeEWcuRw9oqBwopKUa8CgK1iBktPGYaMoJ4UNt1MP/'+account+'.json').then((stream) => {
        console.log(stream);
        let strContent = Utf8ArrayToStr(stream);
        console.log(strContent);
        resolve(strContent);
    }).catch((err) => {
      console.error(err)
      reject(err);
    })
  })
}

function Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
    c = array[i++];
    switch(c >> 4)
      {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;
        case 12: case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
          break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode(((c & 0x0F) << 12) |
                         ((char2 & 0x3F) << 6) |
                         ((char3 & 0x3F) << 0));
          break;
        default:
          break;
      }
    }

    return out;
}
