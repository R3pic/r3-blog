import path from 'node:path';
import fs from 'node:fs';
import matter from 'gray-matter';
import { globSync } from 'fast-glob';
import { parsePostFrontMatter } from './parsePostMatter';
import { PostNotFoundError } from './error';
import { TagService } from '@/lib/tag';
import { CategoryService } from '../category';
import { DetailPost, Post } from '@/types';
import { BlogService } from '../blogService';

export class PostService extends BlogService {
    private allPost: Post[] = [];
    private cached = false;

    getAllPost(service: CategoryService): DetailPost[];
    getAllPost(): Post[];
    getAllPost(service?: CategoryService): Post[] | DetailPost[] {
        const cwd = path.resolve(this.postDir);
        if (service) {
            return globSync('**/*.mdx', { onlyFiles: true, cwd })
                .map((postPath) => {
                    const post = parsePost(postPath, this.postDir);
                    return {
                        ...post,
                        category: service.getCategory(post.category)
                    };
                })
                .sort((a, b) => b.date.getTime() - a.date.getTime());
        } else {
            if (this.cached)
                return this.allPost;
    
            this.allPost = globSync('**/*.mdx', { onlyFiles: true, cwd })
                .map((postPath) => parsePost(postPath, this.postDir))
                .sort((a, b) => b.date.getTime() - a.date.getTime());
            this.cached = true;
            return this.allPost;
        }
    }

    getAllPostFromCategory(categoryPath: string) {
        const categoryService = new CategoryService(this.postDir).injection(this);
        return categoryService.getAllPost(categoryPath);
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
    
        return parsePost(postPath, this.postDir);
    }
}

function parsePost(postPath: string, postDir: string): Post {
    const postAbsolutePath = path.resolve(postDir, postPath);

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