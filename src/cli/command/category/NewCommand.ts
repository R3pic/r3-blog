import { AbstractCommand } from '@/cli/command/abstractCommand';
import { CategoryNewAction } from '@/cli/action/category/newAction';

export class CategoryNewCommand extends AbstractCommand {
    constructor() {
        super('new');
        this.argument('<categoryPath>', '카테고리 이름(필수) example. ["category", "category/subcategory"]')
            .alias('n')
            .option('-d, --display <display>', '카테고리가 보여질 이름')
            .option('-o, --order <order>', '카테고리 가중치 (작을수록 위에 위치함)')
            .description('새로운 카테고리를 생성합니다.')
            .summary('새로운 카테고리를 생성합니다.')
            .action((categoryPath) => {
                const { display, order } = this.opts();
                new CategoryNewAction().handle({ categoryPath, display, order });
            });
    }
}