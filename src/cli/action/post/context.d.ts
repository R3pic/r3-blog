type PostActionContext = {
    postName: string;
    categoryPath: string;
    options: Partial<TemplateContext<PostFrontMatter>>;
};
