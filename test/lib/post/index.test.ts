import BlogConfig from '@/config';
import { getAllPost, getPost } from '@/lib/post';
import { PostNotFoundError } from '@/lib/post/error';
import { describe, it, expect, beforeAll } from 'bun:test';

describe('Post', () => {
    beforeAll(() => {
        BlogConfig.postDir = 'fixtures/_posts';
    });

    describe('getAllPost', () => {
        it('올바른 동작을 수행한다.', () => {
            const expected: Post[] = [
                {
                    title: '테스트포스트3',
                    description: '테스트포스트설명3',
                    date: new Date('2025-01-01'),
                    tags: [ '태그3', '2024', '2024-12-30' ],
                    thumbnail: '/thumbnail/nextjs.png',
                    category: 'category3',
                    content: '테스트게시글 내용3',
                    slug: 'test-post-3'
                },
                {
                    title: '테스트포스트2',
                    description: '테스트포스트설명2',
                    date: new Date('2024-12-26'),
                    tags: [ '태그2', '2024', '2024-12-30' ],
                    thumbnail: '/thumbnail/nextjs.png',
                    category: 'category1/subcategory1/subsubcategory1',
                    content: '테스트게시글 내용2',
                    slug: 'test-post-2'
                },
                {
                    title: '테스트포스트',
                    description: '테스트포스트설명',
                    date: new Date('2024-12-24'),
                    tags: [ '태그1', '2024', '2024-12-30' ],
                    thumbnail: '/thumbnail/nextjs.png',
                    category: 'category1/subcategory2',
                    content: '테스트게시글 내용',
                    slug: 'test-post'
                }
            ];

            const actual = getAllPost();

            expect(actual).toBeArray();
            expect(actual).toEqual(expected);
        });
    });

    describe('getPost', () => {
        it('올바른 동작을 수행한다.', () => {
            const expected = {
                title: '테스트포스트',
                description: '테스트포스트설명',
                date: new Date('2024-12-24'),
                tags: [ '태그1', '2024', '2024-12-30' ],
                thumbnail: '/thumbnail/nextjs.png',
                category: 'category1/subcategory2',
                content: '테스트게시글 내용',
                slug: 'test-post'
            };

            const actual = getPost('test-post');

            expect(actual).toBeDefined();
            expect(actual).toEqual(expected);
        });

        it('존재하지 않는 게시글을 조회하면 예외를 발생시킨다.', () => {
            const expectedErrMsg = `게시글이 존재하지 않습니다. "not-found"가 ${BlogConfig.postDir}에 존재하나요?`;

            expect(() => getPost('not-found')).toThrowError(PostNotFoundError);
            expect(() => getPost('not-found')).toThrowError(expectedErrMsg);
        });
    });
});