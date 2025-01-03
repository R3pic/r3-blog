import { AbstractCommand } from '../abstractCommand';
import { PostNewCommand } from './NewCommand';

export class PostCommand extends AbstractCommand {
    constructor() {
        super('post');
        new PostNewCommand().register(this);
        this.alias('p')
            .description('게시글 관련 명령어')
            .summary('게시글 관련 명령어')
            .action(() => {
                this.help();
            });
    }
}
