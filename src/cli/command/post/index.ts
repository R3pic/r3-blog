import { AbstractCommand } from '../abstractCommand';
import { PostNewCommand } from './NewCommand';

export class PostCommand extends AbstractCommand {
    constructor() {
        super('post');
        new PostNewCommand().register(this);
        this.alias('p')
            .description('블로그 게시글 관련 명령어들')
            .summary('Post')
            .action(() => {
                this.help();
            });
    }
}
