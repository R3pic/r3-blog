import fs from 'fs';
import path from 'path';
import { getPostDir, isExist } from '@/utils/path';
import { AbstractAction } from '../AbstractAction';
import { show } from '@/cli/ui';
import MarkdownTemplate from '@/templates';
import { convertToDisplay, convertToSlug } from '@/utils/string';

type ActionContext = {
    categoryPath: string;
    display?: string;
    order?: string;
};

export class CategoryNewAction extends AbstractAction<ActionContext> {
    handle(ctx: ActionContext): never {
        const { display, order } = ctx;
        const splited = ctx.categoryPath.split('/').map((v) => convertToSlug(v));
        const categoryPath = splited.join('/');
        const postDir = getPostDir();
        const newCategoryPath = path.join(postDir, categoryPath);
        if (isExist(newCategoryPath)) {
            show.errMsg(`${newCategoryPath}는 이미 존재하는 카테고리입니다.`);
            process.exit(1);
        }
        else {
            fs.mkdirSync(newCategoryPath, { recursive: true });
            fs.writeFileSync(`${newCategoryPath}/_index.md`, MarkdownTemplate.category({
                display: display || convertToDisplay(path.basename(categoryPath)),
                order: order || '0'
            }));

            let currentPath = '';
            for(let i = 0, len = splited.length ; i < len ; i++) {
                currentPath = currentPath ? `${currentPath}/${splited[i]}` : splited[0];
                console.log(currentPath);
                const currentCategoryPath = path.join(postDir, currentPath);

                const _display = convertToDisplay(path.basename(currentPath));
                fs.writeFileSync(`${currentCategoryPath}/_index.md`, MarkdownTemplate.category({ display: _display, order: '0' }));
            }

            show.successMsg(`새로운 카테고리가 생성되었습니다. [${categoryPath}]`);
            process.exit(0);
        }
    }
}