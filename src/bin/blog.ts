#! /usr/bin/env bun
import { Command } from 'commander';
import meta from '../../package.json';
import { SubCommandLoader } from '../cli/loader/subCommandLoader';
import { getPostDir, isExist } from '@/utils/path';
import { show } from '@/cli/ui';

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
        .action(() => {
            program.help();
        })
        .hook('preSubcommand', () => {
            if (!isExist(getPostDir())) {
                show.errMsg('게시글 저장소가 존재하지 않습니다. 기본값 : "_posts"');
                process.exit(1);
            }
        });

    SubCommandLoader.load(program);

    await program.parseAsync(process.argv);
}

await bootstrap();