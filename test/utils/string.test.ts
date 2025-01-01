import { describe, expect, it } from 'bun:test';
import { convertToSlug } from '@/utils/string';

describe('String Utils', () => {
    describe('convertToSlug', () => {
        it('올바른 동작을 수행한다.', () => {
            const expected = 'test-category-name';
            const actual = convertToSlug('test category name');

            expect(actual).toEqual(expected);
        });

        it('스페이스바가 연속되었을 경우', () => {
            const expected = 'test-category-name';
            const actual = convertToSlug('test  category name');

            expect(actual).toEqual(expected);
        });

        it('특수문자가 포함되어있는 경우', () => {
            const expected = 'test-category-name';
            const actual = convertToSlug('test category name!!!');

            expect(actual).toEqual(expected);
        });

        it('한글이 입력되었을 경우', () => {
            const expected = '테스트-카테고리-이름';
            const actual = convertToSlug('테스트 카테고리 이름');

            expect(actual).toEqual(expected);
        });

        
    });
});