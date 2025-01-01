import path from 'path';
import BlogConfig from '@/config';
import fs from 'fs';

export function getPostDir() {
    return path.resolve(BlogConfig.postDir);
}

export function isExist(path: string) {
    return fs.existsSync(path);
}