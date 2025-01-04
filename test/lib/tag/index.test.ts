import { PostService } from '@/lib/post';
import { TagService } from '@/lib/tag';
import { Post } from '@/types';
import { describe, it, expect, beforeAll } from 'bun:test';

describe('Tag', () => {
    describe('TagService', () => {
        let tagService: TagService;
        let postDir: string;
        beforeAll(() => {
            postDir = 'fixtures/_posts';
            const postService = new PostService(postDir);
            tagService = new TagService(postService.getAllPost());
        });

        describe('getAllTag', () => {
            it('게시글에 작성된 모든 태그를 출력한다.', () => {
                const expected = ['2024', '2024-12-30', '태그1', '태그2', '태그3'];
                const actual = tagService.getAllTag();
    
                expect(actual).toBeArray();
                expect(actual).toEqual(expected);
            });
        });

        describe('getAllPostFromTag', () => {
            it('Post[]를 반환한다.', () => {
                const expected: Post[] = [{
                    slug: 'test-post-2',
                    title: '테스트포스트2',
                    description: '테스트포스트설명2',
                    content: '테스트게시글 내용2',
                    date: new Date('2024-12-26'),
                    category: {
                        level: 3,
                        slug: 'subsubcategory1',
                        display: 'subsubcategory1',
                        path: 'category1/subcategory1/subsubcategory1',
                        order: 0
                    },
                    tags: [
                        '태그2',
                        '2024',
                        '2024-12-30'
                    ],
                    thumbnail: '/thumbnail/nextjs.png'
                }];
                const actual = tagService.getAllPost('태그2');

                expect(actual).toBeArray();
                expect(actual).toEqual(expected);
            });

            it('태그에 해당하는 게시글이 없을 경우 빈 배열을 반환한다.', () => {
                const expected: Post[] = [];
                const actual = tagService.getAllPost('없는태그');

                expect(actual).toBeArray();
                expect(actual).toBeArrayOfSize(0);
                expect(actual).toEqual(expected);
            });
        });
        
    });

});