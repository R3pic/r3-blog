import path from 'node:path';
import fs from 'node:fs';
import matter from 'gray-matter';
import { globSync } from 'fast-glob';
import { parsePostFrontMatter } from './parsePostMatter';
import { PostNotFoundError } from './error';
import { TagService } from '@/lib/tag';
import BlogConfig from '@/config';
import { CategoryService } from '../category';
import { Post } from '@/types';

export class PostService {
    private allPost: Post[] = [];
    private cached = false;
    getAllPost(postDir: string = BlogConfig.postDir): Post[] {
        if (this.cached)
            return this.allPost;

        const cwd = path.resolve(postDir);
        this.allPost = globSync('**/*.mdx', { onlyFiles: true, cwd })
            .map((postPath) => parsePost(postPath))
            .sort((a, b) => b.date.getTime() - a.date.getTime());
        this.cached = true;
        return this.allPost;
    }

    getAllPostFromCategory(categoryPath: string, postDir?: string) {
        const categoryService = new CategoryService(this.getAllPost(postDir));
        return categoryService.getAllPost(categoryPath);
    }

    getAllPostFromTag(tag: string, postDir?: string) {
        const tagService = new TagService(this.getAllPost(postDir));
        return tagService.getAllPost(tag);
    }

    getPost(slug: string, postDir: string = BlogConfig.postDir): Post {
        const cwd = path.resolve(postDir);
        const [postPath] = globSync(`**/${slug}.mdx`, { onlyFiles: true, cwd });
    
        if (postPath == undefined)
            throw new PostNotFoundError(slug);
    
        return parsePost(postPath);
    }
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