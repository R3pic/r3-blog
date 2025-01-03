export class CategoryError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class InvaildCategoryFrontMatterError extends CategoryError {
    constructor(field: string) {
        super(`${field} 필드가 존재하지 않습니다.`);
    }
}

export class CategoryNotFoundError extends CategoryError {
    constructor(path: string) {
        super(`카테고리가 존재하지 않습니다. "${path}"가 올바른 주소인가요?`);
    }
}

export class PostCacheNotInitializedError extends CategoryError {
    constructor() {
        super('Post 캐시가 초기화되지 않았습니다. getAllPost 호출 전에 Post 객체 배열로 초기화해야 합니다.');
    }
}
