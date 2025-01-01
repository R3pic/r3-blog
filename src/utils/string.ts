export function convertToSlug(str: string): string {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

export function convertToDisplay(slug: string): string {
    return slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}