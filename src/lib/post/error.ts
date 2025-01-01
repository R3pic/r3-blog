import BlogConfig from '@/config';

export class PostError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class InvaildPostFrontMatterError extends PostError {
    constructor(field: string) {
        super(`${field} 필드가 존재하지 않습니다.`);
    }
}

export class PostNotFoundError extends PostError {
    constructor(slug: string) {
        super(`게시글이 존재하지 않습니다. "${slug}"가 ${BlogConfig.postDir}에 존재하나요?`);
    }
}