#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const main_1 = require("./main");
const program = new commander_1.Command();
program
    .name('trans')
    .description('A simple translation tool')
    .version(process.env.npm_package_version);
program
    .argument('<string>', 'Translation content')
    .action((str) => {
    // 控制台获取需要翻译的内容
    (0, main_1.translate)(str);
});
program.parse();
