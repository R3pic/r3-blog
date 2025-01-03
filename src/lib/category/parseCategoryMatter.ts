import matter from 'gray-matter';
import { InvaildCategoryFrontMatterError } from './error';
import { CategoryFrontMatter } from '@/types';

/**
 * ```js
 * const source = '---\ntitle: Home\n---\nOther stuff';
 * console.log(parseCategoryMatter(source));
 * //=> { title: 'Home', content: 'Other stuff' }
 * ```
 * @param source frontmatter가 포함된 문자열
 * @returns {CategoryFrontMatter} frontmatter
 * @throws {InvaildCategoryFrontMatterError}
 */
export function parseCategoryMatter(source: string): CategoryFrontMatter {
    const { data } = matter(source);
    const frontmatter: Partial<CategoryFrontMatter> = data;

    if (!validateCategoryFrontMatter(frontmatter))
        throw new InvaildCategoryFrontMatterError('display');

    frontmatter.display = String(frontmatter.display);
    frontmatter.order = frontmatter.order ?? 0;

    return frontmatter;
}

function validateCategoryFrontMatter(frontmatter: Partial<CategoryFrontMatter>): frontmatter is CategoryFrontMatter {
    if (frontmatter.display == undefined)
        return false;

    return true;
}