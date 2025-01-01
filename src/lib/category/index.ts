import { globSync } from 'fast-glob';
import path from 'path';
import BlogConfig from '@/config';
import fs from 'fs';
import { parseCategoryMatter } from './parseCategoryMatter';
import { CategoryNotFoundError } from './error';

export function getAllCategoryPath(): string[] {
    const cwd = path.resolve(BlogConfig.postDir);
    return globSync(['**/_index.md'], { onlyFiles: true, cwd }).map((indexPath) => path.dirname(indexPath)).sort();
}

export function getAllRootCategory(): CategoryNode[] {
    return getAllCategoryPath().reduce<CategoryNode[]>((acc, categoryPath) => {
        const category = getCategory(categoryPath);
        if (category?.level === 1) {
            acc.push(toCategoryNode(category));
        }
        return acc;
    }, []);
}

export function getCategoryChain(categoryPath: string): Category[] {
    const splitedPath = categoryPath.split('/');

    let basePath = '';

    return splitedPath.reduce<Category[]>((acc, slug) => {
        basePath = basePath ?  `${basePath}/${slug}` : slug;
        const category = getCategory(basePath);
        if(category)
            acc.push(category);

        return acc;
    }, []);
}

export function getCategory(categoryPath: string): Category {
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

export function toCategoryNode(category: Category): CategoryNode {
    const cwd = path.resolve(BlogConfig.postDir, category.path);
    const subCategoryIndexPaths = globSync(['*/_index.md'], { onlyFiles: true, cwd });

    const subCategories = subCategoryIndexPaths
        .map((indexPath) => {
            const categoryPath = `${category.path}/${path.dirname(indexPath)}`;
            return toCategoryNode(getCategory(categoryPath));
        })
        .sort((a, b) => a.order - b.order || a.display.localeCompare(b.display));
        
    return {
        ...category,
        subCategories
    };
}