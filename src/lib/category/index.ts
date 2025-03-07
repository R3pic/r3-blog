import fs from 'fs';
import path from 'path';
import { globSync } from 'fast-glob';
import { parseCategoryMatter } from './parseCategoryMatter';
import { CategoryNotFoundError } from './error';
import { MapArrayCache } from '@/lib/common/cache';
import { Category, CategoryNode, Post } from '@/types';
import { PostService } from '../post';
import { BlogService } from '../blogService';

export class CategoryService extends BlogService {
    private categoryPostCache = new MapArrayCache<string, Post[]>();

    getAllCategoryPath(): string[] {
        const cwd = path.resolve(this.postDir);
        return globSync(['**/_index.md'], { onlyFiles: true, cwd }).map((indexPath) => path.dirname(indexPath)).sort();
    }

    getAllRootCategory(): CategoryNode[] {
        return this.getAllCategoryPath()
            .reduce<CategoryNode[]>((acc, categoryPath) => {
                const category = this.getCategory(categoryPath);
                if (category.level === 1) {
                    acc.push(this.toCategoryNode(category));
                }
                return acc;
            }, [])
            .sort((a, b) => a.order - b.order || a.display.localeCompare(b.display));
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
        const categoryIndexPath = path.resolve(this.postDir, categoryPath, '_index.md');
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
        const cwd = path.resolve(this.postDir, category.path);
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

    getAllPost(categoryPath: string): Post[] {
        const posts = new PostService(this.postDir).getAllPost();

        for (let i = 0, len = posts.length ; i < len ; i++) {
            const post = posts[i];
            const splited = post.category.path.split('/');

            let basePath = '';
            splited.forEach((slug) => {
                basePath = basePath ? `${basePath}/${slug}` : slug;
                this.categoryPostCache.add(basePath, post);
            });
        }

        return this.categoryPostCache.get(categoryPath) || [];
    }
}