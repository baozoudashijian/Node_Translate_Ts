"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestToTranslate = void 0;
const https = __importStar(require("https"));
const querystring = __importStar(require("querystring"));
const randomstring = __importStar(require("randomstring"));
const md5_1 = __importDefault(require("md5"));
const ak_1 = require("./ak");
function requestToTranslate(q) {
    const randomstr = randomstring.generate(10);
    const sign = generateSign(ak_1.appid, q, randomstr, ak_1.serect);
    const { from, to } = judgeTransDirection(q);
    const query = {
        appid: ak_1.appid,
        salt: randomstr,
        sign,
        q,
        from,
        to
    };
    const options = {
        hostname: 'fanyi-api.baidu.com',
        port: 443,
        path: '/api/trans/vip/translate?' + querystring.stringify(query),
        method: 'GET'
    };
    const req = https.request(options, (res) => {
        res.on('data', (d) => {
            let result = JSON.parse(d.toString());
            result.trans_result.map((item) => {
                console.log(item.dst);
            });
        });
    });
    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}
exports.requestToTranslate = requestToTranslate;
// 生成签名
function generateSign(appid, q, randomstr, serect) {
    let concatstr = appid + q + randomstr + serect;
    return (0, md5_1.default)(concatstr);
}
//
function judgeTransDirection(str) {
    let result = {
        from: 'zh',
        to: 'en'
    };
    let firstLetter = str.charCodeAt(0);
    if ((firstLetter >= 65 && firstLetter <= 90) || (firstLetter >= 97 && firstLetter <= 122)) {
        result.from = 'en';
        result.to = 'zh';
    }
    return result;
}
