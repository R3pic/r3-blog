import { AbstractCommand } from '../abstractCommand';
import { CategoryNewCommand } from './NewCommand';

export class CategoryCommand extends AbstractCommand {
    constructor() {
        super('category');
        new CategoryNewCommand().register(this);

        this
            .alias('c')
            .description('카테고리 관련 명령어')
            .summary('카테고리 관련 명령어')
            .action(() => {
                this.help();
            });
    }
}
