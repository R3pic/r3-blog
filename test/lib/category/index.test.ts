import { describe, it, expect, beforeAll } from 'bun:test';
import {
    getAllCategoryPath, getAllRootCategory, getCategory, getCategoryChain, toCategoryNode 
} from '@/lib/category';
import BlogConfig from '@/config';
import { getAllRootCategoryExpected, toCategoryNodeExpected } from './testData';
import { CategoryNotFoundError } from '@/lib/category/error';

describe('Category', () => {
    beforeAll(() => {
        BlogConfig.postDir = 'fixtures/_posts';
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
            const actual = getAllCategoryPath();
    
            expect(actual).toBeArray();
            expect(actual).toEqual(success);
        });
    });

    describe('getAllRootCategory', () => {
        it('올바른 동작을 수행한다.', () => {
            const expected = getAllRootCategoryExpected;
            const actual = getAllRootCategory();

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
            const actual = getCategoryChain('category1/subcategory1');

            expect(actual).toBeArray();
            expect(actual).toEqual(expected);
        });

        it('존재하지 않는 카테고리를 시도하면 예외를 발생시킨다.', () => {
            expect(() => getCategoryChain('notfound')).toThrowError(CategoryNotFoundError);
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
            const actual = getCategory('category1');

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
            const actual = getCategory('category1/subcategory1');

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
            const actual = getCategory('category1/subcategory2');

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
            const actual = getCategory('category1/subcategory1/subsubcategory1');

            expect(actual).toBeDefined();
            expect(actual).toEqual(expected);
        });

        it('존재하지 않는 카테고리를 접근할 때 예외를 발생시킨다.', () => {
            expect(() => getCategory('notfound')).toThrowError(CategoryNotFoundError);
        });
    });

    describe('toCategoryNode', () => {
        it('올바른 노드를 반환한다.', () => {
            const expected: CategoryNode = toCategoryNodeExpected;
            const actual = toCategoryNode(getCategory('category1')!);

            expect(actual).toBeDefined();
            expect(actual).toEqual(expected);
        });
    });
});