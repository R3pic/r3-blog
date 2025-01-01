export const toCategoryNodeExpected = {
    display: 'category1',
    level: 1,
    order: 0,
    path: 'category1',
    slug: 'category1',
    subCategories: [
        {
            display: 'subcategory1',
            level: 2,
            order: 0,
            path: 'category1/subcategory1',
            slug: 'subcategory1',
            subCategories: [
                {
                    display: 'subsubcategory1',
                    level: 3,
                    order: 0,
                    path: 'category1/subcategory1/subsubcategory1',
                    slug: 'subsubcategory1',
                    subCategories: []
                }
            ]
        },
        {
            display: 'subcategory2',
            level: 2,
            order: 0,
            path: 'category1/subcategory2',
            slug: 'subcategory2',
            subCategories: []
        }
    ]
};

export const getAllRootCategoryExpected = [
    {
        'display': 'category1',
        'order': 0,
        'level': 1,
        'path': 'category1',
        'slug': 'category1',
        'subCategories': [
            {
                'display': 'subcategory1',
                'order': 0,
                'level': 2,
                'path': 'category1/subcategory1',
                'slug': 'subcategory1',
                'subCategories': [
                    {
                        'display': 'subsubcategory1',
                        'order': 0,
                        'level': 3,
                        'path': 'category1/subcategory1/subsubcategory1',
                        'slug': 'subsubcategory1',
                        'subCategories': []
                    }
                ]
            },
            {
                'display': 'subcategory2',
                'order': 0,
                'level': 2,
                'path': 'category1/subcategory2',
                'slug': 'subcategory2',
                'subCategories': []
            }
        ]
    },
    {
        'display': 'category2',
        'order': 0,
        'level': 1,
        'path': 'category2',
        'slug': 'category2',
        'subCategories': []
    },
    {
        'display': 'category3',
        'order': 0,
        'level': 1,
        'path': 'category3',
        'slug': 'category3',
        'subCategories': []
    }
];