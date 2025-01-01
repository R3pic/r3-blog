# r3-blog

개인 블로그 관련 라이브러리

# 기능
- 손쉬운 게시글 생성을 위한 CLI 툴
- 정적 블로그 생성을 위한 데이터 로드
    - 카테고리
    - 게시글
    - 태그

# TODO
## CLI
* [x] 카테고리 생성 `blog category new <카테고리이름>`
* [ ] 포스트 생성 `blog post new <게시글이름>`

## 데이터 로드
### 카테고리
* [x] 모든 카테고리 목록 로드 (getAllCategoryPath)
* [x] Navigation을 위한 카테고리 트리 반환 (getAllRootCategory)
* [x] 카테고리 체인 반환 (카테고리를 입력하면 상위 부모 카테고리까지 전부 리스트로 반환)
### 게시글
* [x] 모든 게시글 목록 로드 (getAllPost)
* [x] 특정 게시글 로드 (getPost)
* [ ] 특정 태그를 가진 게시글 로드 (getAllPostFromTag)
* [ ] 특정 카테고리를 가진 게시글 로드 (getAllPostFromCategory)