export type TemplateContext<T> = {
    [K in keyof T]: undefined extends T[K] ? string | undefined : string;
};

export type Category = {
    level: number;
    slug: string;
    path: string;
    display: string;
    order: number;
};

export type CategoryNode = Category & {
    subCategories: CategoryNode[];
};

export type CategoryFrontMatter = {
    display: string,
    order: number,
};

export type Post = {
    slug: string;
    title: string;
    description: string;
    content: string;
    date: Date;
    category: string;
    thumbnail: string | undefined;
    tags: string[];
};

export type PostFrontMatter = {
    title: string;
    description: string;
    date: Date;
    tags: string[];
    thumbnail: string | undefined;
};