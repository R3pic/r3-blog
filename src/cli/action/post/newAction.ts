import fs from 'fs';
import path from 'path';
import { getPostDir, isExist } from '@/utils/path';
import { AbstractAction } from '../AbstractAction';
import { show } from '@/cli/ui';
import MarkdownTemplate from '@/templates';
import { convertToSlug, formatDateString } from '@/utils/string';

export class PostNewAction extends AbstractAction<PostActionContext> {
    handle(ctx: PostActionContext): never {
        const splited = ctx.categoryPath.split('/').map((v) => convertToSlug(v));
        const categoryPath = splited.join('/');
        const postDir = getPostDir();
        const newCategoryPath = path.join(postDir, categoryPath);

        if (!isExist(newCategoryPath)) {
            show.warnMsg(`카테고리 [${categoryPath}]이(가) 존재하지 않습니다.`);
            process.exit(1);
        }

        const postName = convertToSlug(ctx.postName);
        const postPath = `${newCategoryPath}/${postName}.mdx`;
        if (isExist(postPath)) {
            show.warnMsg(`${categoryPath}/${postName} 에 게시글이 이미 존재합니다.`);
            process.exit(1);
        }

        fs.writeFileSync(postPath, MarkdownTemplate.post({
            title: ctx.options.title || '게시글 제목을 적어주세요.',
            description: ctx.options.description || '게시글 목록에서 보일 설명을 적어주세요.',
            date: formatDateString(new Date()),
            tags: ctx.options.tags ? `[${ctx.options.tags}]` : '[]',
            thumbnail: ctx.options.thumbnail
        }));

        show.successMsg(`새로운 게시글이 생성되었습니다. \n경로 : [${categoryPath}/${postName}]`);
        process.exit(0);
    }
}