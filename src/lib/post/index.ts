import path from 'node:path';
import fs from 'node:fs';
import matter from 'gray-matter';
import { globSync } from 'fast-glob';
import { parsePostFrontMatter } from './parsePostMatter';
import { PostNotFoundError } from './error';
import BlogConfig from '@/config';


export function getAllPost(postDir: string = BlogConfig.postDir): Post[] {
    const cwd = path.resolve(postDir);
    return globSync('**/*.mdx', { onlyFiles: true, cwd })
        .map((postPath) => parsePost(postPath))
        .sort((a, b) => +b.date - +a.date);
}

export function getPost(slug: string, postDir: string = BlogConfig.postDir): Post {
    const cwd = path.resolve(postDir);
    const [postPath] = globSync(`**/${slug}.mdx`, { onlyFiles: true, cwd });

    if (postPath == undefined)
        throw new PostNotFoundError(slug);

    return parsePost(postPath);
}

function parsePost(postPath: string): Post {
    const postAbsolutePath = path.resolve(BlogConfig.postDir, postPath);

    const source = fs.readFileSync(postAbsolutePath, 'utf-8');
    const { data, content } = matter(source);

    const frontmatter = parsePostFrontMatter(data);

    const category = path.dirname(postPath).toLowerCase();
    const slug = postPath.substring(postPath.lastIndexOf('/') + 1, postPath.lastIndexOf('.'));
    const post: Post = {
        ...frontmatter,
        category,
        content,
        slug
    };

    return post;
}