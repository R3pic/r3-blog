import {
    describe, it, expect, beforeAll, beforeEach 
} from 'bun:test';
import { CategoryService } from '@/lib/category';
import { getAllRootCategoryExpected, toCategoryNodeExpected } from './testData';
import { CategoryNotFoundError, PostCacheNotInitializedError } from '@/lib/category/error';
import { PostService } from '@/lib/post';
import { Category, CategoryNode, Post } from '@/types';

describe('Category', () => {
    let postDir: string;
    beforeAll(() => {
        postDir = 'fixtures/_posts';
    });

    let categoryService: CategoryService;
    beforeEach(() => {
        categoryService = new CategoryService(postDir);
    });

    describe('getAllCategoryPaths', () => {
        it('올바른 동작을 수행한다.', () => {
            const success = [
                'category1',
                'category1/subcategory1',
                'category1/subcategory1/subsubcategory1',
                'category1/subcategory2',
                'category2',
                'category3'
            ];
            const actual = categoryService.getAllCategoryPath();
    
            expect(actual).toBeArray();
            expect(actual).toEqual(success);
        });
    });

    describe('getAllRootCategory', () => {
        it('올바른 동작을 수행한다.', () => {
            const expected = getAllRootCategoryExpected;
            const actual = categoryService.getAllRootCategory();

            expect(actual).toBeArray();
            expect(actual).toEqual(expected);
        });
    });

    describe('getCategoryChain', () => {
        it('올바른 동작을 수행한다.', () => {
            const expected = [
                {
                    display: 'category1',
                    level: 1,
                    order: 0,
                    path: 'category1',
                    slug: 'category1'
                },
                {
                    display: 'subcategory1',
                    level: 2,
                    order: 0,
                    path: 'category1/subcategory1',
                    slug: 'subcategory1'
                }
            ];
            const actual = categoryService.getCategoryChain('category1/subcategory1');

            expect(actual).toBeArray();
            expect(actual).toEqual(expected);
        });

        it('존재하지 않는 카테고리를 시도하면 예외를 발생시킨다.', () => {
            expect(() => categoryService.getCategoryChain('notfound')).toThrowError(CategoryNotFoundError);
        });
    });

    describe('getCategory', () => {
        it('올바른 카테고리를 반환한다. (Root)', () => {
            const expected: Category = {
                display: 'category1',
                level: 1,
                order: 0,
                path: 'category1',
                slug: 'category1'
            };
            const actual = categoryService.getCategory('category1');

            expect(actual).toBeDefined();
            expect(actual).toEqual(expected);
        });

        it('올바른 카테고리를 반환한다. (서브 카테고리1)', () => {
            const expected: Category = {
                display: 'subcategory1',
                level: 2,
                order: 0,
                path: 'category1/subcategory1',
                slug: 'subcategory1'
            };
            const actual = categoryService.getCategory('category1/subcategory1');

            expect(actual).toBeDefined();
            expect(actual).toEqual(expected);
        });

        it('올바른 카테고리를 반환한다. (서브 카테고리2)', () => {
            const expected: Category = {
                display: 'subcategory2',
                level: 2,
                order: 0,
                path: 'category1/subcategory2',
                slug: 'subcategory2'
            };
            const actual = categoryService.getCategory('category1/subcategory2');

            expect(actual).toBeDefined();
            expect(actual).toEqual(expected);
        });

        it('올바른 카테고리를 반환한다. (이중 서브 카테고리)', () => {
            const expected: Category = {
                display: 'subsubcategory1',
                level: 3,
                order: 0,
                path: 'category1/subcategory1/subsubcategory1',
                slug: 'subsubcategory1'
            };
            const actual = categoryService.getCategory('category1/subcategory1/subsubcategory1');

            expect(actual).toBeDefined();
            expect(actual).toEqual(expected);
        });

        it('존재하지 않는 카테고리를 접근할 때 예외를 발생시킨다.', () => {
            expect(() => categoryService.getCategory('notfound')).toThrowError(CategoryNotFoundError);
        });
    });

    describe('toCategoryNode', () => {
        it('올바른 노드를 반환한다.', () => {
            const expected: CategoryNode = toCategoryNodeExpected;
            const actual = categoryService.toCategoryNode(categoryService.getCategory('category1'));

            expect(actual).toBeDefined();
            expect(actual).toEqual(expected);
        });
    });

    describe('getAllPost', () => {
        it('올바른 동작을 수행한다.', () => {
            const expected: Post[] = [
                {
                    category: 'category3',
                    content: '테스트게시글 내용3',
                    date: new Date('2025-01-01'),
                    description: '테스트포스트설명3',
                    slug: 'test-post-3',
                    tags: [
                        '태그3',
                        '2024',
                        '2024-12-30'
                    ],
                    thumbnail: '/thumbnail/nextjs.png',
                    title: '테스트포스트3'
                }
            ];
            const postService = new PostService(postDir);
            const actual = categoryService.injection(postService).getAllPost('category3');

            expect(actual).toEqual(expected);
        });

        it('게시글 데이터를 주입하지 않고 사용시 예외가 발생한다.', () => {
            expect(() => categoryService.getAllPost('category3')).toThrowError(PostCacheNotInitializedError);
        });
    });
});