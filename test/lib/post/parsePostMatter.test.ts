import { describe, it, expect } from 'bun:test';
import { InvaildPostFrontMatterError } from '@/lib/post/error';
import { parsePostFrontMatter } from '@/lib/post/parsePostMatter';
import { PostFrontMatter } from '@/types';

describe('parsePostFrontMatter 테스트', () => {
    type TestParamater = Parameters<typeof parsePostFrontMatter>[0];
    
    it('모든 속성이 존재하는 PostFrontMatter 객체를 반환한다.', () => {
        const allFieldParameter: TestParamater = {
            title: '테스트포스트',
            description: '테스트포스트설명',
            date: '2024-12-26',
            tags: ['태그1', 2024, '2024-12-29'],
            thumbnail: '/thumbnail/nextjs.png'
        };
        const expected: PostFrontMatter = {
            title: '테스트포스트',
            description: '테스트포스트설명',
            date: new Date('2024-12-26'),
            tags: ['태그1', '2024', '2024-12-29'],
            thumbnail: '/thumbnail/nextjs.png'
        };

        const actual = parsePostFrontMatter(allFieldParameter);
        expect(actual).toBeDefined();
        expect(actual).toEqual(expected);
    });

    it('title 속성이 누락된 경우 예외를 발생시킨다.', () => {
        const noTitleParameter: TestParamater = {
            description: '테스트포스트설명',
            date: '2024-12-26',
            tags: ['태그1', 2024, '2024-12-29'],
            thumbnail: '/thumbnail/nextjs.png'
        };
        expect(() => parsePostFrontMatter(noTitleParameter)).toThrowError(InvaildPostFrontMatterError);
        expect(() => parsePostFrontMatter(noTitleParameter)).toThrowError('title 필드가 존재하지 않습니다.');
    });

    it('description 속성이 누락된 경우 예외를 발생시킨다.', () => {
        const noDescriptionParameter: TestParamater = {
            title: '테스트포스트',
            date: '2024-12-26',
            tags: ['태그1', 2024, '2024-12-29'],
            thumbnail: '/thumbnail/nextjs.png'
        };
        expect(() => parsePostFrontMatter(noDescriptionParameter)).toThrowError(InvaildPostFrontMatterError);
        expect(() => parsePostFrontMatter(noDescriptionParameter)).toThrowError('description 필드가 존재하지 않습니다.');
    });

    it('date 속성이 누락된 경우 예외를 발생시킨다.', () => {
        const noDateParameter: TestParamater = {
            title: '테스트포스트',
            description: '테스트포스트설명',
            tags: ['태그1', 2024, '2024-12-29'],
            thumbnail: '/thumbnail/nextjs.png'
        };
        expect(() => parsePostFrontMatter(noDateParameter)).toThrowError(InvaildPostFrontMatterError);
        expect(() => parsePostFrontMatter(noDateParameter)).toThrowError('date 필드가 존재하지 않습니다.');
    });

    it('date 속성이 문자열로 들어온 경우 Date 객체로 생성한 뒤 반환한다.', () => {
        const dateStringParameter: TestParamater = {
            title: '테스트포스트',
            description: '테스트포스트설명',
            date: '2024-12-26'
        };
        const expected: PostFrontMatter = {
            title: '테스트포스트',
            description: '테스트포스트설명',
            date: new Date('2024-12-26'),
            tags: [],
            thumbnail: undefined
        };

        const actual = parsePostFrontMatter(dateStringParameter);
        expect(actual.date).toBeDate();
        expect(actual).toEqual(expected);
    });

    it('date 속성이 Date 객체로 들어온 경우 그대로로 반환한다.', () => {
        const dateStringParameter: TestParamater = {
            title: '테스트포스트',
            description: '테스트포스트설명',
            date: new Date('2024-12-26')
        };
        const expected: PostFrontMatter = {
            title: '테스트포스트',
            description: '테스트포스트설명',
            date: new Date('2024-12-26'),
            tags: [],
            thumbnail: undefined
        };

        const actual = parsePostFrontMatter(dateStringParameter);
        expect(actual.date).toBeDate();
        expect(actual).toEqual(expected);
    });


    it('thumbnail 속성이 누락된 경우 해당 필드를 undefined로 설정시킨다.', () => {
        const noThumbnailParameter: TestParamater = {
            title: '테스트포스트',
            description: '테스트포스트설명',
            date: '2024-12-26',
            tags: ['태그1', 2024, '2024-12-29']
        };
        const expected: PostFrontMatter = {
            title: '테스트포스트',
            description: '테스트포스트설명',
            date: new Date('2024-12-26'),
            tags: ['태그1', '2024', '2024-12-29'],
            thumbnail: undefined
        };
        const actual = parsePostFrontMatter(noThumbnailParameter);
        expect(actual).toHaveProperty('thumbnail', undefined);
        expect(actual).toEqual(expected);
    });
    
    it('tag 속성이 누락된 경우 해당 필드를 빈 배열로 설정시킨다.', () => {
        const noTagsParameter: TestParamater = {
            title: '테스트포스트',
            description: '테스트포스트설명',
            date: '2024-12-26',
            thumbnail: '/thumbnail/nextjs.png'
        };
        const expected: PostFrontMatter = {
            title: '테스트포스트',
            description: '테스트포스트설명',
            date: new Date('2024-12-26'),
            tags: [],
            thumbnail: '/thumbnail/nextjs.png'
        };
        const actual = parsePostFrontMatter(noTagsParameter);
        expect(actual).toHaveProperty('tags', []);
        expect(actual).toEqual(expected);
    });
});
