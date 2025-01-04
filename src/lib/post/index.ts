import path from 'node:path';
import fs from 'node:fs';
import matter from 'gray-matter';
import { globSync } from 'fast-glob';
import { parsePostFrontMatter } from './parsePostMatter';
import { PostNotFoundError } from './error';
import { TagService } from '@/lib/tag';
import { CategoryService } from '../category';
import { Post } from '@/types';
import { BlogService } from '../blogService';

export class PostService extends BlogService {
    private allPost: Post[] = [];
    private cached = false;
    private categoryService = new CategoryService(this.postDir);
    getAllPost(): Post[] {
        const cwd = path.resolve(this.postDir);
        if (this.cached)
            return this.allPost;

        this.allPost = globSync('**/*.mdx', { onlyFiles: true, cwd })
            .map((postPath) => this.parsePost(postPath))
            .sort((a, b) => b.date.getTime() - a.date.getTime());
        this.cached = true;
        return this.allPost;
    }

    getAllPostFromCategory(categoryPath: string) {
        return this.categoryService.getAllPost(categoryPath);
    }

    getAllPostFromTag(tag: string) {
        const tagService = new TagService(this.getAllPost());
        return tagService.getAllPost(tag);
    }

    getPost(slug: string): Post {
        const cwd = path.resolve(this.postDir);
        const [postPath] = globSync(`**/${slug}.mdx`, { onlyFiles: true, cwd });
    
        if (postPath == undefined)
            throw new PostNotFoundError(slug, this.postDir);
    
        return this.parsePost(postPath);
    }

    private parsePost(postPath: string): Post {
        const postAbsolutePath = path.resolve(this.postDir, postPath);
    
        const source = fs.readFileSync(postAbsolutePath, 'utf-8');
        const { data, content } = matter(source);
    
        const frontmatter = parsePostFrontMatter(data);
    
        const categoryPath = path.dirname(postPath).toLowerCase();
        const slug = postPath.substring(postPath.lastIndexOf('/') + 1, postPath.lastIndexOf('.'));

        const category = this.categoryService.getCategory(categoryPath);

        const post: Post = {
            ...frontmatter,
            category,
            content,
            slug
        };
    
        return post;
    }
}