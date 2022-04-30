"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
const request_1 = require("./request");
function translate(str) {
    (0, request_1.requestToTranslate)(str);
}
exports.translate = translate;
