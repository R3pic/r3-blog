#! /usr/bin/env bun
import { Command } from 'commander';
import meta from '../../package.json';
import { SubCommandLoader } from '../cli/loader/subCommandLoader';
import { InitAction } from '@/cli/action/InitAction';
import { getPostDir, isExist } from '@/utils/path';
import { show } from '@/cli/ui';
import { POSTDIR_NOT_FOUND } from '@/cli/ui/message';

async function bootstrap() {
    const program = new Command();
    program
        .name('blog')
        .description('Command Line Tool for R3-Blog')
        .version(
            meta.version,
            '-v, --version',
            '현재 버전을 출력합니다.'
        )
        .helpOption(
            '-h, --help', 
            '사용 방법을 출력합니다.')
        .option('-c, --config', '초기 콘피그 파일을 생성합니다.')
        .action(() => {
            const options = program.opts<{ config?: boolean }>();

            if (options.config) {
                new InitAction().handle();
                process.exit(0);
            }
            program.help();
        })
        .hook('preSubcommand', () => {
            const postDir = getPostDir();
            if (!isExist(postDir)) {
                show.errMsg(POSTDIR_NOT_FOUND);
                process.exit(1);
            }
        });

    SubCommandLoader.load(program);

    await program.parseAsync(process.argv);
}

await bootstrap();