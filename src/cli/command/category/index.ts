import { AbstractCommand } from '../abstractCommand';
import { CategoryNewCommand } from './NewCommand';

export class CategoryCommand extends AbstractCommand {
    constructor() {
        super('category');
        new CategoryNewCommand().register(this);

        this
            .alias('c')
            .description('블로그 카테고리 관련 명령어들')
            .summary('Category')
            .action(() => {
                this.help();
            });
    }
}
