import { MapArrayCache } from '@/lib/common/cache';

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

    getAllPostFromTag(tag: string): Post[] {
        const posts = this.tagPostCache.get(tag);
        return posts || [];
    }
}
