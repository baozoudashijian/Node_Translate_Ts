import * as https from 'https';
import * as querystring from 'querystring'
import * as randomstring from 'randomstring'
import * as md5 from 'md5'
import { appid, serect } from './ak'

function requestToTranslate(q: string) {

    const randomstr: string = randomstring.generate(10)
    const sign = generateSign(appid, q, randomstr, serect)
    const { from, to } = judgeTransDirection(q)

    const query = {
        
        appid,
        salt: randomstr,
        sign,
        q,
        from,
        to
    }
    const options = {
        hostname: 'fanyi-api.baidu.com',
        port: 443,
        path: '/api/trans/vip/translate?' + querystring.stringify(query),
        method: 'GET'
    };

    const req = https.request(options, (res) => {
        res.on('data', (d) => {
            let result = JSON.parse(d.toString())
            result.trans_result.map((item) => {
                console.log(item.dst)
            })
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}
// 生成签名
function generateSign(appid, q, randomstr, serect) {
    return md5(appid + q + randomstr + serect)
}
//
function judgeTransDirection(str: string) {
    let result = {
        from: 'zh',
        to: 'en'
    }
    let firstLetter = str.charCodeAt(0)
    if((firstLetter >= 65 && firstLetter <= 90) || (firstLetter >= 97 && firstLetter <= 122 )){
        result.from = 'en'
        result.to = 'zh'
    }
    return result
}

export { requestToTranslate }
