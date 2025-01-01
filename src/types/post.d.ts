type Post = {
    slug: string;
    title: string;
    description: string;
    content: string;
    date: Date;
    category: string;
    thumbnail: string | undefined;
    tags: string[];
};

type PostFrontMatter = {
    title: string;
    description: string;
    date: Date;
    tags: string[];
    thumbnail: string | undefined;
};