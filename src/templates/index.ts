import { CategoryFrontMatter, PostFrontMatter } from '../types';

class MarkdownTemplate {
    private static frontmatter<T>(ctx: TemplateContext<T>) {
        let buffer = '---\n';
        for (const key in ctx) {
            if (ctx[key])
                buffer += `${key}: ${ctx[key]}\n`;
        }
        buffer += '---';
        return buffer;
    }

    static category(ctx: TemplateContext<CategoryFrontMatter>): string {
        return this.frontmatter(ctx);
    }

    static post(ctx: TemplateContext<PostFrontMatter>): string {
        return this.frontmatter(ctx);
    }
}

export default MarkdownTemplate;