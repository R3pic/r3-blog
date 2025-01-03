import { MapArrayCache } from '@/lib/common/cache';
import { DetailPost, Post } from '@/types';
import { CategoryService } from '../category';

export class TagService {
    tags = new Set<string>();
    tagPostCache = new MapArrayCache<string, Post[]>();
    
    constructor(posts: Post[]) {
        for (let i = 0, len = posts.length ; i < len ; i++) {
            for (let j = 0, len = posts[i].tags.length ; j < len ; j++) {
                const tag = posts[i].tags[j];
                this.tags.add(tag);
                this.tagPostCache.add(tag, posts[i]);
            }
        }
    }

    getAllTag() {
        return Array.from(this.tags).sort();
    }

    getAllPost(tag: string): Post[];
    getAllPost(tag: string, service: CategoryService): DetailPost[]; 
    getAllPost(tag: string, service?: CategoryService): Post[] | DetailPost[] {
        const posts = this.tagPostCache.get(tag);

        if (posts && service) {
            return posts.map((post) => {
                return {
                    ...post,
                    category: service.getCategory(post.category)
                };
            });
        }

        return posts || [];
    }
}
