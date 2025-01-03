import { PostFrontMatter } from '../../types';
import { InvaildPostFrontMatterError } from './error';

/**
 * ```js
 * const source = '---\ntitle: Home\n---\nOther stuff';
 * console.log(parsePostMatter(source));
 * //=> { title: 'Home', content: 'Other stuff' }
 * ```
 * @param source frontmatter가 포함된 문자열
 * @returns {PostFrontMatter} frontmatter
 * @throws {InvaildPostFrontMatterError}
 */
export function parsePostFrontMatter(data: { [key: string]: string | number | Array<unknown> | Date; }): PostFrontMatter {
    const { title, description, date, tags, thumbnail } = data;
    if (title == undefined) throw new InvaildPostFrontMatterError('title');
    if (description == undefined) throw new InvaildPostFrontMatterError('description');
    if (!(date && (date instanceof Date)) && typeof date !== 'string') throw new InvaildPostFrontMatterError('date');
  
    return {
        title: String(title),
        description: String(description),
        date: new Date(date),
        tags: Array.isArray(tags) ? tags.map((tag) => String(tag)) : [],
        thumbnail: thumbnail ? String(thumbnail) : undefined
    };
}