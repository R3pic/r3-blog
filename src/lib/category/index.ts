import fs from 'fs';
import path from 'path';
import { globSync } from 'fast-glob';
import { parseCategoryMatter } from './parseCategoryMatter';
import { CategoryNotFoundError, PostCacheNotInitializedError } from './error';
import { MapArrayCache } from '@/lib/common/cache';
import BlogConfig from '@/config';

export class CategoryService {
    private categoryPostCache = new MapArrayCache<string, Post[]>();
    private cached = false;
    constructor(posts?: Post[]) {
        if (posts) {
            this.initializeCache(posts);
        }
    }

    private initializeCache(posts: Post[]) {
        for (let i = 0, len = posts.length ; i < len ; i++) {
            const post = posts[i];
            const splited = post.category.split('/');

            let basePath = '';
            splited.forEach((slug) => {
                basePath = basePath ? `${basePath}/${slug}` : slug;
                this.categoryPostCache.add(basePath, post);
            });
        }
        this.cached = true;
    }

    getAllCategoryPath(): string[] {
        const cwd = path.resolve(BlogConfig.postDir);
        return globSync(['**/_index.md'], { onlyFiles: true, cwd }).map((indexPath) => path.dirname(indexPath)).sort();
    }

    getAllRootCategory(): CategoryNode[] {
        return this.getAllCategoryPath().reduce<CategoryNode[]>((acc, categoryPath) => {
            const category = this.getCategory(categoryPath);
            if (category.level === 1) {
                acc.push(this.toCategoryNode(category));
            }
            return acc;
        }, []);
    }

    getCategoryChain(categoryPath: string): Category[] {
        const splitedPath = categoryPath.split('/');
    
        let basePath = '';
    
        return splitedPath.reduce<Category[]>((acc, slug) => {
            basePath = basePath ?  `${basePath}/${slug}` : slug;
            const category = this.getCategory(basePath);
            if(category)
                acc.push(category);
    
            return acc;
        }, []);
    }

    getCategory(categoryPath: string): Category {
        const categoryIndexPath = path.resolve(BlogConfig.postDir, categoryPath, '_index.md');
        if (!fs.existsSync(categoryIndexPath))
            throw new CategoryNotFoundError(categoryIndexPath);
        
        const source = fs.readFileSync(categoryIndexPath, 'utf-8');
        const frontmatter = parseCategoryMatter(source);
        const level = categoryPath.split('/').length;
        const slug = path.basename(categoryPath);
        
        return {
            ...frontmatter,
            level,
            path: categoryPath,
            slug
        };
    }

    toCategoryNode(category: Category): CategoryNode {
        const cwd = path.resolve(BlogConfig.postDir, category.path);
        const subCategoryIndexPaths = globSync(['*/_index.md'], { onlyFiles: true, cwd });
    
        const subCategories = subCategoryIndexPaths
            .map((indexPath) => {
                const categoryPath = `${category.path}/${path.dirname(indexPath)}`;
                return this.toCategoryNode(this.getCategory(categoryPath));
            })
            .sort((a, b) => a.order - b.order || a.display.localeCompare(b.display));
            
        return {
            ...category,
            subCategories
        };
    }

    getAllPost(categoryPath: string) {
        if (!this.cached)
            throw new PostCacheNotInitializedError();

        return this.categoryPostCache.get(categoryPath) || [];
    }
}