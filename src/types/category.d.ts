type CategoryPath = string;

type Category = {
    level: number;
    slug: string;
    path: string;
    display: string;
    order: number;
};

type CategoryNode = Category & {
    subCategories: CategoryNode[];
};

type CategoryFrontMatter = {
    display: string,
    order: number,
};