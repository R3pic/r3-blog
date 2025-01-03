import { AbstractCommand } from '@/cli/command/abstractCommand';
import { PostNewAction } from '@/cli/action/post/newAction';
import { getPostDir } from '@/utils/path';
import { CategorySelector } from '@/cli/ui';

export class PostNewCommand extends AbstractCommand {
    constructor() {
        super('new');
        this.argument('<postName>', '게시글 이름(필수) example. 게시글이름, "게시글 이름"')
            .alias('n')
            .option('-t, --title <title>', '게시글의 제목을 설정합니다.')
            .option('-d, --description <description>', '게시글 목록에 보여질 설명글을 설정합니다.')
            .option('--tag <tags>', '게시글 태그를 작성합니다. example. "태그1, 태그2, 태그3"')
            .option('-b, --thumbnail <thumbnail>', '썸네일 경로를 작성합니다.')
            .description('새로운 게시글을 생성합니다.')
            .summary('새로운 게시글을 생성합니다.')
            .action(async (postName) => {
                const basePath = getPostDir();
                const selected = await CategorySelector(basePath);
                const categoryPath = selected.slice(basePath.length + 1);

                new PostNewAction().handle({ 
                    postName,
                    categoryPath,
                    options: {
                        ...this.opts()
                    }
                });
            });
    }
}