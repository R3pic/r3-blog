import { describe, it, expect } from 'bun:test';
import { parseCategoryMatter } from '@/lib/category/parseCategoryMatter';
import { InvaildCategoryFrontMatterError } from '@/lib/category/error';

describe('parseCategoryMatter 테스트', () => {
    it('올바른 Category index 소스를 파싱한다.', () => {
        const goodSource = `---
display: 디스플레이
order: 1
---`;
        const expected: CategoryFrontMatter = {
            display: '디스플레이',
            order: 1
        };
        const actual = parseCategoryMatter(goodSource);
        expect(actual).toBeDefined();
        expect(actual).toEqual(expected);
    });

    it('display 속성이 누락된 경우 예외를 발생시킨다.', () => {
        const noneDisplaySource = `---
order: 1
---`;
        expect(() => parseCategoryMatter(noneDisplaySource)).toThrowError(InvaildCategoryFrontMatterError);
    });

    it('order 속성이 누락된 경우 기본값 0으로 처리한다.', () => {
        const noneOrderSource = `---
display: 디스플레이
---`;
        const expected: CategoryFrontMatter = {
            display: '디스플레이',
            order: 0
        };

        const actual = parseCategoryMatter(noneOrderSource);
        expect(actual).toBeDefined();
        expect(actual).toEqual(expected);
    });

    it('소스가 빈 문자열일 경우 예외를 발생시킨다.', () => {
        const emptySource = '';
        expect(() => parseCategoryMatter(emptySource)).toThrowError(InvaildCategoryFrontMatterError);
    });
});
