import { Command } from 'commander';
import { translate } from './main';
const program = new Command();

program
    .name('trans')
    .description('A simple translation tool')
    .version(process.env.npm_package_version);

program
    .argument('<string>', 'Translation content')
    .action((str) => {
        // 控制台获取需要翻译的内容
        translate(str)
    });

program.parse();