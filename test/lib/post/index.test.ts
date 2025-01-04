import { PostService } from '@/lib/post';
import { PostNotFoundError } from '@/lib/post/error';
import { Post } from '@/types';
import {
    describe, it, expect, beforeAll, beforeEach 
} from 'bun:test';

describe('Post', () => {
    let postService: PostService;
    let postDir: string;
    beforeAll(() => {
        postDir = 'fixtures/_posts';
    });
    
    describe('getAllPost', () => {
        beforeEach(() => {
            postService = new PostService(postDir);
        });
        it('Post[]를 반환한다.', () => {
            const expected: Post[] = [
                {
                    title: '테스트포스트3',
                    description: '테스트포스트설명3',
                    date: new Date('2025-01-01'),
                    tags: [ '태그3', '2024', '2024-12-30' ],
                    thumbnail: '/thumbnail/nextjs.png',
                    category: {
                        level: 1,
                        slug: 'category3',
                        display: 'category3',
                        path: 'category3',
                        order: 0
                    },
                    content: '테스트게시글 내용3',
                    slug: 'test-post-3'
                },
                {
                    title: '테스트포스트2',
                    description: '테스트포스트설명2',
                    date: new Date('2024-12-26'),
                    tags: [ '태그2', '2024', '2024-12-30' ],
                    thumbnail: '/thumbnail/nextjs.png',
                    category: {
                        level: 3,
                        slug: 'subsubcategory1',
                        display: 'subsubcategory1',
                        path: 'category1/subcategory1/subsubcategory1',
                        order: 0
                    },
                    content: '테스트게시글 내용2',
                    slug: 'test-post-2'
                },
                {
                    title: '테스트포스트',
                    description: '테스트포스트설명',
                    date: new Date('2024-12-24'),
                    tags: [ '태그1', '2024', '2024-12-30' ],
                    thumbnail: '/thumbnail/nextjs.png',
                    category: {
                        level: 2,
                        slug: 'subcategory2',
                        display: 'subcategory2',
                        path: 'category1/subcategory2',
                        order: 0
                    },
                    content: '테스트게시글 내용',
                    slug: 'test-post'
                }
            ];

            const actual = postService.getAllPost();

            expect(actual).toBeArray();
            expect(actual).toEqual(expected);
        });

        it('캐시가 존재할 경우 캐시를 반환한다.', () => {
            const firstCallResult = postService.getAllPost();
            const secondCallResult = postService.getAllPost();
        
            expect(secondCallResult).toBe(firstCallResult);
        });
    });

    describe('getAllPostFromCategory', () => {
        it('올바른 동작을 수행한다.', () => {
            const expected: Post[] = [
                {
                    slug: 'test-post-3',
                    title: '테스트포스트3',
                    description: '테스트포스트설명3',
                    content: '테스트게시글 내용3',
                    category: {
                        level: 1,
                        slug: 'category3',
                        display: 'category3',
                        path: 'category3',
                        order: 0
                    },
                    date: new Date('2025-01-01'),
                    thumbnail: '/thumbnail/nextjs.png',
                    tags: [
                        '태그3',
                        '2024',
                        '2024-12-30'
                    ]
                }
            ];
            const actual = postService.getAllPostFromCategory('category3');

            expect(actual).toEqual(expected);
        });
    });

    describe('getPost', () => {
        it('올바른 동작을 수행한다.', () => {
            const expected: Post = {
                title: '테스트포스트',
                description: '테스트포스트설명',
                date: new Date('2024-12-24'),
                tags: [ '태그1', '2024', '2024-12-30' ],
                thumbnail: '/thumbnail/nextjs.png',
                category: {
                    level: 2,
                    slug: 'subcategory2',
                    display: 'subcategory2',
                    path: 'category1/subcategory2',
                    order: 0
                },
                content: '테스트게시글 내용',
                slug: 'test-post'
            };

            const actual = postService.getPost('test-post');

            expect(actual).toBeDefined();
            expect(actual).toEqual(expected);
        });

        it('존재하지 않는 게시글을 조회하면 예외를 발생시킨다.', () => {
            const expectedErrMsg = `게시글이 존재하지 않습니다. "not-found"가 ${postDir}에 존재하나요?`;

            expect(() => postService.getPost('not-found')).toThrowError(PostNotFoundError);
            expect(() => postService.getPost('not-found')).toThrowError(expectedErrMsg);
        });
    });
});