type TemplateContext<T> = {
    [K in keyof T]: string;
};

class MarkdownTemplate {
    private static frontmatter<T>(ctx: TemplateContext<T>) {
        let buffer = '---\n';
        for (const key in ctx) {
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